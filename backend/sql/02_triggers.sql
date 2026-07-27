-- The Smart Trigger Logic
CREATE OR REPLACE FUNCTION detect_spending_anomaly()
RETURNS TRIGGER AS $$
DECLARE
    avg_90d_spend DECIMAL(10,2);
BEGIN
    IF NEW.type = 'expense' THEN
        SELECT COALESCE(AVG(amount), 0) INTO avg_90d_spend
        FROM transactions
        WHERE user_id = NEW.user_id AND category = NEW.category 
        AND type = 'expense' AND transaction_date >= (NEW.transaction_date - INTERVAL '90 days') AND id != NEW.id;

        IF avg_90d_spend > 0 AND NEW.amount >= (avg_90d_spend * 1.5) THEN
            INSERT INTO user_notifications (user_id, message, severity)
            VALUES (NEW.user_id, 'Alert: $' || NEW.amount || ' on ' || NEW.category || ' is over 50% above your average.', 'high');
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_anomaly_detection
AFTER INSERT ON transactions
FOR EACH ROW EXECUTE FUNCTION detect_spending_anomaly();