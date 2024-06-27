CREATE FUNCTION public."NotifyOnDataChange"()
  RETURNS trigger
  LANGUAGE 'plpgsql'
AS $BODY$ 
DECLARE 
  data JSON;
  notification JSON;
BEGIN
  -- if we delete, then pass the old data
  -- if we insert or update, pass the new data
  IF (TG_OP = 'DELETE') THEN
    data = row_to_json(OLD);
  ELSE
    data = row_to_json(NEW);
  END IF;

  -- create json payload
  -- note that here can be done projection 
  notification = json_build_object(
            'table',TG_TABLE_NAME,
            'action', TG_OP, -- can have value of INSERT, UPDATE, DELETE
            'data', data);  
            
    -- note that channel name MUST be lowercase, otherwise pg_notify() won't work
    PERFORM pg_notify('datachange', notification::TEXT);
  RETURN NEW;
END
$BODY$;

CREATE FUNCTION public."CreateOnDataChangeForAllTables"()
  RETURNS void
  LANGUAGE 'plpgsql'
AS $BODY$
DECLARE  
  createTriggerStatement TEXT;
BEGIN
  FOR createTriggerStatement IN SELECT
    'CREATE TRIGGER OnDataChange AFTER INSERT OR DELETE OR UPDATE ON '
    || tab_name
    || ' FOR EACH ROW EXECUTE PROCEDURE public."NotifyOnDataChange"();' AS trigger_creation_query
  FROM (
    SELECT
      quote_ident(table_schema) || '.' || quote_ident(table_name) as tab_name
    FROM
      information_schema.tables
    WHERE
      table_schema NOT IN ('pg_catalog', 'information_schema')
      AND table_schema NOT LIKE 'pg_toast%'
  ) as TableNames
  LOOP
    EXECUTE  createTriggerStatement; --actually create the trigger
  END LOOP;
END$BODY$;

SELECT "CreateOnDataChangeForAllTables"();