-- The function (the math formula)
CREATE OR REPLACE FUNCTION check_expense_anomaly()
RETURNS TRIGGER AS $$
DECLARE
    avg_expense DECIMAL;
BEGIN
    IF NEW.type = 'expense' THEN
        -- Find the 90-day average for this category
        SELECT COALESCE(AVG(amount), 0) INTO avg_expense
        FROM transactions
        WHERE user_id = NEW.user_id 
          AND category = NEW.category 
          AND type = 'expense'
          AND date >= CURRENT_DATE - INTERVAL '90 days';

        -- The Alert: If the new amount is 50% higher than average
        IF avg_expense > 0 AND NEW.amount > (avg_expense * 1.5) THEN
            INSERT INTO notifications (user_id, message)
            VALUES (NEW.user_id, 'High Spending Alert! You just spent ' || NEW.amount || ' on ' || NEW.category || ', which is 50% higher than your 90-day average.');
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- The Trigger (the robot that runs the formula automatically)
CREATE TRIGGER trigger_expense_anomaly
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION check_expense_anomaly();