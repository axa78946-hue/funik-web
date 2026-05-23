-- Таблица подписок пользователей
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL, -- 'forever', '90days', '30days'
  hwid TEXT,
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- NULL = навсегда
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица ключей (для FunPay)
CREATE TABLE keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL, -- 'forever', '90days', '30days'
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица админов
CREATE TABLE admins (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY
);

-- RLS политики
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Пользователь видит только свои подписки
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Админы видят всё
CREATE POLICY "Admins can do anything with subscriptions" ON subscriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Пользователь может использовать ключ
CREATE POLICY "Users can view unused keys for activation" ON keys
  FOR SELECT USING (
    (is_used = FALSE) OR (used_by = auth.uid())
  );

CREATE POLICY "Users can activate keys" ON keys
  FOR UPDATE USING (is_used = FALSE)
  WITH CHECK (used_by = auth.uid());

-- Админы управляют ключами
CREATE POLICY "Admins can do anything with keys" ON keys
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Только админы видят таблицу админов
CREATE POLICY "Admins can view admins" ON admins
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );


-- Функция для выдачи подписки по email (для админов)
CREATE OR REPLACE FUNCTION give_subscription(
  target_email TEXT,
  sub_plan TEXT,
  sub_expires_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Проверяем что вызывающий — админ
  IF NOT EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Находим пользователя по email
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Создаём подписку
  INSERT INTO subscriptions (user_id, plan, expires_at, is_active)
  VALUES (target_user_id, sub_plan, sub_expires_at, TRUE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- API endpoint для лоадера: привязка HWID
CREATE OR REPLACE FUNCTION bind_hwid(user_hwid TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE subscriptions
  SET hwid = user_hwid
  WHERE user_id = auth.uid()
    AND is_active = TRUE
    AND hwid IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- API endpoint для лоадера: проверка подписки
CREATE OR REPLACE FUNCTION check_subscription(user_hwid TEXT)
RETURNS TABLE(is_valid BOOLEAN, plan TEXT, expires_at TIMESTAMPTZ) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TRUE as is_valid,
    s.plan,
    s.expires_at
  FROM subscriptions s
  WHERE s.user_id = auth.uid()
    AND s.is_active = TRUE
    AND s.hwid = user_hwid
    AND (s.expires_at IS NULL OR s.expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
