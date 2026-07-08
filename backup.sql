--
-- PostgreSQL database dump
--

\restrict 5twnLfOrqeMdTpNCZvLLIerHV3qPNp6x1gXa8KHxpBP8Z51ReguZ33TkFEgVl5n

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.4 (Debian 18.4-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in',
    'like',
    'ilike',
    'is',
    'match',
    'imatch',
    'isdistinct'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text,
	negate boolean
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
begin
    if not exists (
        select 1
        from pg_event_trigger_ddl_commands() ev
        join pg_catalog.pg_extension e on ev.objid = e.oid
        where e.extname = 'pg_graphql'
    ) then
        return;
    end if;

    drop function if exists graphql_public.graphql;
    create or replace function graphql_public.graphql(
        "operationName" text default null,
        query text default null,
        variables jsonb default null,
        extensions jsonb default null
    )
        returns jsonb
        language sql
    as $$
        select graphql.resolve(
            query := query,
            variables := coalesce(variables, '{}'),
            "operationName" := "operationName",
            extensions := extensions
        );
    $$;

    -- Attach the wrapper to the extension so DROP EXTENSION cascades to it,
    -- which in turn triggers set_graphql_placeholder to reinstall the "not enabled" stub.
    alter extension pg_graphql add function graphql_public.graphql(text, text, jsonb, jsonb);

    grant usage on schema graphql to postgres, anon, authenticated, service_role;
    grant execute on function graphql.resolve to postgres, anon, authenticated, service_role;
    grant usage on schema graphql to postgres with grant option;
    grant usage on schema graphql_public to postgres with grant option;
end;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: graphql(text, text, jsonb, jsonb); Type: FUNCTION; Schema: graphql_public; Owner: supabase_admin
--

CREATE FUNCTION graphql_public.graphql("operationName" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;


ALTER FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) OWNER TO supabase_admin;

--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
    -- Regclass of the table e.g. public.notes
    entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

    -- I, U, D, T: insert, update ...
    action realtime.action = (
        case wal ->> 'action'
            when 'I' then 'INSERT'
            when 'U' then 'UPDATE'
            when 'D' then 'DELETE'
            else 'ERROR'
        end
    );

    -- Is row level security enabled for the table
    is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

    subscriptions realtime.subscription[] = array_agg(subs)
        from
            realtime.subscription subs
        where
            subs.entity = entity_
            -- Filter by action early - only get subscriptions interested in this action
            -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
            and (subs.action_filter = '*' or subs.action_filter = action::text);

    -- Subscription vars
    working_role regrole;
    working_selected_columns text[];
    claimed_role regrole;
    claims jsonb;

    subscription_id uuid;
    subscription_has_access bool;
    visible_to_subscription_ids uuid[] = '{}';

    -- structured info for wal's columns
    columns realtime.wal_column[];
    -- previous identity values for update/delete
    old_columns realtime.wal_column[];

    error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

    -- Primary jsonb output for record
    output jsonb;

    -- Loop record for iterating unique roles (outer loop)
    role_record record;
    -- Loop record for iterating unique selected_columns within a role (inner loop)
    cols_record record;
    -- Subscription ids visible at the role level (before fanning out by selected_columns)
    visible_role_sub_ids uuid[] = '{}';

begin
    perform set_config('role', null, true);

    columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'columns') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    old_columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'identity') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    for role_record in
        select claims_role
        from (select distinct claims_role from unnest(subscriptions)) t
        order by claims_role::text
    loop
        working_role := role_record.claims_role;

        -- Update `is_selectable` for columns and old_columns (once per role)
        columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(columns) c;

        old_columns =
                array_agg(
                    (
                        c.name,
                        c.type_name,
                        c.type_oid,
                        c.value,
                        c.is_pkey,
                        pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                    )::realtime.wal_column
                )
                from
                    unnest(old_columns) c;

        if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
            -- Fan out 400 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 400: Bad Request, no primary key']
                )::realtime.wal_rls;
            end loop;

        -- The claims role does not have SELECT permission to the primary key of entity
        elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
            -- Fan out 401 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 401: Unauthorized']
                )::realtime.wal_rls;
            end loop;

        else
            -- Create the prepared statement (once per role)
            if is_rls_enabled and action <> 'DELETE' then
                if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                    deallocate walrus_rls_stmt;
                end if;
                execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
            end if;

            -- Collect all visible subscription IDs for this role (filter check + RLS check)
            visible_role_sub_ids = '{}';

            for subscription_id, claims in (
                    select
                        subs.subscription_id,
                        subs.claims
                    from
                        unnest(subscriptions) subs
                    where
                        subs.entity = entity_
                        and subs.claims_role = working_role
                        and (
                            realtime.is_visible_through_filters(columns, subs.filters)
                            or (
                              action = 'DELETE'
                              and realtime.is_visible_through_filters(old_columns, subs.filters)
                            )
                        )
            ) loop

                if not is_rls_enabled or action = 'DELETE' then
                    visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                else
                    -- Check if RLS allows the role to see the record
                    perform
                        -- Trim leading and trailing quotes from working_role because set_config
                        -- doesn't recognize the role as valid if they are included
                        set_config('role', trim(both '"' from working_role::text), true),
                        set_config('request.jwt.claims', claims::text, true);

                    execute 'execute walrus_rls_stmt' into subscription_has_access;

                    if subscription_has_access then
                        visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                    end if;
                end if;
            end loop;

            perform set_config('role', null, true);

            -- Inner loop: per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;

                output = jsonb_build_object(
                    'schema', wal ->> 'schema',
                    'table', wal ->> 'table',
                    'type', action,
                    'commit_timestamp', to_char(
                        ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                        'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
                    ),
                    'columns', (
                        select
                            jsonb_agg(
                                jsonb_build_object(
                                    'name', pa.attname,
                                    'type', pt.typname
                                )
                                order by pa.attnum asc
                            )
                        from
                            pg_attribute pa
                            join pg_type pt
                                on pa.atttypid = pt.oid
                            left join (
                                select unnest(conkey) as pkey_attnum
                                from pg_constraint
                                where conrelid = entity_ and contype = 'p'
                            ) pk on pk.pkey_attnum = pa.attnum
                        where
                            attrelid = entity_
                            and attnum > 0
                            and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
                            and (working_selected_columns is null or pa.attname = any(working_selected_columns) or pk.pkey_attnum is not null)
                    )
                )
                -- Add "record" key for insert and update
                || case
                    when action in ('INSERT', 'UPDATE') then
                        jsonb_build_object(
                            'record',
                            (
                                select
                                    jsonb_object_agg(
                                        -- if unchanged toast, get column name and value from old record
                                        coalesce((c).name, (oc).name),
                                        case
                                            when (c).name is null then (oc).value
                                            else (c).value
                                        end
                                    )
                                from
                                    unnest(columns) c
                                    full outer join unnest(old_columns) oc
                                        on (c).name = (oc).name
                                where
                                    coalesce((c).is_selectable, (oc).is_selectable)
                                    and (working_selected_columns is null or coalesce((c).name, (oc).name) = any(working_selected_columns) or coalesce((c).is_pkey, (oc).is_pkey))
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            )
                        )
                    else '{}'::jsonb
                end
                -- Add "old_record" key for update and delete
                || case
                    when action = 'UPDATE' then
                        jsonb_build_object(
                                'old_record',
                                (
                                    select jsonb_object_agg((c).name, (c).value)
                                    from unnest(old_columns) c
                                    where
                                        (c).is_selectable
                                        and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                        and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                )
                            )
                    when action = 'DELETE' then
                        jsonb_build_object(
                            'old_record',
                            (
                                select jsonb_object_agg((c).name, (c).value)
                                from unnest(old_columns) c
                                where
                                    (c).is_selectable
                                    and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                    and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                            )
                        )
                    else '{}'::jsonb
                end;

                -- Filter visible_role_sub_ids to those matching the current selected_columns group
                visible_to_subscription_ids = coalesce(
                    (
                        select array_agg(s.subscription_id)
                        from unnest(subscriptions) s
                        where s.claims_role = working_role
                          and (s.selected_columns is not distinct from working_selected_columns)
                          and s.subscription_id = any(visible_role_sub_ids)
                    ),
                    '{}'::uuid[]
                );

                return next (
                    output,
                    is_rls_enabled,
                    visible_to_subscription_ids,
                    case
                        when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                        else '{}'
                    end
                )::realtime.wal_rls;
            end loop;

        end if;
    end loop;

    perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
/*
Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
*/
declare
    op_symbol text = (
        case
            when op = 'eq' then '='
            when op = 'neq' then '!='
            when op = 'lt' then '<'
            when op = 'lte' then '<='
            when op = 'gt' then '>'
            when op = 'gte' then '>='
            when op = 'in' then '= any'
            else 'UNKNOWN OP'
        end
    );
    res boolean;
begin
    execute format(
        'select %L::'|| type_::text || ' ' || op_symbol
        || ' ( %L::'
        || (
            case
                when op = 'in' then type_::text || '[]'
                else type_::text end
        )
        || ')', val_1, val_2) into res;
    return res;
end;
$$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) RETURNS boolean
    LANGUAGE plpgsql STABLE
    AS $$
declare
    op_symbol text;
    res boolean;
begin
    -- IS DISTINCT FROM / IS NOT DISTINCT FROM: infix, both sides typed literals
    if op = 'isdistinct' then
        execute format(
            'select %L::%s %s %L::%s',
            val_1,
            type_::text,
            case when negate then 'IS NOT DISTINCT FROM' else 'IS DISTINCT FROM' end,
            val_2,
            type_::text
        ) into res;
        return res;
    end if;

    -- IS requires a keyword RHS (NULL, TRUE, FALSE, UNKNOWN), not a typed literal
    if op = 'is' then
        if val_2 not in ('null', 'true', 'false', 'unknown') then
            raise exception 'invalid value for is filter: must be null, true, false, or unknown';
        end if;
        execute format(
            'select %L::%s %s %s',
            val_1,
            type_::text,
            case when negate then 'IS NOT' else 'IS' end,
            upper(val_2)
        ) into res;
        return res;
    end if;

    op_symbol = case
        when op = 'eq'    then '='
        when op = 'neq'   then '!='
        when op = 'lt'    then '<'
        when op = 'lte'   then '<='
        when op = 'gt'    then '>'
        when op = 'gte'   then '>='
        when op = 'in'    then '= any'
        when op = 'like'   then 'LIKE'
        when op = 'ilike'  then 'ILIKE'
        when op = 'match'  then '~'
        when op = 'imatch' then '~*'
        else null
    end;

    if op_symbol is null then
        raise exception 'unsupported equality operator: %', op::text;
    end if;

    execute format(
        'select %L::%s %s (%L::%s)',
        val_1,
        type_::text,
        op_symbol,
        val_2,
        case when op = 'in' then type_::text || '[]' else type_::text end
    ) into res;

    return case when negate then not res else res end;
end;
$$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
    select
        filters is null
        or array_length(filters, 1) is null
        or coalesce(
            count(col.name) = count(1)
            and sum(
                realtime.check_equality_op(
                    op:=f.op,
                    type_:=coalesce(col.type_oid::regtype, col.type_name::regtype),
                    val_1:=col.value #>> '{}',
                    val_2:=f.value,
                    negate:=coalesce(f.negate, false)
                )::int
            ) filter (where col.name is not null) = count(col.name),
            false
        )
    from
        unnest(filters) f
        left join unnest(columns) col
            on f.column_name = col.name;
$$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS TABLE(wal jsonb, is_rls_enabled boolean, subscription_ids uuid[], errors text[], slot_changes_count bigint)
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
  WITH pub AS (
    SELECT
      concat_ws(
        ',',
        CASE WHEN bool_or(pubinsert) THEN 'insert' ELSE NULL END,
        CASE WHEN bool_or(pubupdate) THEN 'update' ELSE NULL END,
        CASE WHEN bool_or(pubdelete) THEN 'delete' ELSE NULL END
      ) AS w2j_actions,
      coalesce(
        string_agg(
          realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
          ','
        ) filter (WHERE ppt.tablename IS NOT NULL),
        ''
      ) AS w2j_add_tables
    FROM pg_publication pp
    LEFT JOIN pg_publication_tables ppt ON pp.pubname = ppt.pubname
    WHERE pp.pubname = publication
    GROUP BY pp.pubname
    LIMIT 1
  ),
  -- MATERIALIZED ensures pg_logical_slot_get_changes is called exactly once
  w2j AS MATERIALIZED (
    SELECT x.*, pub.w2j_add_tables
    FROM pub,
         pg_logical_slot_get_changes(
           slot_name, null, max_changes,
           'include-pk', 'true',
           'include-transaction', 'false',
           'include-timestamp', 'true',
           'include-type-oids', 'true',
           'format-version', '2',
           'actions', pub.w2j_actions,
           'add-tables', pub.w2j_add_tables
         ) x
  ),
  slot_count AS (
    SELECT count(*)::bigint AS cnt
    FROM w2j
    WHERE w2j.w2j_add_tables <> ''
  ),
  rls_filtered AS (
    SELECT xyz.wal, xyz.is_rls_enabled, xyz.subscription_ids, xyz.errors
    FROM w2j,
         realtime.apply_rls(
           wal := w2j.data::jsonb,
           max_record_bytes := max_record_bytes
         ) xyz(wal, is_rls_enabled, subscription_ids, errors)
    WHERE w2j.w2j_add_tables <> ''
      AND xyz.subscription_ids[1] IS NOT NULL
  )
  SELECT rf.wal, rf.is_rls_enabled, rf.subscription_ids, rf.errors, sc.cnt
  FROM rls_filtered rf, slot_count sc

  UNION ALL

  SELECT null, null, null, null, sc.cnt
  FROM slot_count sc
  WHERE NOT EXISTS (SELECT 1 FROM rls_filtered)
$$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  SELECT
    realtime.wal2json_escape_identifier(nsp.nspname::text)
    || '.'
    || realtime.wal2json_escape_identifier(pc.relname::text)
  FROM pg_class pc
  JOIN pg_namespace nsp ON pc.relnamespace = nsp.oid
  WHERE pc.oid = entity
$$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: send_binary(bytea, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, binary_payload, event, topic, private, extension)
    VALUES (generated_id, payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
    col_names text[] = coalesce(
            array_agg(a.attname order by a.attnum),
            '{}'::text[]
        )
        from
            pg_catalog.pg_attribute a
        where
            a.attrelid = new.entity
            and a.attnum > 0
            and not a.attisdropped
            and pg_catalog.has_column_privilege(
                (new.claims ->> 'role'),
                a.attrelid,
                a.attnum,
                'SELECT'
            );
    filter realtime.user_defined_filter;
    col_type regtype;
    in_val jsonb;
    selected_col text;
begin
    for filter in select * from unnest(new.filters) loop
        if not filter.column_name = any(col_names) then
            raise exception 'invalid column for filter %', filter.column_name;
        end if;

        col_type = (
            select atttypid::regtype
            from pg_catalog.pg_attribute
            where attrelid = new.entity
                  and attname = filter.column_name
        );
        if col_type is null then
            raise exception 'failed to lookup type for column %', filter.column_name;
        end if;

        if filter.op = 'in'::realtime.equality_op then
            in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
            if coalesce(jsonb_array_length(in_val), 0) > 100 then
                raise exception 'too many values for `in` filter. Maximum 100';
            end if;
        elsif filter.op = 'is'::realtime.equality_op then
            -- `is` requires a keyword RHS rather than a typed literal
            if filter.value not in ('null', 'true', 'false', 'unknown') then
                raise exception 'invalid value for is filter: must be null, true, false, or unknown';
            end if;
            -- IS NULL works for any type, but IS TRUE/FALSE/UNKNOWN require a boolean
            -- operand. Reject the non-null keywords on non-boolean columns here so they
            -- don't abort apply_rls at WAL time.
            if filter.value <> 'null' and col_type <> 'boolean'::regtype then
                raise exception 'is % filter requires a boolean column, got %', filter.value, col_type::text;
            end if;
        elsif filter.op in ('like'::realtime.equality_op, 'ilike'::realtime.equality_op) then
            -- like/ilike apply the text pattern operator (~~); reject column types that
            -- have no such operator instead of failing at WAL time
            if not exists (
                select 1 from pg_catalog.pg_operator
                where oprname = '~~' and oprleft = col_type
            ) then
                raise exception 'operator % requires a text-compatible column type, got %', filter.op::text, col_type::text;
            end if;
        elsif filter.op in ('match'::realtime.equality_op, 'imatch'::realtime.equality_op) then
            -- match/imatch apply the regex operators ~ / ~*; reject column types that have
            -- no such operator (e.g. integer) instead of failing at WAL time, mirroring the
            -- like/ilike guard above.
            if not exists (
                select 1 from pg_catalog.pg_operator
                where oprname = case when filter.op = 'imatch'::realtime.equality_op then '~*' else '~' end
                  and oprleft = col_type
                  and oprright = col_type
                  and oprresult = 'boolean'::regtype
            ) then
                raise exception 'operator % requires a text-compatible column type, got %', filter.op::text, col_type::text;
            end if;
            -- validate the regex eagerly so a bad pattern is rejected here, not inside
            -- apply_rls where it would abort the WAL stream for the entity
            begin
                perform '' ~ filter.value;
            exception when others then
                raise exception 'invalid regular expression for % filter: %', filter.op::text, sqlerrm;
            end;
        else
            -- eq/neq/lt/lte/gt/gte: value must be coercable to the type
            perform realtime.cast(filter.value, col_type);
        end if;
    end loop;

    if new.selected_columns is not null then
        for selected_col in select * from unnest(new.selected_columns) loop
            if not selected_col = any(col_names) then
                raise exception 'invalid column for select %', selected_col;
            end if;
        end loop;
    end if;

    -- Apply consistent order to filters so the unique constraint can't be tricked by a
    -- different filter order. negate is part of the sort key.
    new.filters = coalesce(
        array_agg(f order by f.column_name, f.op, f.value, f.negate),
        '{}'
    ) from unnest(new.filters) f;

    new.selected_columns = (
        select array_agg(c order by c)
        from unnest(new.selected_columns) c
    );

    return new;
end;
$$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: wal2json_escape_identifier(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.wal2json_escape_identifier(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  -- Prefix `\`, `,`, `.`, and any whitespace with `\`
  SELECT regexp_replace(name, '([\\,.[:space:]])', '\\\1', 'g')
$$;


ALTER FUNCTION realtime.wal2json_escape_identifier(name text) OWNER TO supabase_admin;

--
-- Name: allow_any_operation(text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.allow_any_operation(expected_operations text[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT CASE
      WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
      ELSE raw_operation
    END AS current_operation
    FROM current_operation
  )
  SELECT EXISTS (
    SELECT 1
    FROM normalized n
    CROSS JOIN LATERAL unnest(expected_operations) AS expected_operation
    WHERE expected_operation IS NOT NULL
      AND expected_operation <> ''
      AND n.current_operation = CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END
  );
$$;


ALTER FUNCTION storage.allow_any_operation(expected_operations text[]) OWNER TO supabase_storage_admin;

--
-- Name: allow_only_operation(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.allow_only_operation(expected_operation text) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT
      CASE
        WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
        ELSE raw_operation
      END AS current_operation,
      CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END AS requested_operation
    FROM current_operation
  )
  SELECT CASE
    WHEN requested_operation IS NULL OR requested_operation = '' THEN FALSE
    ELSE COALESCE(current_operation = requested_operation, FALSE)
  END
  FROM normalized;
$$;


ALTER FUNCTION storage.allow_only_operation(expected_operation text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Get the last path segment (the actual filename)
    SELECT _parts[array_length(_parts, 1)] INTO _filename;
    -- Extract extension: reverse, split on '.', then reverse again
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


ALTER FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint)::bigint as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.protect_delete() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    custom_claims_allowlist text[] DEFAULT '{}'::text[] NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


ALTER TABLE auth.custom_oauth_providers OWNER TO supabase_auth_admin;

--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE auth.oauth_client_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


ALTER TABLE auth.webauthn_challenges OWNER TO supabase_auth_admin;

--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


ALTER TABLE auth.webauthn_credentials OWNER TO supabase_auth_admin;

--
-- Name: BlockedIP; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BlockedIP" (
    id text NOT NULL,
    ip_address text NOT NULL,
    reason text,
    blocked_by text DEFAULT 'system'::text NOT NULL,
    expires_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BlockedIP" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    slug text NOT NULL,
    name_ar text NOT NULL,
    name_en text NOT NULL,
    description_ar text,
    description_en text,
    image text,
    display_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: ContactInquiry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactInquiry" (
    id text NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    type text DEFAULT 'استفسار عام'::text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'new'::text NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ContactInquiry" OWNER TO postgres;

--
-- Name: Discount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Discount" (
    id text NOT NULL,
    "productId" text NOT NULL,
    discount_type text DEFAULT 'percentage'::text NOT NULL,
    discount_value double precision NOT NULL,
    original_price integer NOT NULL,
    discounted_price integer NOT NULL,
    starts_at timestamp(3) without time zone,
    ends_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    label_ar text,
    label_en text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Discount" OWNER TO postgres;

--
-- Name: Employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employee" (
    id text NOT NULL,
    username text NOT NULL,
    password_hash text NOT NULL,
    display_name text NOT NULL,
    role text DEFAULT 'employee'::text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    pin_hash text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Employee" OWNER TO postgres;

--
-- Name: EmployeePermission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EmployeePermission" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    can_access_counter boolean DEFAULT true NOT NULL,
    can_view_invoices boolean DEFAULT true NOT NULL,
    can_print_reports boolean DEFAULT true NOT NULL,
    can_add_notes boolean DEFAULT true NOT NULL,
    can_view_inventory boolean DEFAULT false NOT NULL,
    can_manage_products boolean DEFAULT false NOT NULL,
    can_manage_employees boolean DEFAULT false NOT NULL,
    can_view_accounting boolean DEFAULT false NOT NULL,
    can_view_settings boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."EmployeePermission" OWNER TO postgres;

--
-- Name: GlobalPricingSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GlobalPricingSettings" (
    id text NOT NULL,
    price_50ml_fils integer NOT NULL,
    price_100ml_fils integer NOT NULL,
    price_200ml_fils integer NOT NULL,
    currency text DEFAULT 'JOD'::text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."GlobalPricingSettings" OWNER TO postgres;

--
-- Name: InventoryMovement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InventoryMovement" (
    id text NOT NULL,
    "productId" text NOT NULL,
    "variantId" text,
    old_quantity integer NOT NULL,
    new_quantity integer NOT NULL,
    quantity_change integer NOT NULL,
    reason text NOT NULL,
    adjusted_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."InventoryMovement" OWNER TO postgres;

--
-- Name: LoginAttempt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LoginAttempt" (
    id text NOT NULL,
    ip_address text NOT NULL,
    username text,
    user_type text DEFAULT 'admin'::text NOT NULL,
    success boolean DEFAULT false NOT NULL,
    "employeeId" text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."LoginAttempt" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    sku text NOT NULL,
    slug text NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    inspired_by text,
    main_category text DEFAULT 'general'::text NOT NULL,
    gender text DEFAULT 'unisex'::text NOT NULL,
    season text DEFAULT 'all'::text NOT NULL,
    fragrance_family_raw text DEFAULT ''::text NOT NULL,
    short_description_ar text DEFAULT ''::text NOT NULL,
    short_description_en text,
    long_description_ar text,
    long_description_en text,
    keywords_ar text DEFAULT ''::text NOT NULL,
    image_filename text DEFAULT ''::text NOT NULL,
    needs_image boolean DEFAULT true NOT NULL,
    visible_on_website boolean DEFAULT true NOT NULL,
    featured_on_frontend boolean DEFAULT false NOT NULL,
    low_stock_threshold integer DEFAULT 5 NOT NULL,
    notes_top text,
    notes_heart text,
    notes_base text,
    notes text,
    research_confidence text DEFAULT 'medium'::text NOT NULL,
    needs_review boolean DEFAULT false NOT NULL,
    source_excel_row integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    category_slug text,
    season_slug text,
    has_image boolean DEFAULT false NOT NULL,
    image_url text,
    ready_for_storefront boolean DEFAULT false NOT NULL,
    visible boolean DEFAULT false NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    fragrance_family text DEFAULT ''::text NOT NULL,
    keywords text DEFAULT ''::text NOT NULL,
    short_description text DEFAULT ''::text NOT NULL,
    image_name text,
    "categoryId" text
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: ProductAccord; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductAccord" (
    id text NOT NULL,
    "productId" text NOT NULL,
    "position" integer NOT NULL,
    name_ar text NOT NULL,
    strength integer NOT NULL
);


ALTER TABLE public."ProductAccord" OWNER TO postgres;

--
-- Name: ProductFamilyTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductFamilyTag" (
    id text NOT NULL,
    "productId" text NOT NULL,
    tag_ar text NOT NULL
);


ALTER TABLE public."ProductFamilyTag" OWNER TO postgres;

--
-- Name: ProductVariant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductVariant" (
    id text NOT NULL,
    "productId" text NOT NULL,
    volume text NOT NULL,
    price integer NOT NULL,
    stock integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."ProductVariant" OWNER TO postgres;

--
-- Name: Sale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sale" (
    id text NOT NULL,
    invoice_number text NOT NULL,
    "employeeId" text,
    seller_user_id text,
    seller_name_snapshot text,
    seller_role_snapshot text,
    sale_source text DEFAULT 'STAFF_POS'::text NOT NULL,
    subtotal integer NOT NULL,
    discount_total integer DEFAULT 0 NOT NULL,
    total integer NOT NULL,
    amount_received integer DEFAULT 0 NOT NULL,
    change_amount integer DEFAULT 0 NOT NULL,
    payment_method text DEFAULT 'cash'::text NOT NULL,
    status text DEFAULT 'completed'::text NOT NULL,
    notes text,
    employee_note text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Sale" OWNER TO postgres;

--
-- Name: SaleItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SaleItem" (
    id text NOT NULL,
    "saleId" text NOT NULL,
    "productId" text,
    product_name_ar text NOT NULL,
    product_name_en text,
    product_sku text NOT NULL,
    quantity integer NOT NULL,
    unit_price integer NOT NULL,
    total_price integer NOT NULL,
    volume text
);


ALTER TABLE public."SaleItem" OWNER TO postgres;

--
-- Name: SecurityEvent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SecurityEvent" (
    id text NOT NULL,
    ip_address text NOT NULL,
    event_type text NOT NULL,
    details text,
    is_blocked boolean DEFAULT false NOT NULL,
    expires_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SecurityEvent" OWNER TO postgres;

--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SiteSettings" (
    id text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    value_type text DEFAULT 'string'::text NOT NULL,
    category text DEFAULT 'general'::text NOT NULL,
    label_ar text,
    label_en text,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SiteSettings" OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    selected_columns text[],
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb,
    metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at, custom_claims_allowlist) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
20260625000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: BlockedIP; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BlockedIP" (id, ip_address, reason, blocked_by, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, slug, name_ar, name_en, description_ar, description_en, image, display_order, is_active, created_at, updated_at) FROM stdin;
f97e0f51-736a-40c3-8b9f-a6b3039df682	men	رجالي	Men	\N	\N	\N	1	t	2026-07-04 15:48:34.652	2026-07-04 15:48:34.652
235ba678-7bf9-4de8-b83a-104a6f711c34	women	نسائي	Women	\N	\N	\N	2	t	2026-07-04 15:48:35.145	2026-07-04 15:48:35.145
228f3cb7-dc13-4e52-b54c-2ff4c4d57027	oud	عود	Oud	\N	\N	\N	3	t	2026-07-04 15:48:35.394	2026-07-04 15:48:35.394
\.


--
-- Data for Name: ContactInquiry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactInquiry" (id, name, phone, type, message, status, notes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Discount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Discount" (id, "productId", discount_type, discount_value, original_price, discounted_price, starts_at, ends_at, is_active, label_ar, label_en, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Employee" (id, username, password_hash, display_name, role, is_active, pin_hash, created_at, updated_at) FROM stdin;
560a02b4-e1f1-4600-bb21-90de8bf80a84	pos1	$2b$10$5PG9/2x4hcfrdF/.W.Wt1u8APnkmuWd/3VHYHR4zH0mXSaLiGsm8G	POS Cashier 1	employee	t	\N	2026-07-04 15:48:23.621	2026-07-04 15:48:23.621
\.


--
-- Data for Name: EmployeePermission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EmployeePermission" (id, "employeeId", can_access_counter, can_view_invoices, can_print_reports, can_add_notes, can_view_inventory, can_manage_products, can_manage_employees, can_view_accounting, can_view_settings, created_at, updated_at) FROM stdin;
ec4c2150-d3f7-4d62-8a05-12cc4e4626c8	560a02b4-e1f1-4600-bb21-90de8bf80a84	t	t	t	t	t	f	f	f	f	2026-07-04 15:48:23.621	2026-07-04 15:48:23.621
\.


--
-- Data for Name: GlobalPricingSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GlobalPricingSettings" (id, price_50ml_fils, price_100ml_fils, price_200ml_fils, currency, active, created_at, updated_at) FROM stdin;
b7d61f16-930a-480d-b2a9-5d485d8651d6	10000	16000	28000	JOD	t	2026-07-04 15:48:20.234	2026-07-04 15:48:20.234
\.


--
-- Data for Name: InventoryMovement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."InventoryMovement" (id, "productId", "variantId", old_quantity, new_quantity, quantity_change, reason, adjusted_by, created_at) FROM stdin;
a7161fd4-f56e-4146-abf1-10fd8c80a3d2	f5fee43d-13f3-43bb-8508-b08bda80dd2c	0c8dafcb-92b0-4626-be85-54f461b755a2	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:05.517
17d5fbec-170a-408c-b966-d8df5c3a2a79	f5fee43d-13f3-43bb-8508-b08bda80dd2c	0d334db1-57c7-427e-a4d2-8ff031422ea4	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:07.998
24f240db-4f3b-4ca4-8ba7-238d12f41363	0489881e-3909-4d95-9a70-56f03ca9d2b8	8524a01f-cb0a-4e59-8f36-a940405bdaf9	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:10.443
4f7a861b-8b14-42b1-bf53-fe5c1d780a44	0489881e-3909-4d95-9a70-56f03ca9d2b8	d7172eff-54b9-4ffe-823e-1e8031c0c083	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:12.891
a3ebe965-413a-47e1-889e-2e00c7a6257b	0489881e-3909-4d95-9a70-56f03ca9d2b8	5e6a0756-3bb3-49c1-bcfe-c03938190027	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:15.345
8f0b9688-3c12-4842-974b-ec29f8da25b0	d5dbc3ff-685f-4366-a30b-867a527e8a15	1760863d-6dcd-4667-8638-9ba79cceb770	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:17.791
50b24738-81f3-450b-bd68-347442da64be	d5dbc3ff-685f-4366-a30b-867a527e8a15	fdd65d9d-9c50-49dd-a546-0be8feadc3ee	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:20.489
0ad46182-12d7-4481-8c88-c56c67b1e6dc	d5dbc3ff-685f-4366-a30b-867a527e8a15	7154d74e-c100-49f8-bc4c-edb09ddb0fcf	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:22.934
b1c0b99b-b55e-456b-b845-39b48dd1f309	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	6da38c37-feb0-4d46-8754-a1b671bc3611	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:25.382
b8bb14e3-d971-4866-b497-840ead9deecc	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	23338eaf-5e58-48e1-81bd-2c2f7b8241d3	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:27.827
f2019716-eb5f-4dd9-a914-441d8326c27e	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	ae12f3a5-f4c9-419e-a2be-b66ef231faca	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:30.274
4d00e2b7-07c2-47a1-84d9-8b467291e591	767bc26f-f467-4b3f-9e70-f66c29c51718	250c28aa-1d83-4b41-9c28-23ce36aa29f0	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:32.777
555eb05b-f538-4f01-b857-e5b3702820d5	767bc26f-f467-4b3f-9e70-f66c29c51718	77a3d07a-bb60-4838-a2fb-f34aa09b8922	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:35.475
42763da0-3e14-4dbd-ac9b-2cb0d4cf1036	767bc26f-f467-4b3f-9e70-f66c29c51718	eb9c5b29-1493-484f-b981-1a072a1738ae	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:37.918
07438e45-a362-4467-80bc-80a4c6060262	c6d45800-9bae-46ef-8800-343114afa08a	c689bad8-ad42-463d-b38f-eed7d4da9581	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:40.364
cbc3f32a-11b7-4437-a27a-16a6bfa34de9	c6d45800-9bae-46ef-8800-343114afa08a	b4cea2b6-85c7-4af8-8f04-fafd9b85a097	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:42.818
642ae035-601a-4cce-9d67-79bfbb286747	c6d45800-9bae-46ef-8800-343114afa08a	c6d0ab04-81e4-491f-840c-2c64fdbc0a46	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:45.265
3a905301-ccdb-44e4-ad89-11801a698cb1	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	15094139-47e2-4bbe-a7bc-a13715d33ed9	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:47.709
90b8cd05-084b-456c-83b6-412584360796	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	e43ac61f-858e-4f7b-b818-550ba18993d0	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:50.155
8d1077a0-b7b7-4efc-bbd5-bc608d35e216	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	d82e74d7-b95d-4bed-a1e3-892cc4263eeb	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:52.842
ab1e9a9e-d490-4db9-8187-9b9226cc09d0	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	88498a1a-7240-4c5b-b27c-f666a9514ede	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:55.366
ed083523-bce8-4f7c-b0bd-1f29ae60ebfc	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	cf7343f9-7c05-4292-84de-ceb8859ea9da	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:01:57.874
e6e5f6fc-671a-4f4b-a241-892344844257	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	b68255db-f9c5-4bec-bf49-046473c4de06	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:00.328
f555c268-ec63-4a8a-8d97-7c08e06266f1	d714c24f-a3cd-4109-b043-bb08f5cc0438	18f00978-f31f-49d4-a495-a876074add76	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:02.799
36e661b9-74bf-4e2a-a2ab-f9589b168015	d714c24f-a3cd-4109-b043-bb08f5cc0438	3892bd0d-1537-4ff5-a99a-cf87b5845175	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:05.246
32760d45-116d-48d4-87ea-bbd545358457	d714c24f-a3cd-4109-b043-bb08f5cc0438	0e27ebdf-bb06-4bbe-b995-67e066df3b7e	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:07.949
1837e556-4dda-457e-beff-e7be82b82a0c	b58cd811-68c3-46c6-b60e-c2cefb6b167c	1f3925b1-04d3-4bf8-9d34-1873a12ed76b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:10.409
ec83fc7c-d053-4451-ad8d-d06dfbb75df8	b58cd811-68c3-46c6-b60e-c2cefb6b167c	343c6b08-2ee6-4e31-a617-a1b1e3ebbc81	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:12.859
0fdad31c-8c32-41ec-a727-e6b9e744b39b	b58cd811-68c3-46c6-b60e-c2cefb6b167c	80716401-8ba3-4a2a-9f79-72a807ad4331	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:15.303
51e42c0a-451c-4c64-84da-e0b8b323eb4a	72f5204b-71de-40c6-bab1-ed8d5307e9f4	53169fed-0794-463d-a6ea-a2185564b5aa	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:17.752
bd4871f8-f276-4065-9b03-ff91c295d345	72f5204b-71de-40c6-bab1-ed8d5307e9f4	22e6a23b-79f3-43ba-a95c-38cf52fb6963	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:20.196
09021ad2-7ac1-40fd-a64c-7e8f904116a1	72f5204b-71de-40c6-bab1-ed8d5307e9f4	d6b83511-a34d-49da-b508-ec2e34f4a106	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:22.649
d55cac71-f481-4ff8-826b-f815d53a2b79	28e85aaa-f5c9-4348-b831-0a993734a059	51cb4186-41a3-4740-89fe-f011602d7a76	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:25.344
7a5fe595-9e08-418c-9299-29f820807b95	28e85aaa-f5c9-4348-b831-0a993734a059	91d2b146-f9ce-402e-91f3-0661a6af6ae0	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:27.79
b1cbd5fa-65ef-4597-b82c-82adb6188eda	28e85aaa-f5c9-4348-b831-0a993734a059	c9886ace-69e2-4a58-9d3c-3377e5f05e03	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:30.237
df9231cb-b68d-4cf2-a8f3-4e875b435d02	dd67cb78-da62-470d-8f29-c594b909f7a5	bcc971bd-4306-436b-8580-e353b6f327f1	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:32.677
a31ee8d6-3be0-4e81-9120-71c8d0a86772	dd67cb78-da62-470d-8f29-c594b909f7a5	8c71022b-ce92-4f08-85a0-b9e2565f4c29	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:35.123
e5fdd4e4-f226-4aa3-ae27-f2de6b51789c	6db54e28-8ba7-420a-ba75-ebe7979f09d0	e000cba2-12b8-45bf-8c66-31c3f2b680dd	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:37.573
bada1655-750c-44ea-aea7-a02525c044b7	dd67cb78-da62-470d-8f29-c594b909f7a5	85d07a80-8ad8-4e8c-96f5-6366fd1c120d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:40.325
73a4358a-e9c2-4162-8588-f0debf711fa8	6db54e28-8ba7-420a-ba75-ebe7979f09d0	56344db1-67f2-4fd8-aa01-3083a605c730	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:42.79
96de4a8b-550c-4ac5-9d49-5a2805e7aba5	6db54e28-8ba7-420a-ba75-ebe7979f09d0	8bcb217c-b543-46a0-9660-8949fad0595c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:45.248
ae181e75-1cbb-4dbd-99a2-4fd80e35feff	ec08e506-0d25-4292-933a-7e77d056197c	7fb2893b-ecfb-467a-b840-a6e562127914	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:47.712
21ab6680-9f06-424c-8fca-1e9fae7130f4	ec08e506-0d25-4292-933a-7e77d056197c	9442856e-b460-4546-ba87-28ebeed79cf5	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:50.17
66b80321-97ba-4da4-9577-b390a71f2c2d	ec08e506-0d25-4292-933a-7e77d056197c	a72a2f16-dc2c-4f66-9f47-8a60945d6d6d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:52.632
a79bfb8c-8537-4a46-829b-809f00316942	84e50a6c-c3e0-4114-9150-d6205212b7ca	8813a99e-25cf-4a54-b9f6-1e25023eed67	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:55.179
89e72fac-15bb-4354-8b75-d508a4a73eca	84e50a6c-c3e0-4114-9150-d6205212b7ca	6e09ba5b-a33c-4f4e-8a3c-fdccae63674d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:02:57.883
25296739-d682-472e-b90c-cb6d6ce27c58	84e50a6c-c3e0-4114-9150-d6205212b7ca	12617d38-c0ec-4482-b9b2-5439adc4688a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:00.341
4d2d0ebd-2e88-47cb-b538-06f7456ae960	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	fd0571c8-1c49-48ff-a6f8-af5991b695f9	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:02.863
eac1eec1-08e4-4db7-951f-271a22121bc8	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	d8159635-18ad-4f99-8312-4010294b820a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:05.344
9b1eede8-44e3-44c9-9ae5-eed32b519bf9	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	073c0cb6-0bcd-4836-a7cd-ad2cffc88476	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:07.801
e28eb5fb-fce6-4ff0-950b-8bec04224118	bbbe0953-9dad-41a1-b246-0bbf527278d2	e682f7b1-d8a6-4453-994f-ce566b1f1a3d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:10.254
06edec5b-d127-46eb-b177-54d9a56f71cd	bbbe0953-9dad-41a1-b246-0bbf527278d2	aa4dd26b-bb6e-4051-b619-79b224319068	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:12.958
c7563313-3342-4d04-b1e6-1ca02c60c4ab	bbbe0953-9dad-41a1-b246-0bbf527278d2	c281d5b1-7d8f-4969-b138-b18acf79bbf4	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:15.417
59138e0c-506f-481b-a80a-c349ced056f1	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	845de796-7544-4649-baed-3af917d0345f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:17.894
eceeb0a5-9e71-45ed-b7e2-bb43796ab36d	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	27ae767b-fd70-49f3-ade8-6d2e88d38fb1	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:20.359
262995d7-eb50-45a7-9a0c-b8541996f352	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	6b451893-2cdf-4a4f-90ce-af8659f87bd4	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:22.891
47952aa2-b641-4df7-9a01-b3bd3e2e4241	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	8e15fbf9-9ddb-4963-87c6-3b668f79f36d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:25.351
e0b1febc-2d7a-44af-bcea-bc5af6f4121c	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	2d06ac94-bad5-4d0e-b350-2f495cfe6e26	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:27.819
8510fef5-6e9f-4822-be4b-8a2554daa168	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	d0855f36-7912-426e-acbd-63707a0b15a8	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:30.53
96091364-b8c8-475d-b545-b23e25732c1d	48d5299f-c979-4fc4-bc27-0043890a7b8d	7aae0858-c79a-419a-9a49-219ea819f97b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:32.985
9ee6a1d7-e87c-4c0d-a4d7-8e8df52fc94d	48d5299f-c979-4fc4-bc27-0043890a7b8d	ca10786e-780f-4b6c-af43-7fd65ce46929	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:35.449
fd04d40c-d37a-4483-91b4-0eed4947918c	48d5299f-c979-4fc4-bc27-0043890a7b8d	32710473-8e4a-4a07-a053-fb83b245c0b0	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:38.018
e34d4a6f-3c21-4e2c-b707-75439e3bfd76	856088c4-d455-4674-86d7-1abe92e243b6	c3888bab-06b8-4eac-a20c-24391c193e01	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:40.479
cf2ccfd0-9fd0-4230-ab0c-830e02778c24	856088c4-d455-4674-86d7-1abe92e243b6	764f3f78-9f7a-463e-8448-bf1f0e7a58a5	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:42.944
e037c816-b99b-4b8b-b1fc-86ebf5aa7f84	856088c4-d455-4674-86d7-1abe92e243b6	4ab9d900-f5ac-465b-a1b6-47c7d073a11d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:45.654
ec5fa40d-7483-4ed8-ac6c-2295e5c28187	01f8559c-9dd2-4dad-90b6-c306988299e5	4c455f25-935d-45e5-90a8-c82c68c2547f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:48.112
45e977b5-2c40-46fa-ab17-32a03a2f6650	01f8559c-9dd2-4dad-90b6-c306988299e5	fdbc45bd-9959-487c-bd50-7f0d6567907c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:50.567
f779370d-55c2-47d6-8b20-829a6b15ebff	01f8559c-9dd2-4dad-90b6-c306988299e5	c8cb47cd-12df-460e-8232-cb42110fecb3	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:53.112
35764379-ed83-462a-aaea-86037cb69c59	16d29daf-79b9-42fb-964c-b50553900528	a5af5325-56f7-472a-a9fb-da77cf575a4d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:55.583
1edce3d1-650b-4e55-ac09-bb8c49861f84	16d29daf-79b9-42fb-964c-b50553900528	b22d6f1c-c148-4e7e-9582-ff137e0315d2	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:03:58.072
2d3fd4f7-c940-4d11-b496-26ebc25b47ac	16d29daf-79b9-42fb-964c-b50553900528	00551b91-53da-43ea-9b41-67446e705c1f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:00.538
24f5e290-9c10-4661-b7f4-6710ed6a798e	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	d2144204-4920-43bb-a4e1-fdb4144bb0ba	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:03.239
5116fb5b-0ae6-42ce-8cee-1951d9df5d0b	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	2af14f5c-cfe6-4aa6-b139-e5898546be3c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:05.697
920abbe7-446e-4711-b6cd-5eb6e48d4bd2	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	71517b3e-bca2-4fba-be63-a9644e7392b2	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:08.161
ccfe5f3a-e34f-470b-9f36-65ae64b9767b	f1a00606-4504-41f9-9b85-2a04a7f765a6	a9e27fdf-e03e-47a9-889d-718fe079f6dc	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:10.617
7349e9b3-552a-4211-a225-341144834855	f1a00606-4504-41f9-9b85-2a04a7f765a6	2583597c-5084-46a6-b548-024e0848286a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:13.082
26b50623-4c7f-4d65-bb65-13364f3581c3	f1a00606-4504-41f9-9b85-2a04a7f765a6	027dbc49-5db6-4287-b4e8-d9a6d0731a95	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:15.562
20577b61-25ff-4a05-add4-9d5cc71a563b	b40bad66-7413-4610-b365-72dffcc94600	edbf94eb-e6d2-4728-9762-a9b8863a5263	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:18.27
5bd92002-f2f2-4671-bcd3-d229805fb6f8	b40bad66-7413-4610-b365-72dffcc94600	a9a46758-8afb-4f38-94c0-e5ecb91575af	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:20.725
6fb47286-2ea1-45c4-b2ee-4219ce2b2f5c	b40bad66-7413-4610-b365-72dffcc94600	49f7aa81-4478-45d9-aaa2-248e84739b8c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:23.275
dcda759d-308f-417b-875f-0ffd308457fe	33b4dc2a-b042-4330-8113-fda43f07cd10	63982d91-3f3a-47c0-8088-6921634cb9e8	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:25.734
fad2fb75-6bd2-4d35-89d4-f18f10235300	33b4dc2a-b042-4330-8113-fda43f07cd10	9406260d-836a-4e24-8ec6-532493204d25	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:28.209
45fd34fa-1cea-49b3-96eb-9065546d7e6b	33b4dc2a-b042-4330-8113-fda43f07cd10	0e70bbdb-0e2f-4ec9-b7ac-12b85327a31c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:30.671
ae747474-db0a-4265-8100-ebad770df64b	1b719431-0f16-4095-b56e-c037998814aa	cf15c15e-2529-4e15-a835-d1229fc22e59	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:33.131
82819d34-b4c5-4003-8a4f-6988c548e248	1b719431-0f16-4095-b56e-c037998814aa	d5108fdc-9dff-49df-83ef-4302998c229a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:35.843
8be4dc2f-7298-450c-857b-51e3c132ca69	1b719431-0f16-4095-b56e-c037998814aa	0dd92bc7-575f-488c-91d0-6706a8ac69ef	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:38.3
395b9fc7-dad4-4dbb-bba9-c24ad2d40844	0ece9262-5007-4fc7-959d-b6804cb359b9	a1a17ee2-71e0-424e-9828-04dbf88310b3	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:40.756
72cc76a2-6cbc-47e5-9fd1-dd4d413b27ec	0ece9262-5007-4fc7-959d-b6804cb359b9	efb0020c-96fa-4a5e-a6e6-d83221f7e60c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:43.207
6d9f291c-fa45-47c7-84da-1deddb4fe8af	0ece9262-5007-4fc7-959d-b6804cb359b9	04554ae9-f5e8-487a-8bd5-b21006cb4377	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:45.667
60fa3947-6a34-4b72-927d-393f3a1cb13a	df36fd9b-d366-4c34-a5fa-1199df68bb26	0707b410-c124-4ea8-b69d-8673edd93d82	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:48.126
8fe9c742-1a89-4319-af20-be03f62213bb	df36fd9b-d366-4c34-a5fa-1199df68bb26	6f14189e-7223-4848-9f87-b6dd1d1df04b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:50.836
36e2013a-552f-4d7a-b874-2ebb800c7332	df36fd9b-d366-4c34-a5fa-1199df68bb26	e95ee89e-549c-4c7b-a7d4-3706ff1e29ab	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:53.296
f7323ff4-6210-4703-a3c1-083f6815d32e	73d4130e-1c54-4d63-8249-4f129c97cd90	a0ea5359-0ec2-4ee6-afb1-1fc875366167	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:55.813
46ae16f7-5700-4f45-bf94-d6f7fae3201d	73d4130e-1c54-4d63-8249-4f129c97cd90	e415508a-fe01-4b2b-9d29-291668f34a35	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:04:58.271
c4176ef7-f985-4513-b427-668ef39d3d44	73d4130e-1c54-4d63-8249-4f129c97cd90	b4d04fb6-9a88-4f48-bce2-f3445cba6651	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:00.722
db8f3590-f501-494d-a174-78455a76e015	a05ed06e-e57e-48f3-8e26-a861760bd2fb	3b7689bc-97e7-45b8-b431-c54a75ffdfdb	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:03.181
6772cc15-c4e2-4b03-94bf-34c254132e4a	a05ed06e-e57e-48f3-8e26-a861760bd2fb	69c72784-0aa6-4bd1-a435-62e659017451	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:05.648
2caea337-2786-4c38-8d55-8672df1767e7	a05ed06e-e57e-48f3-8e26-a861760bd2fb	7e8caddd-6f8e-4596-a7b3-7fb4c14da245	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:08.363
675c17f8-b737-4bfe-a157-635efabe1ee1	75ac202c-2415-48cf-ab16-a80f2e043943	d291e1cd-67b2-40b5-92df-5aecd9ed12e8	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:10.813
32d9086a-fea4-4efc-80f2-5953a915e7fd	75ac202c-2415-48cf-ab16-a80f2e043943	82066e89-9fa0-4e18-aaa3-04e54b996437	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:13.277
0fcb3cfc-5a13-4e27-823e-aa14ced3c621	75ac202c-2415-48cf-ab16-a80f2e043943	0587b1b7-3c83-436f-bb5b-6c8e6c77bd55	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:15.743
a2e9262b-eb92-448d-8cbb-9879f9addb63	8abad596-27ef-4643-8d66-4842a06760d6	d24b73d1-5c47-4cce-8f90-f3471ebb2bc8	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:18.199
4cdfdcd2-5e63-4ecb-b902-05e5332fca0b	8abad596-27ef-4643-8d66-4842a06760d6	a61628fc-2c9b-469a-ab69-92745df74d7b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:20.669
60909fa3-2c5e-47bf-8236-9df3d24d8659	8abad596-27ef-4643-8d66-4842a06760d6	b140ccfa-73b9-4ee1-a0ae-6c7eeae3cae2	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:23.385
a92cb05d-6fc0-4428-a21b-370eb551ca89	bed6484b-64cf-4785-9323-3805baed49a1	5b53661f-d644-41f6-ab76-ba3c1486b11b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:25.847
53e777fc-b642-438f-9e29-5f868e184816	bed6484b-64cf-4785-9323-3805baed49a1	9fddfadd-0d5e-4e1e-9c4c-8bc05487449f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:28.353
c772e323-abf1-406a-9373-f04fe45c97a0	bed6484b-64cf-4785-9323-3805baed49a1	ca3baf02-8e41-453a-beaa-d97c0cd77e82	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:30.841
93b2045b-3c99-468c-87ec-8fe3d43e3267	d1b1746c-1ec4-4692-ae96-47e2aadee234	bf726c21-f1c1-4efe-b075-844a42252905	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:35.24
d65dcafa-fdde-4302-94c6-cd4a02dd91f9	d1b1746c-1ec4-4692-ae96-47e2aadee234	883ba391-6a61-48c0-bdf3-f53f1328a4de	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:37.729
925f384c-d769-4a71-99e4-f0d49e0132b1	d1b1746c-1ec4-4692-ae96-47e2aadee234	9c208b1b-fd77-48ca-a619-dabc5f87c839	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:40.212
e4ba1746-0a06-4bba-a102-2d4662c6e1ec	ff170f46-3d00-4500-9eb4-c137ecf3a31c	f1acab12-433f-4cd9-b945-bc823b68be96	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:42.696
4b622c21-f065-466e-9668-4af85311391a	ff170f46-3d00-4500-9eb4-c137ecf3a31c	0d910888-ba82-4344-811c-43cd9fe5352b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:45.179
d867d3b6-3168-4ae7-a4cb-c610bb9afb96	ff170f46-3d00-4500-9eb4-c137ecf3a31c	459295bf-a47a-4f96-bb2e-aa0c8bb23190	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:47.679
a770ec62-d138-4328-9525-e504ff30a798	3c88b567-7ac2-44c7-8726-fa4902c0650b	ad40f5b1-5501-47d7-9914-8f451512d29d	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:50.167
82dc99cd-6732-438b-a912-ba003e08ac5f	3c88b567-7ac2-44c7-8726-fa4902c0650b	6c1d7c3a-882d-4182-89f2-f959355943c5	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:52.919
3ca54e3d-d49b-4c5f-800b-cd6f24ef47d6	3c88b567-7ac2-44c7-8726-fa4902c0650b	ff23f421-8023-4873-adac-dc3c780c9f41	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:55.402
6b8fe0b3-f8b3-4b95-b133-fc70e03f194d	7f1cb136-a5b1-4306-9704-62588862fbc2	f1f9d58c-7119-46a4-95cf-bf932be78433	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:05:57.891
2152a1c1-0205-4212-8e2e-cbe90aa03884	7f1cb136-a5b1-4306-9704-62588862fbc2	c09ab4cf-28b1-4ff5-bedd-b2a2aaf811c4	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:00.366
9b39d5c2-6784-47d4-aa34-454fa904fa33	7f1cb136-a5b1-4306-9704-62588862fbc2	353b1164-7b26-44dd-bb5f-326f39f11976	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:02.847
a83403e9-27c7-47ea-82be-9a37ecc93959	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	7ff2a85f-d807-403c-a50a-2445625b0d06	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:05.339
b9be3fb4-698f-429f-bc52-8f093af00d7a	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	69618c87-9267-4a5b-8606-80e73afd880c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:08.08
304a897d-6304-4ca9-84b5-9b9a6ebbf358	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	695ef035-d101-41b3-9336-789540d137dc	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:10.584
ea0e9d31-6315-4494-a39f-d004ba0cbe7f	0657e2e2-2d86-4106-b336-efd532d98fb4	87108f08-f2de-4c1b-b6d2-6acd33743785	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:13.078
1756a3c0-c342-400e-bf00-d6604b1c8c6d	0657e2e2-2d86-4106-b336-efd532d98fb4	f79f034a-4155-41a2-819a-469067fffb1f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:15.563
e6155a0b-a8b1-4d54-b9c3-c438b80718d6	0657e2e2-2d86-4106-b336-efd532d98fb4	6c1ee64c-ef8d-4eed-b2d0-07449b421f8e	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:18.13
754d8104-c17c-4d1c-b60d-dd4f339a7e9f	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	0243ee8f-0bf0-4149-9bba-6e81c90af2fd	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:20.615
5784bd1c-f912-4045-b889-850feb30fc99	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	75429028-624d-4f18-bdcd-be352f96c869	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:23.349
407b1d37-778c-472f-95b3-18f6e087a801	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	a5e27178-6659-4026-a6bd-96237fbbe019	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:25.846
cca9c398-3cb4-45e2-93ae-882985adc275	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	aa14e1a7-4cb4-4a16-ad0e-a196d66e84f5	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:28.382
022da31e-3f9e-4f4c-9ba8-1af4d1912884	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	129725a9-6c5b-4c54-a03b-09aadb7f50ae	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:30.873
1a2f361b-38bb-4c81-b5f7-b206e5c8f0ca	6210563a-b9ec-4047-b1d8-1da33e9662f2	d1b83c44-6019-4c88-8c3d-489f5bf536ae	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:33.356
ae42917d-a559-4ef4-9047-f46b77f7e79e	6210563a-b9ec-4047-b1d8-1da33e9662f2	4b914be8-b616-4008-b58b-9e9b91175833	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:35.84
d2068966-999d-4e43-b553-bc53248fa238	6210563a-b9ec-4047-b1d8-1da33e9662f2	0a7e6c9c-e96a-4b3f-b28a-a57e24313f10	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:38.404
210b8a14-178e-43cd-a414-92fe29593586	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	fa5dc5c0-174a-4ca2-9d35-16d416f89fc9	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:41.137
e2f910e7-04a6-4c5b-962c-5ba7cf082c05	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	4c531d6f-fc2b-4bcc-91d2-07c2e0e028ac	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:43.632
19ffb549-833a-439b-aef1-d16f0a468bcd	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	0f975451-3506-4a37-8495-d680bc105d54	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:46.118
c47e4b2c-8a11-48a9-949e-710d62df1333	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	83a9c94a-90ec-4212-998b-fb2d528a94d1	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:49.059
bdabbc8c-168a-4d9b-b4dc-c6519e6f34a3	c0221751-2228-456b-a326-b8d40f23c6c7	42f8ca74-2996-48ef-aeb2-898b3b7e2eda	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:51.542
1dd55750-ada3-47fc-ad96-7979816f558a	c0221751-2228-456b-a326-b8d40f23c6c7	92234760-a7e3-4822-ae6e-64f50ded9952	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:54.027
ac05c58f-e3a5-4771-ad37-2b24c8d86832	c0221751-2228-456b-a326-b8d40f23c6c7	199b023e-edc0-4b4a-9b0e-f88050526c75	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:56.766
9fae1262-1a7b-4a1f-949e-2d2047683c86	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	796b9793-f12f-4f42-8a93-7be245836500	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:06:59.254
f95f0d2e-6d8e-4c37-a372-6e4827b45e14	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	52db3e5a-2bc4-425e-a54a-d681ed9c5107	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:01.735
01aa66fc-e5f0-4102-8949-6eccb085715c	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	a825fd90-596b-4576-a09f-9eb9db225b7c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:04.221
a7a62139-7be5-4b6c-8e69-6947afa79235	996405d5-6f23-4ccc-a387-9d7f6fba68e8	687d47ba-cecc-44ab-857e-6172695fd3fc	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:06.704
e06d8fcb-436b-410f-b9e6-4a05aaaf2844	996405d5-6f23-4ccc-a387-9d7f6fba68e8	62f092f6-05f8-45b8-8eac-ca1cc4d16850	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:09.194
7dcbc066-fb46-493d-a5dc-880337d126e3	996405d5-6f23-4ccc-a387-9d7f6fba68e8	0573fbf4-2b5b-4bb8-95d7-abcb6f49534e	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:11.934
36996af1-92fd-47c5-bd3d-3eba166ca5fa	c8e98770-b2d9-4add-88b3-57af59796384	f3082516-e395-44a7-871e-50df330e7c10	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:14.415
9bf08005-6d00-47b7-a0b6-2d15baba011b	c8e98770-b2d9-4add-88b3-57af59796384	3aaef5d1-5583-44e7-a160-8a0ffd27132c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:16.961
30ba5b84-07e8-481f-90a3-f4afff71da92	c8e98770-b2d9-4add-88b3-57af59796384	1a02ec12-72e5-4d8a-aca9-e0511643bdc1	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:19.441
92ba143b-293a-4a49-bf2b-7403f39b338c	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	f13726a1-81e4-4db2-9420-6db757a2e587	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:21.935
125d0f58-c160-4586-b430-4c1268530318	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	16e7811c-47eb-4c91-9147-0586a5f7963f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:24.425
594d75e1-9d0a-4dac-a24c-041e0a1cc9d9	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	d8b97815-a9e6-4f3d-9d2b-32570317b093	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:26.91
e66d0aad-0700-4c91-b68a-978b943a3bec	74a0a41c-a5ca-4967-98d0-333b7ec343b9	42ffdaf1-4135-4000-93d4-19f389c4d216	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:29.644
7a285b95-06c9-4d7f-b071-3cf8c94caa89	74a0a41c-a5ca-4967-98d0-333b7ec343b9	985f7db7-f4c5-41c9-aef9-3e805ede200c	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:32.139
a189d564-fdec-486c-926d-ce35fe386c50	74a0a41c-a5ca-4967-98d0-333b7ec343b9	2472cdaa-685e-41ab-ab54-e5c01d53aad7	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:34.619
1ef46169-ca43-40be-93ed-03befd63c9de	5ff2b307-6c42-4108-926a-6e6fa1fac47b	2648b1ec-032b-4431-93c9-180feb02f8a6	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:37.103
c33d9175-9574-4adb-9dbb-1dbf989abbbc	7feb7a06-6c47-4394-90ed-3210cf471c2a	05421a68-81ce-403b-a34d-7cdeedf80328	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:39.614
85e2d014-8e26-4404-93bd-539099f9723b	5ff2b307-6c42-4108-926a-6e6fa1fac47b	77a5ded1-3dc6-463e-8595-bf59d2dfdb08	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:42.134
730f1dd2-4c41-4cee-a2ea-78a2fc2889fc	5ff2b307-6c42-4108-926a-6e6fa1fac47b	619c6077-c290-432d-b999-1590a1a01c3f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:44.906
c8fc90a6-b742-4a87-94d1-2cab98e0a1e7	7feb7a06-6c47-4394-90ed-3210cf471c2a	bd1491aa-199d-4ee9-a76e-24cc8623e9e7	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:47.421
078d6545-de5d-4c14-8b2e-527a564bfba0	7feb7a06-6c47-4394-90ed-3210cf471c2a	1de64d5f-5c1e-4f88-8e33-e49272d44161	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:49.95
a3d1c6c8-3a16-4a01-8fba-fc555e67eb34	b2ac3210-34a5-4e86-a628-0ea79aae160d	35d32d3a-d8c6-46e6-adfb-303a2ade2b94	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:52.471
4d850bdf-9a0a-4b33-89e4-0a1a5bf30b7f	b2ac3210-34a5-4e86-a628-0ea79aae160d	fa0a3efb-7531-466a-bec5-bc638e601cae	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:54.988
85163c31-ed7d-4662-85ac-e93249d8b261	b2ac3210-34a5-4e86-a628-0ea79aae160d	4efcccdd-54fb-4473-b593-51862d389bee	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:07:57.5
a3bbd3ed-c528-4d45-b0dd-b6556680c49c	69da95bf-6e1a-486b-b0c5-7d3fed07e012	fcaf03a9-f00c-4f79-983a-cd189b087016	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:00.269
d305d11d-8cc2-4d1a-b999-d585636ce27d	69da95bf-6e1a-486b-b0c5-7d3fed07e012	3995d114-f9db-47a5-a05b-421434a521be	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:02.787
4b2ae814-ab2e-449d-b44f-bab5a2fcc82a	69da95bf-6e1a-486b-b0c5-7d3fed07e012	09786652-7c59-40c0-9fb6-4122b3e3efb4	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:05.309
fa401e7b-9934-464b-b1b9-890743cdffd8	8905257e-c381-4912-a966-00223625f3e4	db0b1426-c3f4-44d8-b891-82b48360afec	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:07.825
9b3a0e0e-752e-42a6-9cd2-3aaabc2d7366	8905257e-c381-4912-a966-00223625f3e4	2080d329-b590-4159-9eb8-a4f4b39f2c65	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:10.351
dd268238-2a45-4684-b042-ce0b4c34b20f	8905257e-c381-4912-a966-00223625f3e4	13971c0d-609e-43f8-8bcb-1092f57f9fc2	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:12.875
90074f14-fe63-4071-907e-4adc85567bdc	af4c5426-894d-4900-9b64-1acede6eaa6e	acf082d4-c305-4d57-8748-c32d8147f161	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:15.653
c65493d4-4ec8-44f3-b5f1-2e6dad9d34ce	af4c5426-894d-4900-9b64-1acede6eaa6e	25548f7c-494a-4672-99b4-141ed1b500dc	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:18.17
6f1f12bd-f96c-4f5f-a6ad-8c9ebe8d80ca	af4c5426-894d-4900-9b64-1acede6eaa6e	961f4c08-74da-47f6-85a5-282eb2e4a91a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:20.693
64f65c2e-e968-4181-9cd5-5c1923ae67d9	fd56b88d-1e3d-4b94-841d-485aa0c62d93	61c550ad-662d-4ca0-a3c5-629d4e852d82	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:23.208
48e9586c-14dc-4bed-926e-d996e957725a	fd56b88d-1e3d-4b94-841d-485aa0c62d93	190e6517-a0c9-453a-9b7e-41f06cca2db7	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:25.721
675eadff-992f-4e88-bd5e-a149324adf69	fd56b88d-1e3d-4b94-841d-485aa0c62d93	a495cde3-fdb0-4983-bd12-d194b4b97d71	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:28.243
d084e9ec-61c1-429c-b644-ba4bece4c9e9	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	589c68f8-1269-4b35-8b57-0081db81da9a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:31.009
f640ba6b-d0ec-4656-abb4-c60f2f5c5da8	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	1e79031e-6427-43fc-9ad5-58b96592ddd5	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:33.538
e4aa7ee2-ee4a-48fd-9a4f-e6a0cf4d8234	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	5465592c-8caf-4123-854b-978a826f7b82	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:36.055
fd9c76fb-6dc5-495a-bc5a-83446e64c2b5	5b2f01bb-00bd-4a50-a834-3460898a017b	2bfd6611-fbc8-44f4-bf42-81b6178ae753	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:38.575
dc4791d8-e3a4-44f9-8c08-2cae21a229ff	5b2f01bb-00bd-4a50-a834-3460898a017b	15e3a2c3-538a-4265-b3cc-757854b61ffc	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:41.094
c3605f35-60f1-4f45-9fb5-b656000b19b8	5b2f01bb-00bd-4a50-a834-3460898a017b	b8b66a70-a11a-40dc-9c08-c1f64d56bcc8	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:43.619
7c8838f5-078a-448b-8ef9-dce1b9b6856b	6f311c30-c216-438a-b707-2e69ab4de5ce	ad1c51cf-7b2e-42fe-861f-7aa532a08aac	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:46.385
1025ce0b-dca8-4863-9fd4-677a052e959b	6f311c30-c216-438a-b707-2e69ab4de5ce	72158a80-d629-4a9b-b8ad-4281890e83e4	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:48.9
705bb71b-10d3-4cf9-810c-ae2ad7cc5417	6f311c30-c216-438a-b707-2e69ab4de5ce	e380a6a6-cc76-448c-bab3-ab2a95d6c921	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:51.427
c3fec5f0-3959-48b5-9c42-8b75b4df6bb0	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	180e83ce-130e-48ba-9754-024e861ddccb	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:53.941
8e12db21-9b2c-4937-bc85-ad0aa3194c22	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	4a4fa645-8ebe-4a52-b5c2-adc99ea3a84a	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:56.459
6fa1bde6-0a6a-441c-aaaa-1f7fba72b034	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	4d1d9b39-30dd-42fa-a435-850b606b9a42	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:08:59.031
9cf95e72-85db-44db-a2f5-2948b5965d53	67285bc6-6382-4b7d-8173-2d857a4a1c13	c5a96dfa-a7cb-4bf3-b52b-4f05ed287552	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:01.796
819c177c-d8f2-49a7-b437-7d4adb7e9e96	67285bc6-6382-4b7d-8173-2d857a4a1c13	723d6dca-6bd1-4e8b-ae33-afc9758af2a9	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:04.311
8f11df35-20ad-47d8-9e63-472f007d02df	67285bc6-6382-4b7d-8173-2d857a4a1c13	8c259534-93ca-4f39-8200-c43dff10735f	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:06.829
54513895-9b14-4dde-b257-470b40176023	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	8a69958e-8165-4315-bdf6-559118c6d54e	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:09.346
e15c3117-03a6-4f3f-bf52-5b8f7a11d4a4	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	9fdb29b4-937c-49ae-aa7c-ee54e9c45f1b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:11.862
c9a5a0f9-e146-487f-bdcb-50e9300566ab	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	3925f938-c8e0-40da-bff7-f9f1c6013c92	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:14.384
2e27324c-28ac-4438-bee4-7f4215577385	ff1b01c0-d0e9-4988-af57-57ef959974b4	a4f08758-3c95-4b00-a28d-fed1cf200d26	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:17.273
8a0bbe5b-76c6-4388-81d6-d4be912e299d	ff1b01c0-d0e9-4988-af57-57ef959974b4	e336a8c4-dffb-4f8c-8787-1d3574cdd260	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:19.827
8ad93f35-1c12-421e-b273-0b4458f2bfc6	ff1b01c0-d0e9-4988-af57-57ef959974b4	02030cdc-c47b-4cf6-9be1-62f7582aa0a3	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:22.356
41c68b3d-c4ff-43e0-be90-213dffb65382	d8defac8-a4f0-4335-a403-23d76a646acb	f3156374-f3ea-47ca-a6b1-639bdcad4b5b	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:24.882
d15e4408-a971-4da5-97c7-1b63baea69fa	d8defac8-a4f0-4335-a403-23d76a646acb	271370d7-5295-448c-a55b-f375a36ddcc5	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:27.4
d98fada2-1187-46cb-b0da-9218f75e5ed3	d8defac8-a4f0-4335-a403-23d76a646acb	8410ee93-4595-4606-8ffa-20be5f6cb87e	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:29.915
c3b80ada-5802-472b-b01f-8d7a622ed0b0	c2a9a595-7ec0-49f3-9016-9f1325ebd800	d1968311-a9d6-4df3-a526-c7c4a618ad14	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:32.696
d3f0043a-4715-4e85-87c6-0a2e3a18a107	c2a9a595-7ec0-49f3-9016-9f1325ebd800	45e0937e-649d-43a5-87ec-52fe54340264	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:35.215
ce4f940f-8876-473d-9267-f6fbcc950f7b	c2a9a595-7ec0-49f3-9016-9f1325ebd800	2524ea58-9c90-4965-a000-2a7c5fd1ff11	0	10	10	تحديد 10 حبات ككمية افتراضية	المدير	2026-07-04 17:09:37.728
04ecc84e-8390-4503-b9be-c960042b2474	f5fee43d-13f3-43bb-8508-b08bda80dd2c	0c8dafcb-92b0-4626-be85-54f461b755a2	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:10:58.702
a3c0c741-d920-4833-a68c-2e13d58e2b5f	f5fee43d-13f3-43bb-8508-b08bda80dd2c	0d334db1-57c7-427e-a4d2-8ff031422ea4	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:01.222
b6807418-83ba-4a8c-a597-5b1981884501	0489881e-3909-4d95-9a70-56f03ca9d2b8	8524a01f-cb0a-4e59-8f36-a940405bdaf9	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:03.73
495c1e82-cca3-4e24-8a21-fe8ef5138c66	0489881e-3909-4d95-9a70-56f03ca9d2b8	d7172eff-54b9-4ffe-823e-1e8031c0c083	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:06.256
c10b4a19-5752-4673-ae7a-45db8e7a7c34	0489881e-3909-4d95-9a70-56f03ca9d2b8	5e6a0756-3bb3-49c1-bcfe-c03938190027	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:08.767
d2fa701e-e710-4563-b077-5bfc084d08c7	d5dbc3ff-685f-4366-a30b-867a527e8a15	1760863d-6dcd-4667-8638-9ba79cceb770	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:11.279
ef6ecef4-f3ca-454f-8e00-a20c553288b9	d5dbc3ff-685f-4366-a30b-867a527e8a15	fdd65d9d-9c50-49dd-a546-0be8feadc3ee	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:14.045
cceade09-1f17-4c4d-94ac-16f20c056c2a	d5dbc3ff-685f-4366-a30b-867a527e8a15	7154d74e-c100-49f8-bc4c-edb09ddb0fcf	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:16.561
8aef8aa7-9a9c-42a2-af01-b6cc612a8717	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	6da38c37-feb0-4d46-8754-a1b671bc3611	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:19.113
852a093f-cfb2-4ed0-8718-d5f30b076447	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	23338eaf-5e58-48e1-81bd-2c2f7b8241d3	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:21.631
87b6810d-1e49-4395-a8b1-927b40cc5ad9	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	ae12f3a5-f4c9-419e-a2be-b66ef231faca	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:24.149
23ad28ee-43db-4134-a8c5-91e468989d57	767bc26f-f467-4b3f-9e70-f66c29c51718	250c28aa-1d83-4b41-9c28-23ce36aa29f0	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:26.661
ccf2c70f-0ead-4fc7-a2d8-b390a8f05b5b	767bc26f-f467-4b3f-9e70-f66c29c51718	eb9c5b29-1493-484f-b981-1a072a1738ae	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:29.403
02902fdf-0c21-4705-bcbc-f3a352796871	c6d45800-9bae-46ef-8800-343114afa08a	c689bad8-ad42-463d-b38f-eed7d4da9581	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:31.897
0da0c38f-ee0e-409c-b5fc-a598aa936315	c6d45800-9bae-46ef-8800-343114afa08a	b4cea2b6-85c7-4af8-8f04-fafd9b85a097	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:34.39
d579db62-454f-43a7-806d-c777bf7a88d1	c6d45800-9bae-46ef-8800-343114afa08a	c6d0ab04-81e4-491f-840c-2c64fdbc0a46	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:36.892
db779a67-7c9d-4c1d-8a00-2e9d1ca441ab	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	15094139-47e2-4bbe-a7bc-a13715d33ed9	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:39.402
07082512-5094-4bd6-b976-fb25f9f77370	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	e43ac61f-858e-4f7b-b818-550ba18993d0	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:41.89
b11be17e-0556-45a7-921a-0f06a66a6b96	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	d82e74d7-b95d-4bed-a1e3-892cc4263eeb	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:44.855
5d251a05-4efe-4f13-808d-8df4cfb12ab1	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	88498a1a-7240-4c5b-b27c-f666a9514ede	10	20	10	إضافة 10 حبات لكل منتج حسب الطلب	المدير	2026-07-04 17:11:47.352
3073dbbc-784e-4294-bce0-e30d541249b5	0489881e-3909-4d95-9a70-56f03ca9d2b8	8524a01f-cb0a-4e59-8f36-a940405bdaf9	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
018a8a52-7ad1-4ab1-86e1-1c4a85cac9f0	0489881e-3909-4d95-9a70-56f03ca9d2b8	d7172eff-54b9-4ffe-823e-1e8031c0c083	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
382a0cf4-5262-4220-9bca-b57442f24047	0489881e-3909-4d95-9a70-56f03ca9d2b8	5e6a0756-3bb3-49c1-bcfe-c03938190027	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2c4ffb45-7932-4714-84b2-82b460a5448e	d5dbc3ff-685f-4366-a30b-867a527e8a15	1760863d-6dcd-4667-8638-9ba79cceb770	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eddf1546-be5d-4b46-b5ff-092eb54896ef	d5dbc3ff-685f-4366-a30b-867a527e8a15	fdd65d9d-9c50-49dd-a546-0be8feadc3ee	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ca403ca0-8dca-4004-a6da-3f893c3d01c7	d5dbc3ff-685f-4366-a30b-867a527e8a15	7154d74e-c100-49f8-bc4c-edb09ddb0fcf	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1cb95916-e2c8-410f-b114-7afb5e79e4fc	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	6da38c37-feb0-4d46-8754-a1b671bc3611	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bd1b459a-8414-4801-914b-675db3f10ceb	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	23338eaf-5e58-48e1-81bd-2c2f7b8241d3	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
324d3938-55ec-4828-ae9f-f504b8e46658	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	ae12f3a5-f4c9-419e-a2be-b66ef231faca	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2f82fdbe-e7d3-4d7d-acb5-afcde9192ed1	767bc26f-f467-4b3f-9e70-f66c29c51718	250c28aa-1d83-4b41-9c28-23ce36aa29f0	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c4f3fe42-fc52-455b-9c2f-e80c282671b4	767bc26f-f467-4b3f-9e70-f66c29c51718	eb9c5b29-1493-484f-b981-1a072a1738ae	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef1d0e5e-ba7c-41e2-9f65-6eeb3c5a9cc5	c6d45800-9bae-46ef-8800-343114afa08a	c689bad8-ad42-463d-b38f-eed7d4da9581	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4956c32c-a477-4cfe-8b1b-b49b29fc16d5	c6d45800-9bae-46ef-8800-343114afa08a	b4cea2b6-85c7-4af8-8f04-fafd9b85a097	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
21a0c1b3-b27f-4110-a730-f514a46ca1ad	c6d45800-9bae-46ef-8800-343114afa08a	c6d0ab04-81e4-491f-840c-2c64fdbc0a46	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d90baa3e-7a6a-4ca0-ab36-36a5c4cdfc67	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	15094139-47e2-4bbe-a7bc-a13715d33ed9	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1e64f332-aae7-4c36-b017-fd61e1bd2255	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	e43ac61f-858e-4f7b-b818-550ba18993d0	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4da070a2-0c90-4366-a97a-285a6d444b81	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	d82e74d7-b95d-4bed-a1e3-892cc4263eeb	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
55ec58fa-c5f0-4e33-b97c-2e37ed4f6b2c	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	88498a1a-7240-4c5b-b27c-f666a9514ede	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f8719a03-d5a4-4d90-be4f-3f6f6d00f5ad	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	cf7343f9-7c05-4292-84de-ceb8859ea9da	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a555cd77-0cda-4437-ab1b-133573cd0524	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	b68255db-f9c5-4bec-bf49-046473c4de06	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d78dd9c7-0438-4997-943b-e5c225098977	d714c24f-a3cd-4109-b043-bb08f5cc0438	18f00978-f31f-49d4-a495-a876074add76	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6a63d902-cf46-4258-aae1-c6d30c325d85	d714c24f-a3cd-4109-b043-bb08f5cc0438	3892bd0d-1537-4ff5-a99a-cf87b5845175	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
934765be-af10-4762-86e6-00adfdc3f7a9	d714c24f-a3cd-4109-b043-bb08f5cc0438	0e27ebdf-bb06-4bbe-b995-67e066df3b7e	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
68eb0362-ad33-4935-9a98-82e1e4fc6bc0	b58cd811-68c3-46c6-b60e-c2cefb6b167c	1f3925b1-04d3-4bf8-9d34-1873a12ed76b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5ba3400f-7281-419b-b4dc-053d827c6135	b58cd811-68c3-46c6-b60e-c2cefb6b167c	343c6b08-2ee6-4e31-a617-a1b1e3ebbc81	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a001fbc4-b8f1-43ae-bcbf-2f7c5fa10cfa	b58cd811-68c3-46c6-b60e-c2cefb6b167c	80716401-8ba3-4a2a-9f79-72a807ad4331	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6a3f380c-0b0d-473b-b3a1-7b0e7390a74e	72f5204b-71de-40c6-bab1-ed8d5307e9f4	53169fed-0794-463d-a6ea-a2185564b5aa	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5b8ebd0a-fe5e-4ab9-b689-9acb02b2bcb7	72f5204b-71de-40c6-bab1-ed8d5307e9f4	22e6a23b-79f3-43ba-a95c-38cf52fb6963	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
edece015-cf9f-4530-b50b-889080801c4e	72f5204b-71de-40c6-bab1-ed8d5307e9f4	d6b83511-a34d-49da-b508-ec2e34f4a106	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5a46ea36-c4ae-4d25-8183-535758542ed8	28e85aaa-f5c9-4348-b831-0a993734a059	51cb4186-41a3-4740-89fe-f011602d7a76	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
969edfe0-721b-4808-bb18-16aa1b3141e9	28e85aaa-f5c9-4348-b831-0a993734a059	91d2b146-f9ce-402e-91f3-0661a6af6ae0	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f8b8128b-2119-46f8-81ce-156364072df9	28e85aaa-f5c9-4348-b831-0a993734a059	c9886ace-69e2-4a58-9d3c-3377e5f05e03	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c02865f6-0215-49d9-a6f1-6de11a08acd5	dd67cb78-da62-470d-8f29-c594b909f7a5	bcc971bd-4306-436b-8580-e353b6f327f1	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f728dbff-b236-43ad-87fc-88b6ea051982	dd67cb78-da62-470d-8f29-c594b909f7a5	8c71022b-ce92-4f08-85a0-b9e2565f4c29	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c2b3b478-b31e-4ddb-bdaa-7d30624e7034	6db54e28-8ba7-420a-ba75-ebe7979f09d0	e000cba2-12b8-45bf-8c66-31c3f2b680dd	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
337849da-298c-425b-95e4-4dbe710c95f8	dd67cb78-da62-470d-8f29-c594b909f7a5	85d07a80-8ad8-4e8c-96f5-6366fd1c120d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7560b62f-b8fd-4806-b5e5-64abd52b0ba8	6db54e28-8ba7-420a-ba75-ebe7979f09d0	56344db1-67f2-4fd8-aa01-3083a605c730	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
37eaea3c-408d-41fb-87cb-c0b57cbbad1b	6db54e28-8ba7-420a-ba75-ebe7979f09d0	8bcb217c-b543-46a0-9660-8949fad0595c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5fd07f57-2589-4887-bf4f-9d2607877a2c	ec08e506-0d25-4292-933a-7e77d056197c	9442856e-b460-4546-ba87-28ebeed79cf5	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
77b2216d-26f9-409d-8fb5-b60a9ff30ce3	ec08e506-0d25-4292-933a-7e77d056197c	a72a2f16-dc2c-4f66-9f47-8a60945d6d6d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8f05c6b6-d34f-4b09-b510-bf409775685d	84e50a6c-c3e0-4114-9150-d6205212b7ca	8813a99e-25cf-4a54-b9f6-1e25023eed67	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2d9e91d6-7825-4086-a657-6211f281ae17	84e50a6c-c3e0-4114-9150-d6205212b7ca	6e09ba5b-a33c-4f4e-8a3c-fdccae63674d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c0408b12-970f-4fa7-9110-54be42eb5bf7	84e50a6c-c3e0-4114-9150-d6205212b7ca	12617d38-c0ec-4482-b9b2-5439adc4688a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3594be4a-d4e4-43e4-bc84-17f5f2a327e6	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	fd0571c8-1c49-48ff-a6f8-af5991b695f9	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
44f8d352-8f95-42e5-a64c-d0caabff49fd	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	d8159635-18ad-4f99-8312-4010294b820a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b51cd236-57db-4754-bada-446cdc427df0	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	073c0cb6-0bcd-4836-a7cd-ad2cffc88476	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7df92ca4-1632-4a58-85f0-9197325a0b64	bbbe0953-9dad-41a1-b246-0bbf527278d2	e682f7b1-d8a6-4453-994f-ce566b1f1a3d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5bfc670b-c5f0-4d90-ab31-f0236fb8d06b	bbbe0953-9dad-41a1-b246-0bbf527278d2	aa4dd26b-bb6e-4051-b619-79b224319068	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9204be88-4bd8-4dc7-954d-b2e7ad49c01b	bbbe0953-9dad-41a1-b246-0bbf527278d2	c281d5b1-7d8f-4969-b138-b18acf79bbf4	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0458b400-22f4-469e-9e8a-79fe4e225fa9	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	845de796-7544-4649-baed-3af917d0345f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9c1c69ae-c34d-41fa-b890-8a87f3d1dae2	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	27ae767b-fd70-49f3-ade8-6d2e88d38fb1	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aefbcbce-3a59-4a97-a7fa-d84ace1a2a8f	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	6b451893-2cdf-4a4f-90ce-af8659f87bd4	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e828d787-ea54-4916-86b9-f73739a7c35d	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	8e15fbf9-9ddb-4963-87c6-3b668f79f36d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
728fe12b-a4ea-4a16-a965-527f449cf189	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	2d06ac94-bad5-4d0e-b350-2f495cfe6e26	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4ea9d9f8-6c05-453f-b72e-f43973713d98	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	d0855f36-7912-426e-acbd-63707a0b15a8	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
36bf52cc-6b02-4783-ae4d-c165568983bf	48d5299f-c979-4fc4-bc27-0043890a7b8d	7aae0858-c79a-419a-9a49-219ea819f97b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
44c6a4b0-74aa-4fce-b118-b9c68dc87fcc	48d5299f-c979-4fc4-bc27-0043890a7b8d	ca10786e-780f-4b6c-af43-7fd65ce46929	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9fd86353-85eb-4d49-b3cd-d3cee047272f	48d5299f-c979-4fc4-bc27-0043890a7b8d	32710473-8e4a-4a07-a053-fb83b245c0b0	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
63056476-0127-4bf3-9df5-4ab4335b2575	856088c4-d455-4674-86d7-1abe92e243b6	c3888bab-06b8-4eac-a20c-24391c193e01	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
50df2ec9-a7d2-4560-a086-48a0624de8ab	856088c4-d455-4674-86d7-1abe92e243b6	764f3f78-9f7a-463e-8448-bf1f0e7a58a5	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d34788f9-6ab6-44f1-92d5-50edd0d48658	856088c4-d455-4674-86d7-1abe92e243b6	4ab9d900-f5ac-465b-a1b6-47c7d073a11d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b31e253a-67f9-42ac-bf5f-9c0056358ec0	01f8559c-9dd2-4dad-90b6-c306988299e5	4c455f25-935d-45e5-90a8-c82c68c2547f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9569aaa2-137a-4948-ab72-f466a1851b0e	01f8559c-9dd2-4dad-90b6-c306988299e5	fdbc45bd-9959-487c-bd50-7f0d6567907c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8e46eae5-21d6-4d8d-af4c-48931b107757	01f8559c-9dd2-4dad-90b6-c306988299e5	c8cb47cd-12df-460e-8232-cb42110fecb3	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d7bb7203-a7e3-4cc9-b26d-e075f96ed72e	16d29daf-79b9-42fb-964c-b50553900528	a5af5325-56f7-472a-a9fb-da77cf575a4d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ea33cd9b-a887-4c21-940d-1fbe5ec6417d	f5fee43d-13f3-43bb-8508-b08bda80dd2c	0c8dafcb-92b0-4626-be85-54f461b755a2	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
494c785a-d443-4b67-8935-ebbbc51a8627	16d29daf-79b9-42fb-964c-b50553900528	b22d6f1c-c148-4e7e-9582-ff137e0315d2	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c0d4a25e-09b7-4d70-8ffb-18f4e1ba93f0	16d29daf-79b9-42fb-964c-b50553900528	00551b91-53da-43ea-9b41-67446e705c1f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
73826aac-08e1-44e1-9aff-2f8c001a4c19	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	d2144204-4920-43bb-a4e1-fdb4144bb0ba	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c900754d-f059-42d6-862a-1bc9698e39c1	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	2af14f5c-cfe6-4aa6-b139-e5898546be3c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
06364a30-856b-4c4d-8014-0a857bce9cc1	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	71517b3e-bca2-4fba-be63-a9644e7392b2	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a58021f0-fb05-4aa1-8a4a-f9856056794b	f1a00606-4504-41f9-9b85-2a04a7f765a6	a9e27fdf-e03e-47a9-889d-718fe079f6dc	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1313c284-6893-41b6-a389-e896ef9ba5e8	f1a00606-4504-41f9-9b85-2a04a7f765a6	2583597c-5084-46a6-b548-024e0848286a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8b8cc30a-fefc-4f60-8b13-b1eddd67751f	f1a00606-4504-41f9-9b85-2a04a7f765a6	027dbc49-5db6-4287-b4e8-d9a6d0731a95	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
68a8b9d3-e908-4021-bab6-97e0f9847469	b40bad66-7413-4610-b365-72dffcc94600	edbf94eb-e6d2-4728-9762-a9b8863a5263	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6c665a40-3f83-4a72-a83b-9cd9936f7f5b	b40bad66-7413-4610-b365-72dffcc94600	a9a46758-8afb-4f38-94c0-e5ecb91575af	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2ae7ecab-3ed3-45e5-b463-d055844e6658	b40bad66-7413-4610-b365-72dffcc94600	49f7aa81-4478-45d9-aaa2-248e84739b8c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
42b08664-f577-4de3-88df-ce38b82cfe0a	33b4dc2a-b042-4330-8113-fda43f07cd10	63982d91-3f3a-47c0-8088-6921634cb9e8	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
178e7dd8-eb5c-433c-8a2c-dd758bbd5d42	33b4dc2a-b042-4330-8113-fda43f07cd10	9406260d-836a-4e24-8ec6-532493204d25	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9e2943a2-a4f2-4760-a40e-58e7658330dc	33b4dc2a-b042-4330-8113-fda43f07cd10	0e70bbdb-0e2f-4ec9-b7ac-12b85327a31c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b4603519-ad14-4d8a-8f25-6d1c8246f060	1b719431-0f16-4095-b56e-c037998814aa	cf15c15e-2529-4e15-a835-d1229fc22e59	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f891c0db-5688-465a-be1e-e4fe657d1806	1b719431-0f16-4095-b56e-c037998814aa	d5108fdc-9dff-49df-83ef-4302998c229a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
541d58f0-980d-475b-9f07-7fe68e972c0f	1b719431-0f16-4095-b56e-c037998814aa	0dd92bc7-575f-488c-91d0-6706a8ac69ef	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cfccbbbf-9f9b-486d-a748-1fafa52171c1	0ece9262-5007-4fc7-959d-b6804cb359b9	a1a17ee2-71e0-424e-9828-04dbf88310b3	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a2c97fea-fcf9-46f5-91fc-5c6084b4548a	0ece9262-5007-4fc7-959d-b6804cb359b9	efb0020c-96fa-4a5e-a6e6-d83221f7e60c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3c97d6d5-7855-4b1c-baab-5719b70a9581	0ece9262-5007-4fc7-959d-b6804cb359b9	04554ae9-f5e8-487a-8bd5-b21006cb4377	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
da78f3ab-d4cf-45e1-8182-c7e152249fef	df36fd9b-d366-4c34-a5fa-1199df68bb26	0707b410-c124-4ea8-b69d-8673edd93d82	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ababbc4b-b127-447b-a894-5eec998e2017	df36fd9b-d366-4c34-a5fa-1199df68bb26	6f14189e-7223-4848-9f87-b6dd1d1df04b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
48ecc6c2-ea9f-41a4-85f6-762005a69421	df36fd9b-d366-4c34-a5fa-1199df68bb26	e95ee89e-549c-4c7b-a7d4-3706ff1e29ab	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f269bf5e-040d-47e1-bc45-207a22926a56	73d4130e-1c54-4d63-8249-4f129c97cd90	a0ea5359-0ec2-4ee6-afb1-1fc875366167	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27f56515-b1f5-4a38-9431-32b45dbd4579	73d4130e-1c54-4d63-8249-4f129c97cd90	e415508a-fe01-4b2b-9d29-291668f34a35	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2783578e-731a-4cda-a469-e3831874b146	73d4130e-1c54-4d63-8249-4f129c97cd90	b4d04fb6-9a88-4f48-bce2-f3445cba6651	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9c94b286-317b-4b0f-934a-361a8265959b	a05ed06e-e57e-48f3-8e26-a861760bd2fb	3b7689bc-97e7-45b8-b431-c54a75ffdfdb	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c9db62c7-65e0-4068-9f6b-7a0e4f527056	a05ed06e-e57e-48f3-8e26-a861760bd2fb	69c72784-0aa6-4bd1-a435-62e659017451	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1ec2cdb2-d334-480d-bdfb-5800c6318a08	a05ed06e-e57e-48f3-8e26-a861760bd2fb	7e8caddd-6f8e-4596-a7b3-7fb4c14da245	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8b87b644-b114-4a8d-96b9-cb58c8f32ae8	75ac202c-2415-48cf-ab16-a80f2e043943	d291e1cd-67b2-40b5-92df-5aecd9ed12e8	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4c28ba8b-2d5e-47c8-a7eb-dcff0298c6f5	75ac202c-2415-48cf-ab16-a80f2e043943	82066e89-9fa0-4e18-aaa3-04e54b996437	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3e13621c-04a4-4f83-977a-e528d21fe4ce	75ac202c-2415-48cf-ab16-a80f2e043943	0587b1b7-3c83-436f-bb5b-6c8e6c77bd55	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0c6987bd-1b67-473e-8ff0-b19fcd51639f	8abad596-27ef-4643-8d66-4842a06760d6	d24b73d1-5c47-4cce-8f90-f3471ebb2bc8	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
70f329cb-f6de-49c4-904a-ba8cfa9c43b8	8abad596-27ef-4643-8d66-4842a06760d6	a61628fc-2c9b-469a-ab69-92745df74d7b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ea7d4ba0-9a9f-4dcc-9909-a38485821272	8abad596-27ef-4643-8d66-4842a06760d6	b140ccfa-73b9-4ee1-a0ae-6c7eeae3cae2	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1b61aa90-e9ef-4689-899b-6aa9dc6ef40f	bed6484b-64cf-4785-9323-3805baed49a1	5b53661f-d644-41f6-ab76-ba3c1486b11b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ff94d668-dfab-4202-baad-70b2cb17832b	bed6484b-64cf-4785-9323-3805baed49a1	9fddfadd-0d5e-4e1e-9c4c-8bc05487449f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
36d59750-68fd-4a6e-82d9-da20b6cb88a1	bed6484b-64cf-4785-9323-3805baed49a1	ca3baf02-8e41-453a-beaa-d97c0cd77e82	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6cfc49d1-63cc-4cb6-9932-84d63b5c2fef	d1b1746c-1ec4-4692-ae96-47e2aadee234	bf726c21-f1c1-4efe-b075-844a42252905	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4edb86f9-f00e-46eb-b1ee-2a427bc16508	d1b1746c-1ec4-4692-ae96-47e2aadee234	883ba391-6a61-48c0-bdf3-f53f1328a4de	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
829c31cc-dc52-47d0-b836-53cef7663cf5	d1b1746c-1ec4-4692-ae96-47e2aadee234	9c208b1b-fd77-48ca-a619-dabc5f87c839	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7ce79994-7882-4db5-96da-9fc97e73383d	ff170f46-3d00-4500-9eb4-c137ecf3a31c	f1acab12-433f-4cd9-b945-bc823b68be96	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6a18f2c6-724a-4d24-9db6-ea6a88912dc2	ff170f46-3d00-4500-9eb4-c137ecf3a31c	0d910888-ba82-4344-811c-43cd9fe5352b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
04a9a432-6aed-426d-9c66-e561b1f3bcbb	ff170f46-3d00-4500-9eb4-c137ecf3a31c	459295bf-a47a-4f96-bb2e-aa0c8bb23190	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
984da898-65da-49c4-8d28-f3a7d0e09139	3c88b567-7ac2-44c7-8726-fa4902c0650b	ad40f5b1-5501-47d7-9914-8f451512d29d	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0b927dd0-b314-4674-bb90-0f027495fba1	3c88b567-7ac2-44c7-8726-fa4902c0650b	6c1d7c3a-882d-4182-89f2-f959355943c5	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
79f90cb5-1cb2-4613-bfc6-dee2ddc93a64	3c88b567-7ac2-44c7-8726-fa4902c0650b	ff23f421-8023-4873-adac-dc3c780c9f41	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ea62a61f-bd5f-4d23-96c1-8ee39e5bcc4c	7f1cb136-a5b1-4306-9704-62588862fbc2	c09ab4cf-28b1-4ff5-bedd-b2a2aaf811c4	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6ce81afd-58b1-47c6-b2eb-035df83fde83	7f1cb136-a5b1-4306-9704-62588862fbc2	353b1164-7b26-44dd-bb5f-326f39f11976	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
01a0181b-44ce-42b3-a199-33b4624d8ce7	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	7ff2a85f-d807-403c-a50a-2445625b0d06	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e2582ac2-6f8f-4fa8-9586-0f3c93400d2a	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	69618c87-9267-4a5b-8606-80e73afd880c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
636759fa-9959-4446-aee4-ea5905700ecd	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	695ef035-d101-41b3-9336-789540d137dc	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f566c806-8bc1-4b2d-9c04-3d5d5ae291ef	0657e2e2-2d86-4106-b336-efd532d98fb4	87108f08-f2de-4c1b-b6d2-6acd33743785	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2c6b98df-5edc-467d-8434-b901c363ee9a	0657e2e2-2d86-4106-b336-efd532d98fb4	f79f034a-4155-41a2-819a-469067fffb1f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
64411009-7710-48cf-9252-499a6733e357	0657e2e2-2d86-4106-b336-efd532d98fb4	6c1ee64c-ef8d-4eed-b2d0-07449b421f8e	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b94e0390-d1ee-4281-8bff-6efa28f45573	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	0243ee8f-0bf0-4149-9bba-6e81c90af2fd	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
89ee0ceb-d5de-4fb8-bca3-c22ed5d43a38	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	75429028-624d-4f18-bdcd-be352f96c869	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7576d0c8-0a08-43a4-bd35-12b83a1180a3	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	a5e27178-6659-4026-a6bd-96237fbbe019	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
74233a30-b9e6-4099-a8f2-fd575a063754	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	aa14e1a7-4cb4-4a16-ad0e-a196d66e84f5	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c3723b43-2939-4658-850f-855e570d1f5b	6210563a-b9ec-4047-b1d8-1da33e9662f2	d1b83c44-6019-4c88-8c3d-489f5bf536ae	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7e48ec06-07f3-489c-beae-37627bf4492b	6210563a-b9ec-4047-b1d8-1da33e9662f2	4b914be8-b616-4008-b58b-9e9b91175833	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
413d4b79-86af-4769-b963-e8726776f16c	6210563a-b9ec-4047-b1d8-1da33e9662f2	0a7e6c9c-e96a-4b3f-b28a-a57e24313f10	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7a21c0d1-a3d5-4887-afe8-571f10e24b53	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	fa5dc5c0-174a-4ca2-9d35-16d416f89fc9	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d4577b67-7ff5-46b5-868e-169af6bf4fa0	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	4c531d6f-fc2b-4bcc-91d2-07c2e0e028ac	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
53f9fcda-e816-475b-a44a-d78fd50a067d	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	0f975451-3506-4a37-8495-d680bc105d54	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
85ba164c-0af4-4b14-a207-7e327758f554	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	83a9c94a-90ec-4212-998b-fb2d528a94d1	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
830a46d8-28c1-45cb-88aa-e9c08d06c949	c0221751-2228-456b-a326-b8d40f23c6c7	42f8ca74-2996-48ef-aeb2-898b3b7e2eda	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a4da49dd-84b4-4fc1-be5f-f8cc93bbfd21	c0221751-2228-456b-a326-b8d40f23c6c7	92234760-a7e3-4822-ae6e-64f50ded9952	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b47499a4-a28a-4876-b1fe-9dbf1d342e79	c0221751-2228-456b-a326-b8d40f23c6c7	199b023e-edc0-4b4a-9b0e-f88050526c75	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d56edc7c-e3ef-43fa-93b6-c0dc342d21ed	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	796b9793-f12f-4f42-8a93-7be245836500	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8b4ea1d7-fe97-4505-ac16-887b53614d19	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	52db3e5a-2bc4-425e-a54a-d681ed9c5107	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
74161790-f46b-4f28-ba22-2fe98f70e7a5	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	a825fd90-596b-4576-a09f-9eb9db225b7c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
73581e1c-e45c-4f5d-a590-dc4a760211d7	996405d5-6f23-4ccc-a387-9d7f6fba68e8	687d47ba-cecc-44ab-857e-6172695fd3fc	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1da7587d-9e5f-4c4d-a267-5365505211b8	996405d5-6f23-4ccc-a387-9d7f6fba68e8	62f092f6-05f8-45b8-8eac-ca1cc4d16850	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6851ef6c-b998-4f4a-b9c8-092ef75ad1c1	996405d5-6f23-4ccc-a387-9d7f6fba68e8	0573fbf4-2b5b-4bb8-95d7-abcb6f49534e	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cc058f7e-3dd5-4fdb-a146-3cbf73abf171	c8e98770-b2d9-4add-88b3-57af59796384	f3082516-e395-44a7-871e-50df330e7c10	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cb0cc310-9d5a-4887-83f0-9119915bf02e	c8e98770-b2d9-4add-88b3-57af59796384	3aaef5d1-5583-44e7-a160-8a0ffd27132c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a389a9d6-6c74-45a7-8817-be35df557582	c8e98770-b2d9-4add-88b3-57af59796384	1a02ec12-72e5-4d8a-aca9-e0511643bdc1	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d83f9f54-6ab9-4e21-8774-aea21f9c9b5a	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	f13726a1-81e4-4db2-9420-6db757a2e587	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0aceabbc-16de-45be-bf04-94054424036b	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	16e7811c-47eb-4c91-9147-0586a5f7963f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
736f00d0-cfb6-4c75-8de6-4c42271a8e9b	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	d8b97815-a9e6-4f3d-9d2b-32570317b093	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bed956a3-097e-494c-80b8-88641318991d	74a0a41c-a5ca-4967-98d0-333b7ec343b9	42ffdaf1-4135-4000-93d4-19f389c4d216	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4c0657d7-0279-4c17-92cd-8f7a0dde6446	74a0a41c-a5ca-4967-98d0-333b7ec343b9	985f7db7-f4c5-41c9-aef9-3e805ede200c	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4e39bd7b-9cf9-49e9-b1e7-1b01563a2597	74a0a41c-a5ca-4967-98d0-333b7ec343b9	2472cdaa-685e-41ab-ab54-e5c01d53aad7	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9710073d-fb8b-4796-8625-553a2fcf417f	5ff2b307-6c42-4108-926a-6e6fa1fac47b	2648b1ec-032b-4431-93c9-180feb02f8a6	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6d566bcd-f923-42f9-addb-4285bf1fb428	7feb7a06-6c47-4394-90ed-3210cf471c2a	05421a68-81ce-403b-a34d-7cdeedf80328	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b5c64629-5593-4067-acb9-bde8bcb8752f	5ff2b307-6c42-4108-926a-6e6fa1fac47b	77a5ded1-3dc6-463e-8595-bf59d2dfdb08	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8841c958-cb21-44c8-85c1-2c16043f7c16	7feb7a06-6c47-4394-90ed-3210cf471c2a	bd1491aa-199d-4ee9-a76e-24cc8623e9e7	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
60504678-4c4b-4282-a732-924266fb30c4	7feb7a06-6c47-4394-90ed-3210cf471c2a	1de64d5f-5c1e-4f88-8e33-e49272d44161	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
be39446e-04d1-41aa-b138-6d1be91fc865	b2ac3210-34a5-4e86-a628-0ea79aae160d	35d32d3a-d8c6-46e6-adfb-303a2ade2b94	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
79ed6967-def3-494f-abaa-2fee3259c2e2	b2ac3210-34a5-4e86-a628-0ea79aae160d	fa0a3efb-7531-466a-bec5-bc638e601cae	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8eb5ea33-7039-4930-845f-b0da043eddf0	b2ac3210-34a5-4e86-a628-0ea79aae160d	4efcccdd-54fb-4473-b593-51862d389bee	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bdfb4995-ce5d-4811-8661-1ef1e623a9ac	69da95bf-6e1a-486b-b0c5-7d3fed07e012	fcaf03a9-f00c-4f79-983a-cd189b087016	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7e16ff1d-af76-482a-936d-7ad7bafa7d0d	69da95bf-6e1a-486b-b0c5-7d3fed07e012	3995d114-f9db-47a5-a05b-421434a521be	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7bfe1787-bbc4-41da-b3a0-14d90bdba17f	69da95bf-6e1a-486b-b0c5-7d3fed07e012	09786652-7c59-40c0-9fb6-4122b3e3efb4	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5fd80f7c-66a6-45a7-83e6-f026cde57f84	8905257e-c381-4912-a966-00223625f3e4	db0b1426-c3f4-44d8-b891-82b48360afec	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b6e6a1ab-4655-4a5e-8e73-cd36b0366ba1	8905257e-c381-4912-a966-00223625f3e4	2080d329-b590-4159-9eb8-a4f4b39f2c65	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
82af4a32-14e8-4e3e-822f-c80b1802b7af	8905257e-c381-4912-a966-00223625f3e4	13971c0d-609e-43f8-8bcb-1092f57f9fc2	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c84e4e67-f270-4367-86e6-2a7c61434031	af4c5426-894d-4900-9b64-1acede6eaa6e	acf082d4-c305-4d57-8748-c32d8147f161	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0cd912d2-9713-4e23-ac24-c8f350b8aba7	af4c5426-894d-4900-9b64-1acede6eaa6e	25548f7c-494a-4672-99b4-141ed1b500dc	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
460eb515-d0c1-4146-9e5c-12180d809eb0	af4c5426-894d-4900-9b64-1acede6eaa6e	961f4c08-74da-47f6-85a5-282eb2e4a91a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
26325a04-4662-4f9e-b836-ae1c19de7b25	fd56b88d-1e3d-4b94-841d-485aa0c62d93	61c550ad-662d-4ca0-a3c5-629d4e852d82	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27d1b8cf-58ec-4f26-bb84-53002d047a0d	fd56b88d-1e3d-4b94-841d-485aa0c62d93	190e6517-a0c9-453a-9b7e-41f06cca2db7	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7a5aa8ea-2e48-4823-ba7a-b0c48b9464ff	fd56b88d-1e3d-4b94-841d-485aa0c62d93	a495cde3-fdb0-4983-bd12-d194b4b97d71	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dc12a1e7-dfaf-49f0-b9c1-9964a11ce6e3	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	589c68f8-1269-4b35-8b57-0081db81da9a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ff1f68ed-67cf-4c80-aacf-b5a6bfadcdcd	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	1e79031e-6427-43fc-9ad5-58b96592ddd5	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
49caafba-b7c3-4899-8874-44ac87329f25	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	5465592c-8caf-4123-854b-978a826f7b82	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ed9dc8fe-3e06-4428-aa8e-9b2526d23391	5b2f01bb-00bd-4a50-a834-3460898a017b	2bfd6611-fbc8-44f4-bf42-81b6178ae753	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5dce806a-6ae1-45c7-9fa8-f37db44fe0f4	5b2f01bb-00bd-4a50-a834-3460898a017b	15e3a2c3-538a-4265-b3cc-757854b61ffc	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eda5a737-a166-4c05-8b07-625b00cd8b20	5b2f01bb-00bd-4a50-a834-3460898a017b	b8b66a70-a11a-40dc-9c08-c1f64d56bcc8	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1b710c3f-15ba-4d72-a2ee-1f5f70ee7a5b	6f311c30-c216-438a-b707-2e69ab4de5ce	ad1c51cf-7b2e-42fe-861f-7aa532a08aac	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
88d3bf55-ad1a-4083-a278-9aebb76f30b4	6f311c30-c216-438a-b707-2e69ab4de5ce	72158a80-d629-4a9b-b8ad-4281890e83e4	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
45ecb38e-7e35-4b3c-91c6-021f2caeca50	6f311c30-c216-438a-b707-2e69ab4de5ce	e380a6a6-cc76-448c-bab3-ab2a95d6c921	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1db369d3-b7bd-48ef-9871-d8143eafd3d0	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	180e83ce-130e-48ba-9754-024e861ddccb	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6439ed47-f2bf-4c28-861b-059bf1620434	3a63970f-150d-47d6-ada7-457c5eeac590	92231b70-f3a3-4596-900a-5518c82a09a0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fc656154-9717-4a4b-a03b-4d7138310f07	3a63970f-150d-47d6-ada7-457c5eeac590	3770dac1-9751-4884-8af8-9037cfcf4caa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d10701b7-6e3c-4d6e-acd2-cafa827900b7	3a63970f-150d-47d6-ada7-457c5eeac590	a421f29c-e8b7-406d-ab67-aa9d625396b2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cd7a45dc-544c-475c-8f75-67a3eb377998	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	888b2ab5-7c92-42a0-a957-5f3615001b7f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1ce8dd33-fcfa-4e7e-88fc-c06e1ef6068c	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	f8dd85bb-64f2-4466-9651-7f5eadaab36b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7a112d4d-0db2-4cca-bbd3-eb9e30304584	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	569de15c-034a-40bf-9f78-234eaf825a5f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
583bbaeb-8178-400f-a37f-1bf98a556328	4b07031f-9a4b-46b9-b02d-6ee759270535	7a469995-8998-4e23-b96d-d742c1ce9a9d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
306e4720-4fd6-4122-b4e8-a653b9f91735	4b07031f-9a4b-46b9-b02d-6ee759270535	fd50482f-0e1b-48cd-b6a2-ba798e741bd0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8f259c58-40c1-4221-a271-f0834b52fce7	4b07031f-9a4b-46b9-b02d-6ee759270535	61aaca92-9446-41f3-a6c0-25263d3c58f6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b0f59eab-dacb-4884-aafe-b3dd2656e551	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	3404141d-34f4-4a5b-bb73-1c60ed00d12d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f5608dee-1473-4a75-b3fc-77024239255a	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	55cfb12a-746d-4288-a9e4-0d344f380234	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dad406d6-6806-4d2c-8363-ed55e046b175	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	815b0349-6f60-4973-886c-f08a764dd6fb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4c827683-e2f9-4f96-8e3f-796138a761f1	1904f302-353b-49a3-a3cf-a44a83900ef1	52a6670a-8f84-4ba3-bfce-ff5cd1c34adc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
36d5622d-ac8a-4b75-b430-07ac6a12d2b0	1904f302-353b-49a3-a3cf-a44a83900ef1	79dac462-b4f8-46b4-b946-512580a4533c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c202609a-03f2-43d6-ad3a-94aa6432fabd	1904f302-353b-49a3-a3cf-a44a83900ef1	60642496-0cdb-46bc-bd85-4ded25b9ea08	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c0c8e674-4898-4c8a-a033-18430976a5a4	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	ecd166f4-3d6d-4b6f-996b-c4cdf87daa41	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ea606d01-d788-4f0c-81a4-b7b96634f9d2	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	e9493889-5b06-4d08-9fd9-11fca6ea3d1e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b34d70b6-9c30-40c7-b1d5-4550de896913	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	911b002c-580e-4a9b-a3b6-2799f359534f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
49f93578-d623-4360-a05e-a5b4ce2fe43b	6fa838ee-ec16-4d7e-99ee-001963647cf0	177237b4-25ad-4fe8-b9c5-6570d73c6603	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d12b23fa-cdb2-45a0-bccc-6a943a4bd9d6	6fa838ee-ec16-4d7e-99ee-001963647cf0	5c133d06-40eb-4815-9d76-e134ae452e08	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c085123d-a0d1-44cd-9428-17660d777953	6fa838ee-ec16-4d7e-99ee-001963647cf0	4b74def7-d013-4203-8a3b-19a8af2eb278	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3d5fdbf8-8ec3-4cf5-82a6-fe948a37590c	ffa94942-4222-4270-962e-40340b6abbc1	85224bf2-9ef4-4aca-8e34-3dd25cb50b47	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cccf53fe-e354-4330-96f1-751a615e7f5a	ffa94942-4222-4270-962e-40340b6abbc1	b25e0096-58a4-4ee4-9741-c0f426bcf44f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
893c106e-734f-4cb9-8cdb-5d5d6c70d168	ffa94942-4222-4270-962e-40340b6abbc1	8ffe4be6-2205-48ed-b21e-93262ddd5c4d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
11bf8e6c-4de6-4164-9db1-5bba54298ece	aad91930-910d-46f4-82a5-e40f5d3cf0c9	fa5f636e-64b5-44ec-8587-fc037443c65f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef1aed4e-e13c-4f1f-af41-6e1bfae15070	aad91930-910d-46f4-82a5-e40f5d3cf0c9	e098d087-addd-4ac9-a937-d5f85193f63a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
01e271e9-884e-41a6-a869-219c3e288d72	aad91930-910d-46f4-82a5-e40f5d3cf0c9	f0f518c1-5077-4fa9-878d-fe7e63248b01	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ce94f708-352a-485f-8b39-853e272ccd08	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	3ea2a8ea-5fa1-4780-bceb-2407e3e64c1c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
20a282e9-6b1d-4569-90e6-84768da25828	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	d4c3251a-5b10-4011-b4a6-e92a6f356388	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cc33019c-552d-4f94-a3c9-3fd10eb54068	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	78e1e90a-5697-46fd-a45a-09149bc1127b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c58690bc-7a12-46e1-909b-eace95569aa9	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	27e8f320-b3ee-4867-915c-7ffd12a3977f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cf8946a7-706d-4aaf-877f-f4738cc0f8b7	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	2342b439-8e36-4d06-8245-9f26a8f8ceef	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bf11c6a4-d03d-4132-8392-838702b4ba52	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	e1278d8d-d06a-478f-8e7d-87b90a7aff2c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a8ae1ade-ccb8-4d42-bd63-f0628b20b4a3	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	4a4fa645-8ebe-4a52-b5c2-adc99ea3a84a	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f92f70e3-dcce-4081-aaeb-72ad8c4478ab	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	4d1d9b39-30dd-42fa-a435-850b606b9a42	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8d835340-7849-4269-9936-7670c57baee0	67285bc6-6382-4b7d-8173-2d857a4a1c13	c5a96dfa-a7cb-4bf3-b52b-4f05ed287552	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9f49c1df-38cb-44b6-b9f9-d66bfa7fa3e4	67285bc6-6382-4b7d-8173-2d857a4a1c13	723d6dca-6bd1-4e8b-ae33-afc9758af2a9	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef92be19-0f07-46df-9202-b66b32691d38	67285bc6-6382-4b7d-8173-2d857a4a1c13	8c259534-93ca-4f39-8200-c43dff10735f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d9c8e712-976f-4c40-8be0-524c819f5686	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	8a69958e-8165-4315-bdf6-559118c6d54e	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5e4cce37-5288-4e7e-97f4-0df04dd24a33	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	9fdb29b4-937c-49ae-aa7c-ee54e9c45f1b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cf228d94-0a10-4e9a-8907-284a2ce4b27d	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	3925f938-c8e0-40da-bff7-f9f1c6013c92	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
889327cf-d8ee-4f98-ae88-447f945e5534	ff1b01c0-d0e9-4988-af57-57ef959974b4	a4f08758-3c95-4b00-a28d-fed1cf200d26	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
95edafcd-9dc3-4f93-9809-d77f124a656a	ff1b01c0-d0e9-4988-af57-57ef959974b4	e336a8c4-dffb-4f8c-8787-1d3574cdd260	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d804d7db-c947-406b-beb7-da193c7bbff8	ff1b01c0-d0e9-4988-af57-57ef959974b4	02030cdc-c47b-4cf6-9be1-62f7582aa0a3	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bf72d9eb-dab2-4c7f-91b4-546405e89c87	d8defac8-a4f0-4335-a403-23d76a646acb	f3156374-f3ea-47ca-a6b1-639bdcad4b5b	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e8ba6e2b-3301-4b46-aa8c-07e2226dd47f	d8defac8-a4f0-4335-a403-23d76a646acb	271370d7-5295-448c-a55b-f375a36ddcc5	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b6b57d8e-f5cb-4f9e-b232-2105d630d237	d8defac8-a4f0-4335-a403-23d76a646acb	8410ee93-4595-4606-8ffa-20be5f6cb87e	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
621407e0-818f-4b2c-a2dd-e1a1ca0841b5	c2a9a595-7ec0-49f3-9016-9f1325ebd800	d1968311-a9d6-4df3-a526-c7c4a618ad14	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
df180050-e9e4-4104-ae12-bd18ef87fd8d	c2a9a595-7ec0-49f3-9016-9f1325ebd800	45e0937e-649d-43a5-87ec-52fe54340264	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4c5a167b-333c-45c2-b20e-ef334d8c8bcd	c2a9a595-7ec0-49f3-9016-9f1325ebd800	2524ea58-9c90-4965-a000-2a7c5fd1ff11	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27f9ef95-828d-452a-8635-277043c0da25	8069c814-bcd5-4efd-bc8c-3b904c32fb05	818f841e-9482-4e0c-8a72-8c1fb3d875db	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4bd3d9dd-9aee-442c-a02b-f4fcc9295de1	8069c814-bcd5-4efd-bc8c-3b904c32fb05	375b1452-41b2-411b-93e2-d0c828aa875f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
33e5a918-3dda-44b1-916e-fa5925c5bb7c	8069c814-bcd5-4efd-bc8c-3b904c32fb05	1dbc36ae-df04-4423-9698-ef6574f4c981	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
358c45b1-0f44-4412-a3a2-333b4fa0cb66	41bad034-f7d7-48d2-a4fa-06afd3822985	f33ffbe0-a21a-46e5-a433-5d5fa6df8d2b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bda2daf5-253d-47cb-81e1-182c15c9005f	41bad034-f7d7-48d2-a4fa-06afd3822985	7f265ec0-8982-4114-8b86-d1be843badf7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef90af32-4698-4c82-af43-1dd6d01b96cf	41bad034-f7d7-48d2-a4fa-06afd3822985	2c3b03d8-c110-4cdd-b793-06cf2ac69658	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9128afe1-1ee0-428a-bf6d-d4b2a08a7ad8	145322fb-82ad-4c59-97f4-f83351d153f6	ec6d1494-b383-41e1-8f23-dc27998414f6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
52b224b0-1865-40fe-8f3b-5d31edf775f4	145322fb-82ad-4c59-97f4-f83351d153f6	4e22d689-38fc-4e89-a8b3-818c5d8de446	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b8b424aa-df68-46d6-a3ed-a3af4a5e076f	145322fb-82ad-4c59-97f4-f83351d153f6	9bdedd3e-28ba-4d3b-a06c-6d084a37ff53	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b2385976-344b-4f5e-8ed1-387055baf3ed	41a4187a-0678-44a1-93ea-12faf3f859ff	e577b4a5-cb63-4da9-b68c-2d08fdb3ebfd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
648e952d-2b40-4a13-99db-3a085e8eb3d0	41a4187a-0678-44a1-93ea-12faf3f859ff	8248f5e2-3a66-4421-b696-1da8ab314746	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
351676b0-c33e-41ff-a4c2-fd29bd0c6079	41a4187a-0678-44a1-93ea-12faf3f859ff	965dd6d6-b30d-45e9-a210-0e8bffd6e485	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c334be13-b806-4e13-b773-6bb57cbbf7c1	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	3a6ba5fd-03df-4c4a-bab4-6106fe1bb68d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9cc8355b-f8c8-4716-a6bc-5155410611dd	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	6a19a36b-10c4-4f59-a164-5249cc8fbc02	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
48c3f5b1-86bf-4ab7-a4f3-9bc4f1308752	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	f87e82a4-2282-4561-b46d-677ee18a89b2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
59a86d28-db43-49bd-880c-af9050cc5b8a	89b49afd-1edc-47a0-a281-b7c66a7174d8	eac1bf68-dc6b-4c63-86d5-68b24f2bcb35	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
59c3ddc7-100b-44da-b187-3e56a13208e4	89b49afd-1edc-47a0-a281-b7c66a7174d8	a0f30daf-c31f-4006-8317-4663c2bf4312	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
14d9b189-8578-4510-9ac6-2583e68fb91f	89b49afd-1edc-47a0-a281-b7c66a7174d8	01ecd4a5-22cc-4193-b692-df35ab83b6c3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ce7f7a85-a805-4c78-98ed-e66db1b80de3	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	8629fec0-8a24-4df6-8788-80f9328c9d12	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ee87b568-9fab-4583-a971-e656b81615f7	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	0bcd026f-6868-4b5a-9775-6dea82c344ff	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0385fe98-3e29-481c-9056-80c2b0440775	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	89d09036-11d4-4af1-9ae4-c91986ba71d8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2688f36f-a1c2-4e6f-83b9-031cf98bacb3	11f0346a-b5bc-4898-b80d-3036af83d7dd	5a665f0c-0ffc-436a-b6c0-4eeb8677180e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8d26674e-8da2-4e0a-a2f8-0da5fb81dcfc	11f0346a-b5bc-4898-b80d-3036af83d7dd	6ea24bec-6f26-42a2-8bb2-eecb9aa021a0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
caec7176-991c-4ddf-8290-cb9164e34c93	11f0346a-b5bc-4898-b80d-3036af83d7dd	736a5e69-4f70-422c-a386-6a854add3a2f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3f09fd68-5478-4321-b8eb-afda9e0f1f86	3de69211-944c-4d70-a176-6144b2d5d8b5	c6fcac86-1125-4bca-88bc-0c375b51654a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b24a2118-3ac8-4764-9800-4e65a639f6fc	3de69211-944c-4d70-a176-6144b2d5d8b5	1f5b7c9e-0cf1-4442-83e8-9eb0d62510c3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5a6661d1-8d9b-43e2-bc62-77924461728d	3de69211-944c-4d70-a176-6144b2d5d8b5	62b5e540-d398-4ec8-80be-6cf8f6d83b78	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eff8007c-7716-4ace-bdd9-529040acf5b9	d2c53ac9-0886-43a5-845d-4b799b6ea413	e0a583bf-2ef5-4357-9ad5-8e108a5f9357	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
22907ba8-ef21-4c70-9b0c-8b46a1f6dc84	d2c53ac9-0886-43a5-845d-4b799b6ea413	33f69933-dcdb-4580-b8eb-5fc0b61159d0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c8e504e6-5d06-4097-bf25-ea861d677f99	d2c53ac9-0886-43a5-845d-4b799b6ea413	906d2365-ccfe-4826-a65a-4e5605d9ef1d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fb81a670-a6b0-448e-859f-0dd51222bcf1	a99e49e0-69e2-4a60-95d2-537c71c8430b	994e0ed7-7c4a-43ad-8ed5-7eb89efc4490	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
949a3e87-efa2-43a2-8e02-f8c006a68fe3	a99e49e0-69e2-4a60-95d2-537c71c8430b	010c4782-9b06-4a48-96ef-b0d08509a5ea	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8d1308c4-424d-42e4-80e0-139f7e8d742d	a99e49e0-69e2-4a60-95d2-537c71c8430b	fc114a22-9c62-4958-9266-4ff5d7143eb2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
19d39ad8-3b2f-41d2-9d59-bd460df137da	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	b0148214-0fde-4992-80ac-09dc8c0a90b6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bd4b45e2-f27d-4d4e-9ba8-2f9ac4fd2ebd	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	60763b62-63ba-4f03-a904-5b42a14bef6b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c5624215-cbf6-4ba3-91fd-ff498095fa68	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	959bd20b-95e2-4bb8-8232-56aa12fd759c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e28628ac-7e00-45a5-9d82-5b6540e06fa2	21e86815-37ef-4bb1-9723-d07f96aec3f5	fee151ed-277e-41cf-be15-0a2ed3a0bc14	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5554ebaf-e949-423d-8182-95ad512186b2	21e86815-37ef-4bb1-9723-d07f96aec3f5	3cf27580-6038-41e4-ab54-e96545b01b52	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
10a29a72-4ffe-450b-82a6-a6cacf33339a	21e86815-37ef-4bb1-9723-d07f96aec3f5	f086289d-e8ea-43c2-ab56-66b23edd90f7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b0d166dd-5e03-476a-b976-69019a8f497f	27e2641e-f3aa-472b-901c-fb9e6c121517	142f6ebe-24de-49c0-aeef-283f8b22524b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dfe3afcb-3605-486d-b2e6-8abd6167250c	27e2641e-f3aa-472b-901c-fb9e6c121517	accacfe7-589d-41d5-a7bd-93f41a87093e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d3e683d7-5063-4e3a-b63c-1243fa978239	27e2641e-f3aa-472b-901c-fb9e6c121517	be436b7b-86fc-4b8b-bc52-3bca87a28a05	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5973d1dc-a6fe-4feb-81ee-d37e4138aed0	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	a186e58f-8f08-40e9-a8e2-847efb5576f2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f608612a-fe07-41ea-ba9c-98ef4a063e3c	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	1c95ae82-f89d-403a-b600-8a64103d4e78	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5d0dc8b2-9f5a-4c37-8ffa-e69ca94f5bed	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	4c030ee2-f035-424a-a9c6-db06d4bfd15c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4a8279d9-cd3a-4889-9fd7-af96fe7be925	76669643-f398-4d8c-950b-e87e91fcc5dc	4875c1af-48dd-414b-b44f-d7c81df37845	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4cc1d047-508b-465a-aa2d-99b28ae4a3a0	76669643-f398-4d8c-950b-e87e91fcc5dc	bdf83bfb-f18f-4116-90ee-675231ff68b1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cfc6bf8e-2b44-46af-8df2-2accf8d0b431	76669643-f398-4d8c-950b-e87e91fcc5dc	dd040a45-358d-42ee-8218-9787cd1720da	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
86637e19-c8da-4753-9fde-e866bfb5ee35	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	c1a131d9-8d18-4660-af53-4594d8a479cd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d05f7f17-8421-40f8-9aa0-1c376b6daa87	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	3b380120-b47c-4f08-b15a-e1e7944c7784	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1977d14c-6257-4ab9-ae47-4f946950dc4d	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	8e2f7693-214e-41d3-9609-d9ce77b274aa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
082afc68-7086-4e88-90f8-3b8f25fb1e9e	f8d86061-8839-4601-ba76-588935717299	6d998a79-2815-4c69-b5be-97274a47cbba	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
189385c4-8670-4123-b186-03ca35c968a0	f8d86061-8839-4601-ba76-588935717299	e6da40e8-2859-4e15-8e11-a86d2d68688a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
43ddbb9d-b505-4247-b7e2-870e6395d4c2	f8d86061-8839-4601-ba76-588935717299	927e2923-66db-4f6f-97e6-74ef0300680e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
64b1837b-8a51-4b95-9824-674e8127b98a	0dc3136c-29dd-4108-8a0d-3ea7475a998b	71d7ec95-8d98-4c63-b6b2-a4b6eda7dc18	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
140cc2ac-e501-4771-b915-e08237127049	0dc3136c-29dd-4108-8a0d-3ea7475a998b	5dd1bc3e-0488-4dac-81ee-cda58d962f21	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ab07d2de-a24b-4ea8-810d-b1356ba88576	0dc3136c-29dd-4108-8a0d-3ea7475a998b	0fba2573-80ca-40f6-88e5-41582680835a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b0c3366d-bbf9-4ff3-a21a-cba296de4b76	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	4e50bcf7-978a-4b5d-8c5f-5cf4830f4b02	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
49edd370-946a-43a0-b682-254a37c1d63d	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	25ada572-05c1-4606-80bc-66e81fde2531	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b6236f80-afe8-4b3b-bac8-14ae92776788	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	321b49e8-b61e-4ffe-bcb6-8290b8f780be	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
32cc7971-9733-4c2b-bbc2-3bfc159b508e	1c8ae757-4400-4989-ac57-d7a488bddcc7	1da8a50c-808e-4dcd-ba1e-f13dfee17252	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
77839f44-b27f-4d37-a848-d5d8ea41d48e	1c8ae757-4400-4989-ac57-d7a488bddcc7	03dba8d2-b51f-4aa9-8c7f-63ca5ad0d22a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d6d3b8cb-0892-4a8d-831f-d33eed7e76d0	1c8ae757-4400-4989-ac57-d7a488bddcc7	f2e5efd3-5a2d-4a56-9599-016f41bfeaab	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
818d76fd-b49b-4c72-be9e-463e162b0036	6a1eaa1a-daee-4248-9aa9-0eed652bc343	762cfe82-9e97-49c5-845f-b1622e7373aa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
268e872a-27c6-469f-8376-ab3f4462bae9	6a1eaa1a-daee-4248-9aa9-0eed652bc343	d3259d75-b7f6-4a64-995f-5d6e6d0f64dd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9ef536bd-4cc3-4822-96c4-9b8150375a0d	6a1eaa1a-daee-4248-9aa9-0eed652bc343	a2735fff-bd21-4a73-b51c-6fdcf5774554	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dc31b99c-7740-4974-9c31-00b596308193	e616f599-e026-469d-b89b-151d226f3e53	08a90f57-04cf-4573-b504-e530705c95eb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b1697f28-2681-488b-8df1-36a0408a64bc	e616f599-e026-469d-b89b-151d226f3e53	cf52399f-872f-426a-a8ff-eb05b6a96a58	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c84060d7-9f20-42d0-9dca-77952c7d622b	e616f599-e026-469d-b89b-151d226f3e53	795f45ed-733f-433f-87c2-2edfbc3f3e74	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1f3bdfd9-8151-4b68-a5df-ed7e6dbc4c71	1a3778e5-2d5c-49ca-bc30-6971c142dd90	2c817f63-c1e9-4509-a02b-c2c5bffa3334	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1861b8bd-89c9-4a7f-a39a-7ad083e6cd1f	1a3778e5-2d5c-49ca-bc30-6971c142dd90	1603fb6c-0f74-47ed-b40c-15008a356f02	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
05b4d6d0-a3ae-49de-9875-f184b8004f21	1a3778e5-2d5c-49ca-bc30-6971c142dd90	65a264dd-55bc-4ad4-9af2-ee34aacf7808	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fd18c9a0-2642-49ea-b8ab-faba1083fb46	710f4d3a-54e2-40b1-894b-461bd25408ec	d91be839-6b02-485d-b8dc-11f8c625dc61	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
971fb5ee-8386-4d3f-9476-c0bf98649c25	710f4d3a-54e2-40b1-894b-461bd25408ec	0f76f8c4-0d64-4d40-8058-031401ff55af	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fd01b084-9a32-43fd-a0f5-a1f3ef177fda	710f4d3a-54e2-40b1-894b-461bd25408ec	6931b9ef-2370-4809-8295-9eb108de63cc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1769a65b-3550-4f09-ab63-41f8375840ee	f874db57-7f97-4bdc-b2ca-e41134fcd67e	65797585-1dcf-4682-b702-b252b609d16a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
862683eb-5e85-4328-83c2-12ce0631ea69	f874db57-7f97-4bdc-b2ca-e41134fcd67e	ba6df2a1-9b77-4779-b79a-11d66e1c129d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a75621ee-1415-44ed-a4ef-bb3dbde3727e	f874db57-7f97-4bdc-b2ca-e41134fcd67e	f1c6c071-5e41-4ad6-bf0f-f92bede98251	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f560547c-3386-4dd9-ada3-1329aa85cebc	84da58fa-0b61-407a-b718-025e11580a93	5a3979f5-7652-49ba-8139-a76591093284	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef3e2458-4a38-47a7-a7bf-ff3892a893b9	84da58fa-0b61-407a-b718-025e11580a93	8c9a014e-3803-40e0-b9af-28031e00ec2f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2875a5c9-2ebf-452c-b8b5-cfd970b5f03a	84da58fa-0b61-407a-b718-025e11580a93	f062a7c4-1174-4a3e-b6c6-a7ea03bb8705	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dde5a723-880f-47f9-856d-0da49d9f4b4a	3c96be3f-cf06-4508-8a57-05b69cd36d4f	af123ee9-f9c2-48eb-903e-5796274d8fb8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2651a926-23e4-4e46-b410-f482503024df	3c96be3f-cf06-4508-8a57-05b69cd36d4f	83ab92ea-5ead-44c8-b026-01a419eeaec8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
36f875d7-0967-460f-be80-2ac7cdd0a1ea	3c96be3f-cf06-4508-8a57-05b69cd36d4f	19518c4e-8b4a-427e-be4a-ef3642b5ee7f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3087dbaa-e8a3-4f6e-875a-3598a1dab154	c7e2a675-839e-4f75-96be-4414eafe4cd2	fd4d32e5-6085-4391-9f0d-c605a15cc1ce	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e2f69997-6436-48ea-ab3d-b4d6ece6f42b	c7e2a675-839e-4f75-96be-4414eafe4cd2	7cf71b14-62a6-4546-b64c-1aca48b5205e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
17500d4e-055b-4755-8f43-223dd4072de3	c7e2a675-839e-4f75-96be-4414eafe4cd2	7118493c-88c0-4278-9526-96ff8ba912b2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5460811e-7706-4cb6-9399-2e359a67fcc7	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	bce21fed-8083-437b-8804-054a6be91b22	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2e83b8f1-78ce-4cbb-950c-bd751f8af4c0	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	8cdf0d8a-65d2-4685-b118-b596c869edd9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6752e2ef-9156-4b92-96fb-f2e561535c8a	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	6d67edb3-d54d-49f8-a0c2-5e07d692c3d3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8273f39a-f360-4149-8b4f-7643ae64a583	a93d4a47-dece-48ef-9306-57f56fa499d5	47ea72b6-8a3e-44d3-a0ca-45df0a646d15	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a106db7d-123d-4741-b75e-e15fc0223d87	a93d4a47-dece-48ef-9306-57f56fa499d5	bcf53e8b-e34c-4472-bf6d-4c20a821bf10	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a05d05ec-c6f5-4fe8-a63c-a48c41f9529c	a93d4a47-dece-48ef-9306-57f56fa499d5	c8d48dea-09f5-4199-aadd-de658e7b0df3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cc20e4a9-ebe1-48c8-82b9-487e8e68b40c	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	13a1d0be-ebe9-471d-a2cc-590ffbd51eb7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4dc5c203-81ae-4124-bb2c-c993cc304784	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	c11e8a2a-4b75-4bef-9b62-af61ba37b02f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5a49bf6d-47e0-48e1-bc11-d8edde157e8a	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	6707e731-7f1b-4bae-9ba2-e98b31f4a873	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
642fb6ab-b91f-44a1-924b-a9202bcbb4e7	394f0f58-0cd2-4010-bc08-b18a16300fd1	b90b5fcd-d424-498a-b9e1-b0fdc5925d05	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d2b5e711-becf-4e48-9364-26047cc6ad44	394f0f58-0cd2-4010-bc08-b18a16300fd1	73d2e8c6-8168-4caf-b465-29a22260ea4c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
50157e45-3d65-4a09-8db4-39352ccc141a	394f0f58-0cd2-4010-bc08-b18a16300fd1	63e345cf-2c40-4171-9df1-6c99675559e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
83b8f6b8-c053-4d17-8769-e7487b82c768	e946b50a-bb23-422f-901c-bc9834e0b9d8	6527f58c-cb7b-4c4d-acfd-859f33a63247	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ccfdd2b0-9e96-467b-a049-0ef397948614	e946b50a-bb23-422f-901c-bc9834e0b9d8	4effd9d2-a5d6-4dc9-9a96-c99f8828a1c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f57e656d-43ad-4edf-928b-efcd391f1b1c	e946b50a-bb23-422f-901c-bc9834e0b9d8	094ca896-da30-40fb-adef-8652b1a34cb5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c03aea6c-7409-4be1-a5d3-e2d38a7b8f96	c5c96781-0c85-4e34-aba6-f68cd878276e	e1ff2b67-6d24-45e9-9b1a-1c65f7a03e0f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3caf63be-776c-4b90-8810-fd1b8244e893	c5c96781-0c85-4e34-aba6-f68cd878276e	8a79fc7a-e77e-466f-a957-4c926c589c78	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
20e5aa1f-6b8a-4878-b44a-9639aff713b0	c5c96781-0c85-4e34-aba6-f68cd878276e	a4de2d4e-e0b4-46d4-926d-6cffefeed62b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ab489e84-9ea3-4f14-8856-04c0cc6de64f	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	7f3a0954-fac4-4583-a89b-728974b30e9f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
07c0d3fe-4c53-48f5-8444-8217dd03301a	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	acb5989b-6895-4188-a87a-7d9b15d32b39	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
14a957c9-92dd-4c36-bf56-5072a1dfeecd	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	4f48e3c6-ab2c-49d5-bc60-f9711db1c8e9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
052fcf0b-8d70-4bca-98c1-0c75fd170ee1	ede67ea9-e0e5-4e77-8841-b0504adc7f91	0909424f-f15f-4bcb-baba-cee237a1ef90	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d5dcc01c-7d5b-4b1f-ad48-39740b0b8b39	ede67ea9-e0e5-4e77-8841-b0504adc7f91	d8c0f35f-b48f-465b-9b1f-27047f05b31d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dadd8adf-fb1c-4710-9268-d9f25ab7a07a	ede67ea9-e0e5-4e77-8841-b0504adc7f91	4fd42397-c0be-4949-a31e-4184001a32e4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c60cb788-b961-4f23-8a92-347c61369f07	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	6552629d-e662-43b7-babf-79b1f48843eb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ee72616e-bd7e-4bb2-a45e-6bed575147e7	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	264775f6-d122-4133-b69d-0480db15cc45	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
83a9979c-558b-41ac-a1e2-953836088f9d	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	dbfe3428-8d2c-4d70-88f8-13017fcc5957	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
14f818d3-8050-43f4-bcbd-2c763836d087	f0893160-9afd-4796-a6ae-f7eb69e3539a	9e7c3d5c-011f-4aaf-b48a-a81e3dcbc694	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d435e07d-165d-4dfa-bdbf-3ab4c95ce1ac	f0893160-9afd-4796-a6ae-f7eb69e3539a	3fc27687-f963-47d4-9059-7df19198f8be	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
07548051-57b0-4204-8fca-5d73f109beed	f0893160-9afd-4796-a6ae-f7eb69e3539a	5c3b8049-0429-4e21-9f45-76c55685994b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7eae92e5-ff89-4fb7-8958-f282965a2b88	dbcd7aa8-c953-40fc-9397-cd6e82970408	14438fd5-763c-4855-b631-3fd406ab9359	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
744c8d00-4295-4a2c-8de1-0020941ecf04	dbcd7aa8-c953-40fc-9397-cd6e82970408	9633d3b0-4f57-4304-b2eb-6890d87f37f9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9599196b-4a40-41a6-aea7-15508f26c1ed	dbcd7aa8-c953-40fc-9397-cd6e82970408	688ee0bf-deca-4643-8951-6294418cee3d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d2a3ef50-3dc8-45e9-b2a9-a6a7a408b826	3dc58dd7-9617-4636-9d21-20b318a02125	b989a3d5-0bbe-4c71-80e0-33ca6a8ba798	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
80f2eb8e-db6d-46ce-a578-d8b3ddef0caf	3dc58dd7-9617-4636-9d21-20b318a02125	b4f6f233-b504-4abc-88e9-7bb4db48bd20	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8ab61c25-3519-4c5d-8d86-83784511e6f3	3dc58dd7-9617-4636-9d21-20b318a02125	2ba8b277-a62d-49e0-a3e3-4d5a30adce7b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c8db28b0-a12a-411b-968e-42756a7e100f	c50b0594-d1a2-4571-99c1-3ae820c80c97	e44e45df-455b-4347-a89d-542e12cf8c05	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b0f2661e-6c73-4ded-be18-3c84c8624af8	c50b0594-d1a2-4571-99c1-3ae820c80c97	a7f506a9-343a-488c-bf1c-54f37bf8b0ee	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c2fff8ad-1737-4e20-8d0d-a14d5a524883	c50b0594-d1a2-4571-99c1-3ae820c80c97	2482aa08-4732-4726-83ff-9b43f8b8a2f1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fa1abc97-fcc8-4626-8193-1843befb7681	a51f935a-1c25-4c97-a1b0-f3a48f84110d	33bfd3de-d36a-4f90-8c50-3497426d9681	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dee3d3d4-e903-4922-b955-7fcd16a8e434	a51f935a-1c25-4c97-a1b0-f3a48f84110d	d7c46307-8f05-4be5-9045-fa891ef84480	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
495cb311-a115-48b8-8414-a1837fb63005	a51f935a-1c25-4c97-a1b0-f3a48f84110d	fe5acb11-159b-4a61-8cf9-da0058fc30e2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c433097a-98b5-4ee2-8568-5dd0621f1585	29326dc6-bbce-4b7d-bdf7-14a183f91d29	ff524c8d-f1b2-41c2-8306-32ed2a161689	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e61b099e-2205-4fb5-9309-9ee8e40a3bac	29326dc6-bbce-4b7d-bdf7-14a183f91d29	a3f41cf6-356a-4f3d-9fc9-b0be0980d33b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
095247e5-c60a-41b7-8106-d12a28e9778e	29326dc6-bbce-4b7d-bdf7-14a183f91d29	36d1f8b6-ec0d-4b96-9aac-e96c5d10e23c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
26a98c28-6ee3-4047-8d47-a847cd1ed42d	a46bce06-0dfc-4138-9fdd-54c90d303733	90be1fbf-413f-46c1-b2af-c12c0ea9cc10	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fe5ca15d-cafb-474d-91c2-c8bbe079489a	a46bce06-0dfc-4138-9fdd-54c90d303733	86498acf-71f8-4e17-953f-3c1ef10b2d8d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e99bf403-ba45-4f07-8834-fdfbc8fa72b5	a46bce06-0dfc-4138-9fdd-54c90d303733	7a219eb4-9b0d-4308-a13d-9c617df1837e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
edc95f6e-2bb2-4b7c-ad9f-196602932f7c	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	db6cd575-a884-4ccd-95c7-ac5749896c0d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6d5a7d45-70b2-4a94-b0df-01243ebe2886	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	d05ed5d9-a645-422b-bf53-55aa7cf41afb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
46f33386-a9ea-4008-9475-a8c2b2e76b48	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	dc4750b2-17f3-4f4e-8c71-2288b703b36b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
588c93ad-815f-4fea-9384-b4179a27356c	3a198552-3977-46a7-9bec-cc0802770a86	aa0ef778-f3ee-4b20-b57f-0f7b60da599b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1a2261b0-9f56-49fd-a9bf-c9b364953260	3a198552-3977-46a7-9bec-cc0802770a86	0171b0bb-8690-415f-835d-fdc05b6838d7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b4582790-6270-4e93-9e38-9d37495d245d	3a198552-3977-46a7-9bec-cc0802770a86	71a7fdff-70de-4c0d-80ec-a93cd2dacac4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
407c956e-d99a-44ec-b232-a1623653cb49	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	76596e64-8b6d-4207-beaa-ce2256cd6060	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c6c89a82-5e9e-4f96-bcf5-076581f963f7	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	1c801a06-0a09-4e96-9fbb-7b30b0d3ee4c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7b2b7928-dd48-4020-9d7a-a6cd1d4ab621	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	9b452ac0-3401-4e8b-a6b7-aff69708ee15	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4b8a4464-e114-45c6-8e15-a80149cb7e20	33fd7ff8-058d-4dce-9fd1-73325df504b1	3efa91a0-22b5-4e58-9363-4eb949f0c26f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
00f4089d-c53e-4e97-8838-8c896bece229	33fd7ff8-058d-4dce-9fd1-73325df504b1	15457228-9584-4f33-8560-bca6b34d1e8d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ca561d12-8f7d-4911-8c3b-46f69d3746d5	33fd7ff8-058d-4dce-9fd1-73325df504b1	61f5a031-c893-4e09-8d22-70486e1192e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b83d0cdf-2b68-4082-b8b9-55dfcc43a380	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	d625080b-9437-464c-b3fa-a95c73c10801	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
49ef748b-510a-4430-b9f2-1a76898f5f02	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	0eded359-0e28-4e12-9f65-55e8203b2ef7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ae26223d-416a-4721-8c79-d3138dc59a3d	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	e14a35a3-f938-46a9-9f02-e26955e8cedb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4c63bc57-7eda-41c4-8aac-10442f8cf79e	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	3a7c5e68-fd83-4f47-a3da-603c16bc0ad5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2aaf138d-e42e-4cec-9e29-0a24ff580b6b	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	f4069bb2-16f0-44eb-a53c-af6f3d25093a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
afd33edd-21c9-4048-a270-20d2a134c6eb	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	bf3f0529-02ca-44be-a490-e6199ac54ee5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
042e32f4-c85d-4756-87c2-b20d68bceaa8	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	3fecfaa6-b847-46a1-a436-42f4a9443606	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6c0ca30c-7df2-4e3d-bb3e-a1e8d3cabb96	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	32fb0e84-547b-4290-8e75-c25a35bf4945	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
69641422-914c-4d88-bdda-ce966e7c58ee	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	7001cfdc-d920-447f-9418-8d11cbb3da15	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a637dd47-2eb3-4448-a2a1-9035041d55b4	67aca763-e6a4-4936-ab6f-bbc99de5558f	27f4f8be-8cc4-475f-aef2-546436fb6bc6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e456f75c-2b3b-416c-a34e-b3b5820f68ad	67aca763-e6a4-4936-ab6f-bbc99de5558f	0183553c-5c74-4af6-a869-bc9488c35dc4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
74147fbf-d8a8-4a4f-99e9-f2383759055b	67aca763-e6a4-4936-ab6f-bbc99de5558f	1295f0a1-bfb0-4da5-ba09-3b090655fe65	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2b5e5c3a-877a-4737-928f-3079bf1db232	d428176a-216a-4231-b4d7-acb249438281	31012822-4308-44e9-8f4f-942084e58e2b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5f52b0a3-438d-4b31-910a-27dab7ed1aa1	d428176a-216a-4231-b4d7-acb249438281	9d839d5f-00ed-4c26-9a8d-a12d4b3aa579	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
893b18b5-7818-476a-8536-1be821dbbba7	d428176a-216a-4231-b4d7-acb249438281	c74a497c-95ce-459e-ab33-e2d09b74d49a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f9e777d7-89a0-4a94-a4d9-d36022268164	42517512-0290-480f-9a2c-7f0ae2f7c7d3	200fdb69-20a4-40d8-9dfb-3d1b4babe435	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
050d25e2-8ca8-4935-b3ed-f76944766341	42517512-0290-480f-9a2c-7f0ae2f7c7d3	14227aa1-a7ea-4c96-a432-b9681e1b2267	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
72a7eeea-f4cc-4a4f-90f6-c7bccd32f2f8	42517512-0290-480f-9a2c-7f0ae2f7c7d3	56e029ba-7159-4d96-9c27-885125ca3b1c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
153a20d2-dd94-4be2-9224-8e49f87a2d01	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	8abe9e34-cb82-40fe-bddc-26d2b3fb9c08	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
85cb5336-1dfb-41b9-b2b5-1514bd571468	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	d6fdd0d2-1403-4202-b712-f27a039db42a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fd5642b3-9686-4817-8f65-14366d45e27c	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	fe5986a1-2204-4bf5-92db-9c29caa0abe2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8a9dba55-3201-456a-8ff8-ea7ed85ef2ac	52969a79-f71b-4494-baa5-f0f72b8362a5	f3132ef3-fa73-4758-8428-422001c431f2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2d880329-e24e-4a8f-92ef-67574811c1cb	52969a79-f71b-4494-baa5-f0f72b8362a5	3aef72b1-4dd0-41bb-8530-63d95148038f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f7ed4ceb-31e8-4fcb-b415-276cff6899c2	52969a79-f71b-4494-baa5-f0f72b8362a5	75095342-10bd-4950-8e05-265446fc28e5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7236e988-eab6-4e7f-8b6f-4a0837ce71ca	778e0606-669c-4c18-8e9f-55043d1115f0	d15eee85-b2a7-4fc8-8596-52c2d446ce03	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
57619dcf-925f-4efd-9efa-d89f6f21504c	778e0606-669c-4c18-8e9f-55043d1115f0	591304d2-297b-4095-9680-aac82c715990	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
96c1cead-f989-4794-826a-b850c35d44b5	778e0606-669c-4c18-8e9f-55043d1115f0	64b8735a-8ca6-4b0f-9387-3d70aaaaeba1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1fab2e3a-1df5-4c49-b315-9cad9424d6b5	3595cb72-9575-4b6b-93bd-fee286dacd22	aec9fa13-ea48-4411-8340-b315725fab9d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3c9da344-91c7-43af-924e-33ef8019ff4e	3595cb72-9575-4b6b-93bd-fee286dacd22	f8b0d6f8-a2b8-43f4-bd44-54714466f7ba	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
47a2e67f-8bfd-46e5-93ca-023f5f7fbba5	3595cb72-9575-4b6b-93bd-fee286dacd22	0f0233f8-8bbb-426d-ab3a-6290d06b2008	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
985fb8c9-4a51-470e-a207-bc0e1a93a1d7	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	659f4c22-776d-4f2c-8961-648a65068354	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dd33d750-346d-4ee0-88cd-7f7dc059bbab	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	2d818dc6-173d-4148-8853-95c13d3cd334	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7244d820-4566-40c8-b084-ea6edfbcc2fd	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	d85e61eb-7a57-4d86-9977-9e4f8e469429	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3e8352ff-fd53-4127-9162-99bdc6cc65bf	32d809a3-ffdb-4943-a764-d5a51ab9197b	dd667a85-e678-4609-ac33-297b1ae822af	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0ffb69c3-1c86-4dab-bbb3-b3e45ac7b128	32d809a3-ffdb-4943-a764-d5a51ab9197b	b42ee39b-c792-4ca2-8b14-c43ff8f71cd2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
39ecdd79-9083-44bf-bf55-00453a708cbd	32d809a3-ffdb-4943-a764-d5a51ab9197b	934d4251-e611-4c66-b556-b331ce74228d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c14fc801-2ae3-42dc-9666-deeefc494f47	1f91a997-29da-43c3-a68e-c685e4805c44	956ae73b-8b59-4dc0-8677-5eea98aa78ff	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
728954fe-21ad-44cc-96dd-c830c84fbbf3	1f91a997-29da-43c3-a68e-c685e4805c44	ca3ef9fa-c863-4538-9829-ab308257d85f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f692f648-392a-4ee1-ae07-24178198e26c	1f91a997-29da-43c3-a68e-c685e4805c44	a12d177c-0fb2-45bf-b0a7-e7e8d905b841	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9f569e89-0d6d-40be-839f-a61628935b74	46a122eb-37ed-4656-9987-cad400a5d461	670c6ef7-f332-4385-8f8c-cd2bf51f32df	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
85dacab2-ac48-4d22-9812-d500712974fd	46a122eb-37ed-4656-9987-cad400a5d461	7d1b8a53-c8fe-4f9b-90de-711c02a0d0d7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3b6f9a7f-8b95-455f-b7a1-663ae5f93e2c	46a122eb-37ed-4656-9987-cad400a5d461	c3e4a195-913f-42d0-b86a-f5503a9eb49c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8886fc7e-8974-458e-b127-2c60d183fe6f	debb67da-79f1-487a-8b7e-3eea8acf835e	b7a6a218-72f7-4782-82c2-c7d4826611b0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b7dc38ee-203c-4ad0-a74f-8302d36ae76c	debb67da-79f1-487a-8b7e-3eea8acf835e	7d74cf84-1ab7-470c-9b82-809cc8517772	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8880adac-128c-4430-8ff2-082c8d6bb7a2	debb67da-79f1-487a-8b7e-3eea8acf835e	990c1acc-1501-4a4a-81ce-513fda685128	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f01ea055-bdbb-4828-9242-d3de95e4e537	75c176cb-6188-420d-b64c-d60bce019552	dfc01f36-2a9c-473e-8e6f-8125124aa839	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
684438d3-23d3-45b7-afe5-d25cb1b26fed	75c176cb-6188-420d-b64c-d60bce019552	98f45e4d-9d9a-40b0-bded-65681acfa3f2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a7111bfe-cf84-404e-9c33-73d832a491d6	75c176cb-6188-420d-b64c-d60bce019552	0ea20b52-aa4b-4017-bff6-9a0b5f4df57f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1dda0d37-0f4a-4320-b334-5e9402400f4a	3b17c376-e2d2-494b-ae1c-e230803d688d	0b102b87-ba00-4d6a-810a-8644365d7f83	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1adb348a-fe26-474e-90d5-1b31d595b0ea	3b17c376-e2d2-494b-ae1c-e230803d688d	f2c03a1f-32fd-44d6-8de2-d19aa03be5fd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
09f5f96f-9def-495d-9642-c3b4cfb6346d	3b17c376-e2d2-494b-ae1c-e230803d688d	fb0f583b-71b7-4b4c-a6a2-0a6440a28111	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
484a3071-34a1-4b36-a916-506290e33e77	7c6d2688-bd20-4197-8a29-7dbb5985b236	7e5039f7-bdd3-4941-85ef-7feaf33b9851	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b8e91004-0acd-443f-9d8c-6165fb2d5058	7c6d2688-bd20-4197-8a29-7dbb5985b236	4e2ab67b-1d9a-4404-83db-56b1fede85bc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0f8ab638-263c-4142-8240-4a3958254625	7c6d2688-bd20-4197-8a29-7dbb5985b236	55255045-cdcf-40c0-b5a6-0dc7fe63c633	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a733357f-c523-4e5a-b46b-91f631390480	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	c213e4c7-721c-482d-ad7a-52b58e425c32	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
009f0ea4-8e47-4ca6-9ba7-5eb1e00dc54b	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	ec77783d-50f7-4766-b248-81f39b186dd4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
213eef0c-b80e-4112-9b31-0ed453c26614	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	644d9b69-98b0-42c4-bc3f-7ccc93e1b5bf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3fb50c00-01e8-44b5-9120-611b11ee66f9	51793003-ac19-41aa-801e-2d656912435e	85fbad11-382d-492d-bb9c-0011d755c8eb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3e0df489-8acc-4dcf-ae9e-9b62c6370d2d	51793003-ac19-41aa-801e-2d656912435e	6ee79276-fbff-4da9-b516-06ce9ecd05a4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1df6659b-d16c-466d-85fe-4d351492e157	51793003-ac19-41aa-801e-2d656912435e	3874f236-45ab-45b8-9440-520e01fe649c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a9a53080-63bd-4115-ac41-3562ea1c5de3	96114e09-ae93-454e-89fe-ac9abff3ccd6	bb79cace-cfb4-4266-ae16-0e651be3280f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a2cd5cb4-5530-4866-a70d-b607cb732288	96114e09-ae93-454e-89fe-ac9abff3ccd6	f984223a-d56d-4753-8ddc-18a2b2c8b822	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
63e64d22-4dba-478e-b0bb-e88b503fe748	96114e09-ae93-454e-89fe-ac9abff3ccd6	9a2985ff-167f-4939-a3b3-84c7393c25a6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f773c732-6fed-4373-a0c7-6797af1bc06d	acdf7fe9-649c-4462-ad02-38097659151d	f99f5128-f0c2-4ba4-aac7-60ab2e78481c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dcef49f9-65d5-44c5-84b6-690e977c7d46	acdf7fe9-649c-4462-ad02-38097659151d	5fd9ee7b-22c1-4263-8252-5546981fa925	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5d2ef7f3-803e-4c0d-947f-666cf0de0e65	acdf7fe9-649c-4462-ad02-38097659151d	173558ca-2c72-4a4f-9dd0-2c99ba7ed0fd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f7875be8-97a6-4aee-b24f-7e7b8161e4e7	4946e917-e9b2-4d63-a63c-96526efcffae	0bf6ec1d-5098-4a31-97ff-5881439e9d4c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c1809753-73df-4c33-8e26-aacfa276cacd	4946e917-e9b2-4d63-a63c-96526efcffae	10dc4aee-a2b6-43ce-94ce-f4a817824727	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
91079370-2c91-47da-ad73-0028cb2467f9	4946e917-e9b2-4d63-a63c-96526efcffae	ec635ef5-0767-4e72-b149-2ec2dd8c73be	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
18f49701-4c1b-4abc-968d-0ca08a696ead	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	8df5b6e7-24fc-4154-97d5-c5be53ff7b6f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2addfb64-da07-4aa7-b354-75eeca2acc5f	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	3dc75038-0c9d-4dc0-a4c9-28203e2bf4f1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
80d99f01-79c8-45d5-88d3-103d6aebd55b	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	ab5685cb-00e3-4f53-8668-c7c2b6a9adcc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e4bd6b4d-442c-4583-8961-1496201c3b4b	228cab4e-f472-4d7a-8378-a31d69d6c1c0	4d075027-2b1d-4061-b184-96df1a49342d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1c12f6a1-a158-4c0c-96ea-ee3df9bef7f1	228cab4e-f472-4d7a-8378-a31d69d6c1c0	764946e5-e9cb-4585-a6ea-d61332e34e66	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b7180228-bfe2-4375-a26f-7d3ddd3f8ae3	228cab4e-f472-4d7a-8378-a31d69d6c1c0	68fd0557-04ba-49e7-90cc-00473e457703	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9986ca9f-031b-47db-b66b-46c35418429d	53d206c0-c23e-4dd3-a128-783b456c7717	89bccc88-eab9-4d6f-b261-be25e372b681	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5f180d6e-9792-4392-9207-0ef22780bb39	53d206c0-c23e-4dd3-a128-783b456c7717	001b08f6-0d04-46c4-81fb-f530575c4588	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dbbc4098-0d2a-4829-80ae-05c2a4ad9fbd	53d206c0-c23e-4dd3-a128-783b456c7717	22704316-b15d-423b-8471-8422a9d19c07	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
178ba008-68ef-4121-b8e5-788d62203f95	0d52c6a7-65d9-4b93-964f-72063f7ed24f	3dd321b6-a2b6-4ee2-8eb1-2b3aacfcba62	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
57b27763-58ec-456c-a142-34e59a1bcdbd	0d52c6a7-65d9-4b93-964f-72063f7ed24f	cfe03377-00b6-496b-b607-02f697f08e07	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5066b1c1-fced-4fdf-b4e8-ea0e57ef5efb	0d52c6a7-65d9-4b93-964f-72063f7ed24f	79dfea2c-a53a-43f1-848f-62d066d6d192	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
99e4c85b-32ca-4220-900b-f1a6859d1b5c	2b00c57b-169d-4e83-8445-8c167d1d6046	c8128c23-4480-4367-ae50-2d2c5ab2c21d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fd11be42-cf4b-4a00-b7f3-a1f1612b0658	2b00c57b-169d-4e83-8445-8c167d1d6046	b0114bf1-7358-4ce0-a4b6-27d55e4910b1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9d5ef03e-9e6f-42c8-bcd4-c92183d5ec13	2b00c57b-169d-4e83-8445-8c167d1d6046	7d1d91d1-a01d-446f-a238-c4dd138a238c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3dc8c93c-9a00-42c0-9631-ed2b4bd46252	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	8e555520-7155-4fee-8e0e-4c6c98ec7ee3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b8334381-ef5d-4770-a775-7dc0136fa15b	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	9851adfa-7004-4ef2-945f-d88a1dccf041	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
62b177f8-71fa-4249-9c58-af166ce966b2	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	17864cfe-b63d-4af3-ad8c-06ce50de3898	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f16c4bba-e084-4bf0-9c43-879affe56602	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	e18812db-9a13-4573-9846-c2c5411ed5d6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9c54d3d5-fe20-461f-a2a0-b29778f69e96	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	3845b38f-e2a5-4256-b801-1e706bf4021b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4d9ae084-d1d8-47f7-a892-6c0f7821dab6	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	452d7178-5adf-40cb-9832-9cd21f3e08d1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1ec1013c-df7f-4745-868f-07e5a587ccd3	a5e213c8-bcaf-487d-a232-fec41894abd2	0b9261a0-e9df-40dd-b6eb-ed2c21e32e70	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
39499ce1-973f-450d-990c-2509f42b538f	a5e213c8-bcaf-487d-a232-fec41894abd2	602b3e32-4028-40b5-9dd9-fc4fe6f869e4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6c55dd18-0c48-4ebd-8782-d407bc724705	a5e213c8-bcaf-487d-a232-fec41894abd2	d07204ac-5934-4370-84c2-d071f577dacc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
68726e6a-c191-48a5-b5f7-c7628ddc7810	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	891e56ab-c406-4391-ae86-2f9eff50739b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9ac7555e-cbe1-44c9-8d8b-6446b51c8d24	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	ffdbe3a7-5b0f-4ac1-8d01-d5a6da64ffec	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d0934fba-7f29-487d-b677-f188f9ef3a07	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	20949976-6903-473d-b182-a78e6c794d09	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a586ff42-24c8-4f41-bd8f-77f8e0831dff	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	787e0520-f32b-44d7-ac47-6d73ec16a0c1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8b0fd7c5-d0b5-472c-918b-becdea006d33	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	7001f6aa-6d7a-42c2-a564-63c27836e3c3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dc5c49a9-13b6-432f-a765-1c5efad60257	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	a25e6de0-f3df-4ad0-bf3a-1c3cc9bd7689	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3a97872b-002a-40de-b907-fab16323b71b	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	dfcf7a22-02c2-4493-b6d9-a4b4e8af94f7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0f8bf28c-9aad-4489-bea9-94e6a5612891	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	a7fa46d7-71e7-46ae-b3c5-587d420cef7f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b519dec8-5c93-40ef-8fa1-1439aa5626d0	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	65582f25-d953-4d96-ab7b-e359d1cec8a9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
301e25f0-3727-4a3a-a283-55c1d9896448	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	4af9c976-ffa8-4fb1-b7a2-830a4b861533	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2480da60-7901-4bbc-893b-aaff597ef953	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	bbe54db8-1d30-45c6-95eb-20451be6e3e0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3936a27c-7361-482d-b802-fcba29e6e62d	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	e6421233-b544-402c-8b9c-0ab032cef1dc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fc966f53-e930-4934-8af7-c4f35534d4e3	4844ec82-0feb-4e33-95eb-f32cc0bba616	804e5bf7-04f9-4243-84b9-2c58a6fa4424	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cc141004-4997-4b6b-add9-39c7b7a5cf3d	4844ec82-0feb-4e33-95eb-f32cc0bba616	a6e6fa27-b17c-4067-9120-4d9392995465	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f39c9b51-ba08-4cb3-8e9d-eea8d0626be7	4844ec82-0feb-4e33-95eb-f32cc0bba616	61c5f9fb-7a5d-4035-8850-fbee2dd270a6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7b7a1da9-2dd2-4610-9227-9a7b16cd9492	1df1bf29-393a-4a74-900b-711f93f278cd	3ae5dd5e-0df5-4f9b-bffe-d939c6858ce6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d9ab2141-c4f5-4239-b8a2-e45b7e11408b	1df1bf29-393a-4a74-900b-711f93f278cd	1e21ac16-5028-4401-bc5b-8637b29ff9eb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2c8bb0c5-1212-4ba2-b64f-d98e02cb9dc7	1df1bf29-393a-4a74-900b-711f93f278cd	b1cf80cc-5170-4e1d-8d29-d24ec0c3a878	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
762f4ee0-fcab-4ec7-9212-67c600023393	84981eb1-6893-4085-9c0d-58fef95b3333	c0e5481d-1b47-4dea-a02b-7f955d8bd90a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
97340aaf-a37a-4815-9fa6-02741cac0acb	84981eb1-6893-4085-9c0d-58fef95b3333	268d77a0-3461-4808-9c26-ab2fa143144c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4d2e322b-4f7a-4482-b47a-045b8e51aa75	84981eb1-6893-4085-9c0d-58fef95b3333	1b61029c-79d0-4703-9b3d-01a066a3fdc1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e43852f7-bbef-4204-afc5-640c04cf8f3d	91c7b155-374a-44ab-8f3c-dfa7ad66a823	8f775663-662e-4688-ba96-7cf2e7d2c0b2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8b2fa624-77f3-483a-a3d8-3fd7b352349b	91c7b155-374a-44ab-8f3c-dfa7ad66a823	0ae32c33-f8a4-4a43-81ee-a3b04677a461	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d120f7fb-4060-498c-b76f-0f2b318be948	91c7b155-374a-44ab-8f3c-dfa7ad66a823	6f704bf2-e819-4072-ac56-d9d80e567335	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
45f2d197-7cc6-4f83-bc25-812f890bc2d3	2035fc62-bb44-415b-93a3-664bf0317667	2befa550-6d7e-4cac-acda-27ebecf44636	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
575c567a-f4ec-4791-9afb-a9a8c6b14cba	2035fc62-bb44-415b-93a3-664bf0317667	7c47c21c-dfbd-4141-8618-fb6820688d23	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e91abac9-8895-4c00-8838-fb99be8f4360	2035fc62-bb44-415b-93a3-664bf0317667	44bd2d82-e6b3-40b2-bb96-82c928b0edfa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aec48d5c-f4cc-4999-a5dc-a80c7530865c	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	18424265-356d-49fd-85e8-97284ac570b9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a8be767d-5394-4824-b329-b0ed3bd621dd	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	e50bc514-95d6-42be-9a75-b803f912d23d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4898ae6e-fb79-477f-889c-750b44a41ec4	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	555652bf-85fd-422f-98ee-ddd9aa347491	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
478935af-40bc-45e8-95b4-a60e3f8d8c4e	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	5284e4a7-f255-41e7-8eb3-c2e0526296e5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
81b13df0-468f-4529-beae-ef5c4d0b635e	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	c34cbeac-152a-4cd4-b7f6-1a7ee1b4073b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
71bb4b56-0bc5-4b98-9187-bce7d4976621	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	cdb381a4-b4f1-4d29-b899-f354298d9de4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5b8746da-b7ca-4440-97bc-a3bf03d2f9b6	c48de798-90ac-46ab-8a7d-ce383a9b5197	197bd263-abc6-4402-a75f-45e1df795ab5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2ac18de1-9a13-4e4c-86f7-25286a7c85a5	c48de798-90ac-46ab-8a7d-ce383a9b5197	dde06855-85ee-47a1-ac74-914aec002ee1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3cecfc87-7330-4009-91ea-94b65d512dac	c48de798-90ac-46ab-8a7d-ce383a9b5197	09661b38-6cab-4269-a30b-7af804c75a23	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1e56d3f5-f030-436c-8e27-a44ab86fa356	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	ddc037da-18d3-4a13-8ac6-d9958fe41804	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3674515b-b1f8-4d50-811b-f88afad23784	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	d1f589eb-6271-4df2-93e9-3d7d6576e59c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4e0a9a07-38a8-4cc6-aa36-d62621a4cf49	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	edf99df6-22a6-4f96-b8fa-3a1e9df97991	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7858a492-92bc-4a3b-8bb3-d590eb5f239a	f1a154df-b14e-4464-919a-227c2911ba71	799b8df7-7be6-4516-b353-880a186d5655	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2b2ff8bf-a2f3-43e1-b0e5-1adde629a865	f1a154df-b14e-4464-919a-227c2911ba71	d950b559-0ad8-4897-917d-aa2ef2415a44	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d727d6c1-bb81-4c9b-8b91-d64afccd1158	f1a154df-b14e-4464-919a-227c2911ba71	b1f249af-d391-4400-b8c7-53b5b4fb8cdd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c0cdb0d9-ac42-4fe6-8221-86ab31c6f32c	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	96dee5ee-ca72-4b7a-947f-b04cd2cd0f59	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e1591205-ec64-46e4-890e-55aca942b9ee	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	28cd0e9c-dd77-46d7-931a-bf0a978640c1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
247a48b6-a99c-458b-9e3c-12cd6b5070e8	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	677e956f-66cd-48e5-9070-63ca53efb330	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
056e6800-6f9d-4408-9175-702cbf10e9af	7993d6f5-ae55-42f9-8a93-33469f77f97e	8da206ac-bde8-43de-8474-117a186d3f85	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3414388b-cf39-4b5c-aab2-1db5e2509e6c	7993d6f5-ae55-42f9-8a93-33469f77f97e	5f3ffd0d-541d-42a2-b54a-19ef53fa34b5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
18454bf4-9942-4fec-ab0a-996aa366808b	7993d6f5-ae55-42f9-8a93-33469f77f97e	03435ee3-b919-4bc7-84a8-ab0962ed2cdd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27a6dd03-a2d8-4fb7-94e6-36438624db7b	92ddbf21-eeb8-4dbf-b375-67b791f6f189	f2e42931-12cd-4de6-a591-08bff308030b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2b77cca0-d981-485e-8fff-457c5dfc9c40	92ddbf21-eeb8-4dbf-b375-67b791f6f189	6ab4b9fc-2b3d-4c59-94d1-1d7e9eb1ef8d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4fffa242-fd33-4998-bc46-3058aee23643	92ddbf21-eeb8-4dbf-b375-67b791f6f189	333f85d8-9d74-499f-b665-0b8eb4320513	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cd9a22ef-1270-426a-b68a-846a3def4d38	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	4907ac96-ec87-46c8-982b-1040531a2481	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9e9727ab-bf57-4b14-82f0-25d98732caa1	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	dfde0257-ee5b-413a-a363-df0ad62b6b36	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
93301565-f751-45da-b7da-49d64dd639df	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	eb45dce2-9477-40f5-82e4-b38f5d286944	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aadd4baa-f964-4211-8c0a-df00ddae1f5a	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	9946292d-ffb5-4509-a46f-1778db18466d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4845df88-1513-4380-8256-f3ef2566ba7f	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	0b8e7dd7-f5d4-4128-b439-ef17518e092f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
616a4a74-b81a-4423-a9fa-dec7572d97aa	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	7888840b-3926-4a61-8714-52ff28f7609c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
48de25a7-dddb-41e1-bc9c-f658606ad5ef	52bead5d-2a56-47f3-991a-efa29d065eb9	20c664f8-c2ca-474e-ac75-f543a45e9fdc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2fad6dea-862c-4bac-a46b-b3b51263fccf	52bead5d-2a56-47f3-991a-efa29d065eb9	0c708c25-458e-41dc-beb7-3f15c2f7454c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4f8d04ac-32d4-499d-b5aa-12ef56d8417d	52bead5d-2a56-47f3-991a-efa29d065eb9	ae2c932a-8421-4cc9-ba92-5f2eff97a18c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
33cd13ea-9c14-4333-833f-f44a2f7361ff	828cd953-6202-4314-8377-610c699ac17a	de8215fa-07c3-4b10-9962-efd09a0c185a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3bb28b5c-32e7-46e0-b402-cbcc3851b3f1	828cd953-6202-4314-8377-610c699ac17a	c530c99e-e9f8-44fb-b62e-f1945c833654	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5a02ea1e-51ad-4021-806f-f465d717f0df	828cd953-6202-4314-8377-610c699ac17a	88ed4a1d-59b6-4207-8fae-72386f523132	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
94a1c01a-172c-4f9e-97e6-5a90396fb134	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	f194fb27-d7e3-40c5-bd26-d48bdacd20a4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
51374bbc-116a-4606-9cbd-27921e23fe4e	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	cf96ade5-c05e-4c39-b76d-29d28ee182b2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2696e254-22db-478b-ad5f-e27e58bfa859	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	53f2b02a-f6be-45d1-81c9-38570f4496bb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d5ad3648-b526-41c9-978c-16de8a421683	39b3ece3-13cf-4797-9c65-45fe96c50d8a	42aa9d95-a7b5-4bce-8ad4-156e1914c03f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
42fddcbf-7058-4f5d-8ec6-044721fa4d21	39b3ece3-13cf-4797-9c65-45fe96c50d8a	cd3d24c2-b72c-49c8-877e-e0f7e976179d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b5d26f34-a543-485d-ab53-80d3de7354fa	39b3ece3-13cf-4797-9c65-45fe96c50d8a	b0341a23-5239-4aa8-90f1-eb0fff4de79b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1b43a20b-53a6-41aa-ab92-e2808c57cd4c	d9f8b7eb-47a6-489f-95f6-237cf032065d	86cd3f59-dd28-4fba-8c93-a5fdee88c2b0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
995e5054-d6ef-45b5-810e-c2f423752614	d9f8b7eb-47a6-489f-95f6-237cf032065d	f0579ffe-5e25-4f80-992b-7ce91d7466d7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a154558e-2b7c-4b4d-a9d0-5eedd52f24fd	d9f8b7eb-47a6-489f-95f6-237cf032065d	233c2f02-2d1a-475a-9592-28dd4a4fde8c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a592ec7b-b91e-4ff3-8783-1fc9d4bc2eed	c5e324d5-ca7a-465e-936f-69e4a46381bd	e229a96f-cde6-4dca-9cad-0b732a6eab66	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3de9170c-77ff-458c-ab82-bb7b7397c356	c5e324d5-ca7a-465e-936f-69e4a46381bd	0a235ba7-bcad-4354-8997-b38ece2d493d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
473bc5c3-693d-4904-a4bb-c0379bbfe790	c5e324d5-ca7a-465e-936f-69e4a46381bd	bf09bb05-9ec3-42eb-99bb-6ac630595a76	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fc982044-b9e3-493a-aac5-5e03848315dd	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	eacd943e-6d3e-448b-879c-cafe17bbfc07	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7cc6a3a9-ae5a-4071-8978-fb59a3d60777	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	521f62eb-e6e6-4d9c-9aea-5eb646b3afcb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b31457d9-5481-4339-a2d3-fc7ac5c3814f	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	23c89f93-5384-4f9b-90e4-873c14caa99c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eb4cb0c9-f148-461a-9f92-b0d64238f1cc	b81ab7be-a94d-4d56-a26a-b09569353a37	7e409705-dbd9-49f1-bf91-d683bbc42bab	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2afead6a-558e-4aab-8ada-11a998336a1f	b81ab7be-a94d-4d56-a26a-b09569353a37	514d7909-05c9-4574-a4ab-3287440d4307	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8fd52d10-afd1-4489-92a7-fe3143fe02f8	b81ab7be-a94d-4d56-a26a-b09569353a37	f3beb5b4-4ec6-4f67-910b-5940ba3203e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c4dd4fc0-a9ea-4a8c-a60d-18c05c8b2756	d5e13d3f-4976-4654-9ee1-4b7481113f8a	b8de7b1b-a8f3-4a5a-813f-880cf54c7258	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b4d12499-884a-411c-a2e1-a680da6e5df9	d5e13d3f-4976-4654-9ee1-4b7481113f8a	77846f7c-530e-40e4-9468-1330c06d431e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
85242a4c-2ea8-409a-8222-7651f988fef6	d5e13d3f-4976-4654-9ee1-4b7481113f8a	b7ea7fcf-818f-4ac1-b063-6c8de8a7efc5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b06a0b16-c6b8-4d33-b893-06db66a0e9bc	94bab4ad-8004-4231-a575-05d4778d1b31	0811a245-9f4b-49ae-8ac6-cc7aa3f0819b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a2c95e2d-e024-4fae-a66e-bcb35188040e	94bab4ad-8004-4231-a575-05d4778d1b31	17e7c82b-83ce-4b12-ad37-a54370ce6bb8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4a23a2c4-7eb4-496e-b7c6-ed938f09a6e8	94bab4ad-8004-4231-a575-05d4778d1b31	3725ecb1-7e2e-4683-b72b-841dee8a7413	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
518306a0-9d9c-491e-9f76-a82f48d5c9fe	29161948-28d9-496c-b580-4db234dcfd49	fd73879c-6351-4996-86e5-3895e477f577	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0e869acf-df22-4b78-839a-18b7875a327c	29161948-28d9-496c-b580-4db234dcfd49	2afa68c8-9b05-480c-b59c-80d7bd837722	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cee29e74-4a67-44e6-b4f5-fb8668f4e5c1	29161948-28d9-496c-b580-4db234dcfd49	d397a182-3c03-40ce-b659-553f71ac965a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f36dfdf7-6581-4123-a1eb-2d8028ef6f7a	4fe0dc57-7dbc-4219-b34d-e17eef96168a	82e3ae99-ba47-4e8e-8226-39401ff6f6a5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef1e259d-3952-422c-8ff8-812d58c30c78	4fe0dc57-7dbc-4219-b34d-e17eef96168a	fc59b730-c181-476c-b6ff-4f5e544ed6c5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
db10cf1c-fb5c-4ae6-833a-39f07e6a8b89	4fe0dc57-7dbc-4219-b34d-e17eef96168a	19bb2551-eb57-4343-880c-e8e53e9de779	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f382bf45-ade5-43f6-889e-79c47cf4212c	64a976f5-a78e-4dcd-88bd-7412386b16a7	1dcfa045-86cf-452f-9318-1a45abb2db5f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8bb03fa7-5a81-428a-b983-a6168a6fe915	64a976f5-a78e-4dcd-88bd-7412386b16a7	e1e1ffae-0efa-4836-8c8f-01e485d9308a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a9183c41-9757-42aa-a693-18500da5c3a4	64a976f5-a78e-4dcd-88bd-7412386b16a7	ec712d7f-7e7e-4995-acd9-2d604b1f181c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cd466a69-1fee-44bd-9691-d10bb619e091	39591cde-e167-4fa1-b3cb-3a620edcfbe2	d1f36120-4d75-4edb-b5bf-7e218174be74	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3db672f0-efda-46f4-a585-b8358b6aa5c3	39591cde-e167-4fa1-b3cb-3a620edcfbe2	d0f73deb-6de1-405e-ac81-54d4502aae0c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ebf311ef-32ac-46c8-bb44-57f1aedb3cf5	39591cde-e167-4fa1-b3cb-3a620edcfbe2	d32da10f-3f49-4453-b186-cd73e5850c6d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
923fb363-238c-4c12-8d79-6bad0dba999d	5334b375-acf6-426b-b62d-96cfd55e373a	4caa4115-e65b-474b-a09b-2f5511585ca0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b89e9338-4997-49a9-b3f6-8077bc5422d6	5334b375-acf6-426b-b62d-96cfd55e373a	cfabd5ce-6ff0-4c6f-8fea-6884677172ca	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fc4f2432-a9ac-4a74-8a2c-9b7e0364e003	5334b375-acf6-426b-b62d-96cfd55e373a	0409fd63-ba96-4c48-941b-434939f61a00	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
80545ea4-14f7-464a-9547-539eb7c16f0c	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	9cbe39a8-328f-4039-97e0-81b7c6d1d5ad	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1ea9e140-1794-43f2-b450-53e5a081afb5	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	40c1cac1-83ce-4842-820a-7e7ac3e488e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f2af7e6a-971a-4aae-b88c-cee568903aa0	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	e9cdfd8f-056c-4cd0-b500-90fc5d23227b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ef06dfc1-d0b8-4633-a9a0-1ed95a262800	3d99d65a-33df-4ebe-bc41-2ad546d6790c	2081c7ed-2c70-4d1b-97bf-d8baaeadfebe	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3be26dbf-65ae-4461-bb8e-e969e8632a67	3d99d65a-33df-4ebe-bc41-2ad546d6790c	1a8a312a-2afd-4189-9b7d-3b958518f539	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
575b4021-ca97-4b36-9dea-6d5bcf3368f8	3d99d65a-33df-4ebe-bc41-2ad546d6790c	7ac75492-ac4c-443d-95b9-45208639677f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8f19b4ce-ecb2-45c7-b58b-e763d6941b55	7041706b-03c9-4811-9e66-5f44df1e8c2d	2587c412-69c5-43a0-9fc7-cccf64890011	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f4e930a4-b7bd-4f1d-8ae0-81474fd237d0	7041706b-03c9-4811-9e66-5f44df1e8c2d	4637f409-3d88-4015-8443-606d804f9c41	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
17219452-3e4c-4544-a294-0e1ba97a80cb	7041706b-03c9-4811-9e66-5f44df1e8c2d	6168b6d6-49e3-46bf-b7d5-fbfbb53c61b7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d22dcd05-0a36-443e-95fa-8e3c7cf15183	5deff441-fa44-45dd-b557-2bae4131ed87	c0537266-5932-4026-9ba3-5bdd6844aa28	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
370a9450-337d-4c4d-97aa-3635c1e99d85	5deff441-fa44-45dd-b557-2bae4131ed87	c40aaf60-2979-4e49-a043-9ac60d8036b8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c515ad56-519b-4ddc-8582-689cf37ca443	5deff441-fa44-45dd-b557-2bae4131ed87	06d58b40-4211-4628-b44a-764a747e360c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3510f8ec-88a6-4ae6-b9b7-9bebdddd00c5	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	c9b10877-7dfb-4911-b291-cc08dc5dcc0b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
be084dff-24ed-4128-a436-c65c82c9b771	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	02c45e33-c11f-447a-962b-400ed47fd2d4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0cf13485-73dc-4164-9e11-61fa94f308f6	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	a79da6d6-94ee-4409-9649-166147667046	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c955be50-714b-4f1f-bcc2-459c2774183f	6192fe95-e612-45fd-820e-c6e7ec3ebe20	1ad2fcc2-c469-4dd3-abfd-71a137cba0e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
858d9182-03da-4fa5-849d-7b8063ba6292	6192fe95-e612-45fd-820e-c6e7ec3ebe20	72ff7752-fe80-4ba8-b301-2dc14e1c62c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
76d10f47-2855-4085-9aca-d16456063213	6192fe95-e612-45fd-820e-c6e7ec3ebe20	c9f938df-da0c-466f-bbf9-286acb54810c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0bd6ea2c-37a8-435e-9d96-be5c01d72b0b	f1f94b0e-2997-4c2b-b542-7dc1873f2223	55da9522-a55a-4ab6-bf75-385a5b5da6f5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f38657f9-b512-40e4-b22d-46cea2749947	f1f94b0e-2997-4c2b-b542-7dc1873f2223	96fb3662-1289-4d78-8257-4dc6fbbc3f77	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6bed8067-1949-438a-87ce-c5c6da47334a	f1f94b0e-2997-4c2b-b542-7dc1873f2223	c52b2ea9-32f1-42ae-bc79-3646bfd101b4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6498eecc-2792-4583-96ea-d8afd666c818	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	12c4dee6-86d5-48fa-ba45-a228ae05d0ed	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8d3f5451-6d30-461c-b65a-cfea48542578	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	118dda34-fd70-4c5a-af30-a212222d05b4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dda783dd-dd6d-408b-9063-365d87bbee98	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	31caba43-8f74-4ae6-84e8-ffa77e3592aa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5f0f48a6-38cc-4ac3-af48-4dfd56f600f2	68d2a14a-45bb-47a3-b756-cd30710c6ff3	baee3470-0d8c-4c67-a44f-3d0ecf96dea8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c9c289f1-5b51-4607-8e24-683829cf69de	68d2a14a-45bb-47a3-b756-cd30710c6ff3	07a015fd-5211-49f4-9a0c-ba68fcbe80ea	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2f40865b-4f23-4191-a0f1-ece70ab8da21	68d2a14a-45bb-47a3-b756-cd30710c6ff3	ae272b13-8ab1-4a83-be92-e6f1a124070c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c51af7b3-fa15-484c-9283-aa02fe05d019	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	74fcad63-27a6-45de-bc3e-cdc3796a8599	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
649224af-703a-4e06-a2cb-4e2bf0029cb7	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	8e88749a-2e23-48ba-b8dd-d0c4eb3806fb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9e55f121-649d-48ca-a1df-9b028555ae26	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	2be0efb3-6851-4b1c-a467-c7a39c2eac1c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4ae6e8cc-0076-4513-a41e-7a2d895763e9	5c23ac7f-336a-411c-b5bb-f436e407e8e3	843f26d7-1efc-4405-800b-b5b90c2889c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
80071dae-f5fc-470f-a4ae-1dbf3015af3c	5c23ac7f-336a-411c-b5bb-f436e407e8e3	8e2456aa-0115-4d07-b244-d1c9a7be0e09	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
59579545-1bc1-446f-8f30-6b66ef1d2434	5c23ac7f-336a-411c-b5bb-f436e407e8e3	1e76eab3-ff02-4f1b-8bea-7b57b45d6d6c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4d0cb65e-10e3-46d4-902b-aefd11215632	c6dbb337-65ba-4360-8e98-483939d0faf0	47a15b52-ebcc-4c79-807f-15b92d1ae204	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a5dc8178-6418-4597-91c4-2131d607f2a0	c6dbb337-65ba-4360-8e98-483939d0faf0	19a3ceb2-146a-473a-84a6-f09c421cd46d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
151b2756-c9f2-4cda-a02d-ed204e9a5d58	c6dbb337-65ba-4360-8e98-483939d0faf0	ec89cf83-d576-4d5f-a833-b0ed7fd8d7d4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7fc70ee3-b7c0-4442-b189-26c401ab267f	3d9de990-655a-412f-a171-2e99c9ec7a98	36d69d98-299e-45da-947d-9da743e5643e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8dfee680-d9c0-4f6b-b4a4-6f65024ec46e	3d9de990-655a-412f-a171-2e99c9ec7a98	01ce7f6d-2f4e-4259-904b-7389a23b28d6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ab66e0dd-3773-421a-a8cf-329a1d3b630c	3d9de990-655a-412f-a171-2e99c9ec7a98	09620da5-452b-416c-83f2-9d9b8c076607	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d5e0e316-a69d-469d-acf1-a443d093dec5	531ebefb-9720-4d57-9031-13a9ae5d2666	545a1ef2-b3c8-4058-8bf6-50eb9402d17d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6f44b93c-6c30-43be-9e65-a117436e51c9	531ebefb-9720-4d57-9031-13a9ae5d2666	3cfaf40f-5fb5-4320-af12-305339a8fcd2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
016c74a2-846a-426e-89ef-bfd2cde35ed2	531ebefb-9720-4d57-9031-13a9ae5d2666	1c220144-00cc-4696-9a83-3291cae1dd8e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
20b697d4-f16d-4ea4-a3d3-023fe1f71f86	d8f8529a-9239-4f99-a49c-1d88abc62488	56a45299-77c6-45a7-b283-f4359076339a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4183f064-5eb9-4bd8-9acc-ac9d38cd068e	d8f8529a-9239-4f99-a49c-1d88abc62488	f7eda628-8e5c-48ab-a0a9-f8076fbcfae6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27b9a18d-7cf7-459e-b100-f1a102fe8128	d8f8529a-9239-4f99-a49c-1d88abc62488	48a5210a-533a-4828-ae10-5a777b5f1c98	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6be16890-5052-44fb-b21c-e642ed1f5025	93ece844-6dee-4add-bc57-7dec482e45ce	f6cdaff9-02ca-4cd1-aac4-af53652a595d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
279c9e0e-35ff-42eb-b160-6828b8e324b7	93ece844-6dee-4add-bc57-7dec482e45ce	92bfef85-99c5-4ea1-bf8a-c9a0671815ff	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d05a94a5-55e4-40bd-bac6-516b1c7be755	93ece844-6dee-4add-bc57-7dec482e45ce	13045109-5b51-45f9-9345-dc59f54ec855	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
35850355-27cb-4284-80e8-6fa34cc6450a	f0a75e56-d4da-429e-98b7-92d643d55138	7d841af9-6bd9-4963-868d-4633f18d8c3e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
41d6ea50-a44f-47de-9ecf-24d39ab6e667	f0a75e56-d4da-429e-98b7-92d643d55138	e4f3e29b-37ba-44e5-a757-bd508d29920b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a99539d6-82c5-4cb6-8952-a66cd1f4f7ca	f0a75e56-d4da-429e-98b7-92d643d55138	41dbd700-8834-4a49-bc53-32175d1c1584	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
81cfbbbf-9f23-456b-9d44-3d5b304f7bff	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	75aaa330-4f96-4f70-a5a2-2017d5c58814	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
734367f6-5fea-40df-9a41-daced1e01dae	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	bb6aa834-e4c9-42bf-90e2-f51b59d5f635	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a5421c3f-0b5a-4c17-844f-8f08b1004cac	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	45e464ca-03c0-4145-91f8-302f0e7e643b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
012c4560-4cda-4f35-a881-d49568e0d591	3f9b2867-b203-475b-85c5-e7faeb445d21	43e40e41-f3c3-4d51-944a-bb5dcb11b291	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
83d7b46d-da95-4d21-b0dc-87cb15b204d5	3f9b2867-b203-475b-85c5-e7faeb445d21	e546086d-d1ee-4de7-bb03-c9c129a2598f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
96ec0c58-2b82-4f1d-8d68-ada32c239984	3f9b2867-b203-475b-85c5-e7faeb445d21	8cebf85c-8567-4503-8fcc-baec1ebd06f3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
892e8749-c80b-45f9-9b3f-4c4d77ecee72	6059c523-1080-40f7-85a1-059e006f4086	97a09734-452e-4e30-9cbe-fc7f3959ea03	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
98d198cc-a8a1-4b24-8ad7-7f6f608d3702	6059c523-1080-40f7-85a1-059e006f4086	8995f848-c3f0-49f3-8600-b22ae04d0069	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1a82b5c4-5d7e-4844-bb08-e01e15b73cb5	6059c523-1080-40f7-85a1-059e006f4086	2ade2322-d07f-446b-8580-d35db4aaf28a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
10213c77-7e50-4710-81b8-28b7e6dbe7a9	775919b4-f2a5-4d06-8a03-b75f8f322d6a	bda5eee4-20e2-4a02-a89c-c4dfeed05745	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
03289f4a-00a7-4449-9882-3d55c9b20ec2	775919b4-f2a5-4d06-8a03-b75f8f322d6a	151d889e-ad59-4161-b669-6ee130c5b4d5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ebe03c5c-9501-4642-856e-a4a3879c59f5	775919b4-f2a5-4d06-8a03-b75f8f322d6a	2e38b789-5f0f-409a-aaee-8e9ef1954911	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3dbbee65-f2be-4c6e-a17e-9f8fe43d8f33	280ca217-97f0-454a-a18e-0d952e3f0b1d	a2bf94cb-d647-4f74-8ebe-620a89e618be	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
166cb8ce-69fa-4692-884c-d56e16991586	280ca217-97f0-454a-a18e-0d952e3f0b1d	3af786b4-d53c-4f3b-8420-2a3fdd82d521	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1043a658-89c1-4e96-8984-b76294fa4215	280ca217-97f0-454a-a18e-0d952e3f0b1d	662a423c-e373-460f-9baf-20db2a1dd997	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a26d4736-a55f-48cd-8f2e-a0293f3f7a61	bab6c3d5-c460-43f7-a660-6d6b8747318b	68cb9815-0146-458f-987f-81b8bfa0bf46	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9452a270-c058-475a-b00f-cbbec8db4f65	bab6c3d5-c460-43f7-a660-6d6b8747318b	01b932c9-ce4a-4b41-9c68-9a0eb279c74b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0729f334-8725-493d-8b37-7481f61b1bb0	bab6c3d5-c460-43f7-a660-6d6b8747318b	f0c37ec8-8b2f-4001-805e-9ea93689b3c1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
63e04311-ec67-4b67-934b-8384844fb5d7	96218f01-4d39-4de3-a748-6dd625db4252	70e9d87b-cb71-41cf-bde2-6c45f1abd275	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cc17706a-de8b-4b7f-a680-9e4042d8180d	96218f01-4d39-4de3-a748-6dd625db4252	aafaed4b-0259-4247-9899-704169cd3c18	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b393eeb8-565f-428f-91b6-f66de5519f42	96218f01-4d39-4de3-a748-6dd625db4252	ba33d487-f5e4-430e-90fd-c3e002305253	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
54cdbfb0-4413-47bd-9cc3-8faee2933c17	884828eb-60d9-4423-bc31-a487113c38e7	c3a7773d-ad02-4166-8f26-2f655c521ccc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bd984a32-8507-42ba-a357-3a21dd3f2b38	884828eb-60d9-4423-bc31-a487113c38e7	9dcb84fd-4d97-4844-841e-f863ff854602	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bfb04382-cc68-451c-ab74-7a77bb8f8b6c	884828eb-60d9-4423-bc31-a487113c38e7	594e3529-b3c7-4a94-87b8-c8723936e701	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
460f02bf-aafb-46dc-ad08-e12b64297df3	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	04735b04-0841-4f61-bb9b-9a89773a73e3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7ecfdc4e-9b9e-4a89-a820-08a52cc715de	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	ca76ecd1-7446-472a-8149-9796da990edf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
41c3af51-1dcb-4b46-a958-64ed97a60da9	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	99e63150-aa62-4faa-87da-0d776456add8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
87795c07-ae82-4568-86f9-6026fa00d99e	ec873406-a5b2-4f2a-b007-522847f4fc86	0b888eff-3d3d-4318-ad15-7315e8d43a68	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
15745635-5ec1-44fa-b9b9-05444eb4afd7	ec873406-a5b2-4f2a-b007-522847f4fc86	785c67db-43ed-4d8b-a6b1-181260f662bf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9ee6f35e-c76f-4daa-a561-9b29e2fd2f6e	ec873406-a5b2-4f2a-b007-522847f4fc86	5bf8508c-df6d-499e-a467-d5ef378b96e7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7ce579db-0212-4522-9151-c5b01bae030a	f29e0936-5075-4959-9f3a-8e0631322a56	bcb96200-4c56-448e-b8c8-ebe5334bd21d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
05ce08b6-8301-45c2-a5ba-b6906071c48a	f29e0936-5075-4959-9f3a-8e0631322a56	25830e0f-1ac9-411b-a374-6b482f868a21	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6c6c2816-feaf-4253-8e80-09abf25aa3ad	f29e0936-5075-4959-9f3a-8e0631322a56	8cff106d-09f7-408f-8d30-a0bfedb5a606	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
edf87fdd-ea81-4bf5-a84d-37966bc6f509	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	fe3f2f99-2e8b-44d7-89d3-05df303b26a5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1481de84-4397-495d-ace1-dcbca8f6339e	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	d895375f-55c7-41b7-8e9a-51a640ab9815	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bad13438-89c6-4a72-88d7-fd3ff48c6714	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	1dc20211-cc23-4875-bad8-81472879c8bb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
74b19d18-c080-45cb-b033-fbdd0f17c69a	39d50a82-2cdd-434d-86a0-697a11b8b4e8	81279cf5-a820-4264-95b1-01d6ee92ab66	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c6832cb7-f33c-4737-b2ab-336ee5b9dac9	39d50a82-2cdd-434d-86a0-697a11b8b4e8	abac6a84-f740-4cda-bf25-a34d19c4ef2b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
264fa5cc-30b6-4e0d-a754-ca325d91652a	39d50a82-2cdd-434d-86a0-697a11b8b4e8	5c0340a3-85a4-459f-9aa7-f6485d76509d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d07ec010-fd6f-4476-ae1d-36a501c8e38f	6ca38c24-ff0b-4de6-bb02-7728da1a152c	8b45ff87-3b73-4721-861a-681ba826195b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
33b30257-a72e-41b2-a4cd-fcece9ac1325	6ca38c24-ff0b-4de6-bb02-7728da1a152c	763f8302-641a-45c8-b733-50b722997a96	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6a225e25-19e2-4db3-bb78-738c0e9271ba	6ca38c24-ff0b-4de6-bb02-7728da1a152c	8d561341-dbf6-434a-94ae-328d0dda6f98	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0c7d05c3-3066-4c93-87fc-eb56f55f0e6a	891f007b-b216-4b69-82ae-7bba793fa2d2	79045166-f69b-409c-aada-0fcf7ea8fb42	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9e7c2ca6-4dce-4fd7-b83c-d41fcc4c6d27	891f007b-b216-4b69-82ae-7bba793fa2d2	bb38f10e-6b56-406a-83de-546d6fcad3e8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
446a7ba8-3014-4929-9bcc-b4a93f360666	891f007b-b216-4b69-82ae-7bba793fa2d2	7a75a423-a383-49d9-a90e-eba17b2920b8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ede13bd4-8a32-4e89-a032-2b2d5dcd3de9	c9b4438b-d77e-4678-8ea5-0986c8de862e	68611fff-4ee1-4b79-aa6e-9585251e6411	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1c9bfa90-1dfa-4d8d-a98d-288b9e7a0f05	c9b4438b-d77e-4678-8ea5-0986c8de862e	c2977415-39a1-4e85-8272-00e4b707819b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0a89af66-28df-47bd-94cb-a43cb26e32a9	c9b4438b-d77e-4678-8ea5-0986c8de862e	630ebbe8-b574-4014-9474-a92042d2dff3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
899f041d-9875-4f79-af93-91b528bb2d56	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	cc9fc1df-7379-42a2-af5b-dec197782ce0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2d155c20-473f-411f-892d-812858a52308	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	e5ec2857-3a22-4e7a-a8d3-32ec0c38ba64	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2089484a-18de-4703-90d5-3ab196e37ffb	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	3901370d-3d25-4b64-9e2f-df3b42e8fad3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a6e80e1f-6bab-46c9-a6da-e3b21ffb226e	145289af-7463-4277-a429-6bf5c918586f	1e74e693-a135-490c-be22-a88af588dabe	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9a570cbe-8930-4f63-a5db-4175caedee80	145289af-7463-4277-a429-6bf5c918586f	0cad0969-22bf-4ed0-a526-91f3c6e675c3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d9aca751-8a43-4c4c-a95f-d78df135e1dd	145289af-7463-4277-a429-6bf5c918586f	d8fa349e-7ebc-4eb3-b19e-4f5640726a74	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
44bbca27-4d43-4b41-9cbd-05962c86a21a	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	6e4ecdfe-9d5d-4db6-b2ff-7da2264fa138	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ad95c1bc-8870-4314-a154-f8865a47ec60	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	4a2425ce-95c2-4103-92d7-8cff23ddbb92	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bd067184-2895-403b-82be-46a89497c141	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	5b839cf8-00d0-4743-a000-5f914d4baa9f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b72d3ee5-ef12-4bca-a84d-898cf126459b	8241db8f-cd01-4e71-a0df-4be5525223fe	35c46509-ff54-4439-9ecd-ed4dc108f660	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
026eca80-e5e9-4a78-b2a2-1e6e5fa6b9e5	8241db8f-cd01-4e71-a0df-4be5525223fe	71942eb0-beb7-4eb7-8e57-3d6a46351cd9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
63ec2607-ae31-493b-aef8-c88d4d3bf0aa	8241db8f-cd01-4e71-a0df-4be5525223fe	631d6702-3a18-4893-9b40-e8e849b3c57b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
439d6662-9f9e-459a-a1d1-1e4ce0c2ba32	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	8d48e72a-4afa-4729-907d-33d429cc1584	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c2a9271f-ce3a-4ec5-bf67-7f8bb5ce923a	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	eea6111a-6480-4a1a-be21-d2d8d92a7910	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
23bb6ae1-eef6-461a-a7c4-fd39976be87e	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	72e2ef01-2f9d-4b34-8295-090a841b6e6c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2b0aa543-8602-46cf-8767-10b5acce354b	080c200f-9f88-4fb3-9aeb-c460331b4fad	ad7bc707-7c5b-4ed2-af37-e5f37cb97047	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bcc0eeff-d6cd-4477-882e-acca4b097fc2	080c200f-9f88-4fb3-9aeb-c460331b4fad	56ff9124-be49-4332-80bb-31bd815fb1e5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ce8d2610-8350-4495-94d3-3b6d4104c4c1	080c200f-9f88-4fb3-9aeb-c460331b4fad	a426dd0f-251d-4f93-8cee-da12781788cf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cf525530-2125-4c24-a52b-9bbd940c017d	39f1b89f-b571-4834-92b4-cf83698fd761	61edc66e-4a03-4fb8-b99c-2672af345768	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
416e544d-edf9-4997-9ccf-67da4fb9d8b4	39f1b89f-b571-4834-92b4-cf83698fd761	ab812ee0-f304-4f67-a646-b4f7216680bf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
97d5416f-6ef1-488d-a8c1-d8b03f384a9a	39f1b89f-b571-4834-92b4-cf83698fd761	11bd5a24-6e27-4537-af4b-51380a6985e0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0b82c15c-726c-4de3-b559-c684d3dd016a	6c1bcd69-500d-4906-96b0-e95132ffe395	129f4c7e-2097-4763-8856-57c1fe19e8bf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fbd35fa9-9d67-485b-8c31-eba238ca4add	6c1bcd69-500d-4906-96b0-e95132ffe395	78be8562-155a-4fa5-8455-4a46fa18a081	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
94345910-fd81-4937-b1f2-41d4bd07fdc5	6c1bcd69-500d-4906-96b0-e95132ffe395	6ae51c58-ae14-43cd-87b8-ef8c5f4b2509	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
477d8adf-4940-48f4-b606-765936811cca	f716cb4e-a53b-4637-9305-15a4ae9cd578	43f49370-243c-44a3-876f-7db6701b8bcc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7e81a752-a05c-4d20-a8a2-dc9612a107fb	f716cb4e-a53b-4637-9305-15a4ae9cd578	303f2522-9560-44be-8726-d694f0c44eb1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
616f4306-d168-4291-a304-38066e0d5bc6	f716cb4e-a53b-4637-9305-15a4ae9cd578	74086bb1-573d-4963-af11-5da1ab2262da	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fdec5c20-3ab1-4bc4-8684-c1b6df48e996	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	3483d95c-81b7-4b72-825c-e2d3af3f1888	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5907a441-9380-4dee-9940-eabf39f92ea6	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	465af9db-e233-4ff4-b0a8-0ad0928df135	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0c3c9916-629a-424d-b6e5-b46f46fe224c	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	d823cfa0-faec-44fc-ae91-682a58a537fc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0391e178-82b2-4033-b87a-409841064722	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	da5df48d-4602-458f-b526-b17f87f4fa6d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d4e70f4c-ac67-4acd-8470-4240a25a5080	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	0e70437f-c26e-4593-94fb-26fa07ec0dd2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
47e16309-59d9-4f29-911b-57d578c36092	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	a331d8ba-918c-4a4a-a1d2-5ab9b92e7d03	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fbb83c28-962f-40bf-9f6f-717dd91d0607	3f1fea43-0c89-4a0f-9c85-69a142b7de27	2ac87f83-4e6b-4133-b3a3-c23e4b828f28	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
45397a10-1aa8-48e4-9cd3-c06afe1d8d33	3f1fea43-0c89-4a0f-9c85-69a142b7de27	1353dac8-7c98-4908-995e-6a0b29e8372a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
028468f2-f7e2-49d6-b562-3b9dd270ea8f	3f1fea43-0c89-4a0f-9c85-69a142b7de27	c1570dfd-bb70-4fa5-af3d-edfaf8b1424a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f4abbba4-8c91-467b-ace3-0f9a93ec4757	826baa70-73c7-4b98-9be5-a081641317d9	b7c6fbbd-0591-4f73-939f-01618b193832	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c7a48fef-3759-4822-8c28-283a5e4e8deb	826baa70-73c7-4b98-9be5-a081641317d9	d40de161-dccd-4c67-b8ae-02a1d1cd95c3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d8343441-d129-4416-bfaf-952931d8e012	826baa70-73c7-4b98-9be5-a081641317d9	31980e83-fb06-4fd2-81a8-8e39cfa6544b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b50eee85-ea34-42b9-91e2-ea5c82f3a74b	1116477c-81da-486d-98a7-5e92c071c2e4	7a21e9d5-133c-4697-b2cd-645a96dc5c48	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c8871e3b-ecd3-451f-999a-51c0bff4ec34	1116477c-81da-486d-98a7-5e92c071c2e4	634578ba-c127-4f2a-bdfd-bf3cc55a83e8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
03594ee8-4281-465c-8472-787ebe3e045a	1116477c-81da-486d-98a7-5e92c071c2e4	405e60fa-9748-4cfe-8656-9135cc37d0e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
506df40f-165b-4812-9f16-b29e9e9eeaff	83315f2e-fe15-4968-8917-05e6d7106235	77eea968-8733-4563-8aa8-23ca0be93d9f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
90d82abe-17fc-47d5-bb3d-b0a8a414ad64	83315f2e-fe15-4968-8917-05e6d7106235	13ef8bbb-b894-422d-a969-999a2f9fad86	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
99c70aaf-09e8-4aa1-a523-e0d64138bf03	83315f2e-fe15-4968-8917-05e6d7106235	2a810857-9276-4edb-ac2c-12c9d2c90b7e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f8335571-336c-422d-816f-18d52c744ea9	9b38d053-84d0-4542-924b-51079e6d990c	a56a65f0-a13c-4d52-b661-03d64d14002c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5c698827-b9e2-43c0-9205-ab6ea2737e1d	9b38d053-84d0-4542-924b-51079e6d990c	b83243fb-6c6b-4bd2-8201-1024f6b0292b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
80fe4343-c59c-4b63-9f21-82ed0381121e	9b38d053-84d0-4542-924b-51079e6d990c	86716d0b-76c6-4541-856f-1a8cc5f416d2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1fe2152f-7b6a-4885-a61f-50cc2f9dfcf3	5e8816d8-42f1-4315-aced-83173f06eb1b	6381c1fb-a9d8-433a-8762-6a5c845b529c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
041f5c69-9347-4191-8192-c65b154e0b26	5e8816d8-42f1-4315-aced-83173f06eb1b	a532c6d8-6dcb-4736-8025-4e2b82f2ff71	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9243953d-a6fe-4b53-966b-95c0dd20257a	5e8816d8-42f1-4315-aced-83173f06eb1b	511e4c34-fe71-4f82-8bc4-e9850d4d5fd6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5f528429-d8f2-4059-a9b1-9b5e5980bc1c	b7a6b456-f7db-4152-849b-b3ff6487805f	83cc2dca-e98d-432b-a36e-2d59f2e53d11	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c8ef02b6-8c83-49a9-8dea-1cb6b671570a	b7a6b456-f7db-4152-849b-b3ff6487805f	7237010b-0e80-40df-85b5-431f271c46b6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0cb90785-ab32-4b4a-983b-c745e80c4401	b7a6b456-f7db-4152-849b-b3ff6487805f	82d00faa-4e13-473b-b263-78f12d6347c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cb4505b3-eb64-478f-823f-49a5f980c52c	ce254908-2739-4993-89ec-7e9dc4379ee2	c6500f1e-ff5f-4aff-ab09-513c324209cf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
33bbd18e-3434-48af-88c3-6a3642183d9d	ce254908-2739-4993-89ec-7e9dc4379ee2	4f028a21-fc69-47d2-bc4a-b3fc2c1908e4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
da7a2816-84f4-48f3-960e-348754045be1	ce254908-2739-4993-89ec-7e9dc4379ee2	9bb41457-a98f-4004-ad9e-490d4c0017cd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7b60098d-12f3-4b5c-87ca-2d67b43fab5d	eb056ab6-5177-4883-88e7-ea202e37c92a	2340951c-8613-4459-9cd8-15f276ad6d91	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2ed2991a-b7ff-43da-90e3-a4c01ea9d25f	eb056ab6-5177-4883-88e7-ea202e37c92a	0e95953e-e7d1-47a4-a6ca-1d21f46ea06e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
de8fe6d5-ab5e-4d0e-9319-7b5a1e039a19	eb056ab6-5177-4883-88e7-ea202e37c92a	37607cb8-2cbe-49ea-9ba7-11d79d3afb21	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
422b3964-44be-4f13-aa70-a48aaedcca40	81d4b029-3dec-4b52-87f2-ff106b930076	62f506b3-a693-4d54-bcca-8156bc7b2d4d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fca52065-cdb5-4911-aa66-ddd1bf8b63fd	81d4b029-3dec-4b52-87f2-ff106b930076	1db6b60e-fea0-48d9-bf77-b1c85fa9e278	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3514c370-f07d-47da-9591-9e9d205aa09c	81d4b029-3dec-4b52-87f2-ff106b930076	60f11c06-15a6-4715-9ca0-87ded8c91430	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f962cf67-448b-47ac-afb1-928e14a6229b	67338e16-a200-4937-a647-72f4a7218d40	aa7e8528-f094-4f3e-8ca0-88cca05d40c9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
996e8406-1ba8-4393-89ab-1f0e630eac23	67338e16-a200-4937-a647-72f4a7218d40	93abfcaa-b67e-4e6a-9290-e41bf295aa4f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cf648ee1-fe46-463a-b305-47d622c39b5b	67338e16-a200-4937-a647-72f4a7218d40	401450bc-5af2-4414-aab0-e4836b15480a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
66b53f52-7c95-47ad-95a5-64cd19fbbbf9	3cb20ea9-d992-44b2-8df1-4966c40fa52f	637cb45b-dec4-42f9-af72-f27e45372616	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9ff804a7-5ef3-44f7-8251-c2c06fa401dc	3cb20ea9-d992-44b2-8df1-4966c40fa52f	92410d75-571a-45ca-abba-0a5e706224f1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
14a3a6d0-3494-481b-ac9c-066b99fc3c18	3cb20ea9-d992-44b2-8df1-4966c40fa52f	de70b898-678d-4d2e-8bc4-1c50c51b8670	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
628b53ba-fa65-4c5f-bfc5-cb2fa3e32e89	135c0949-7a6a-4655-83bd-b5620476af5d	14881982-529a-40ce-ac6f-8aae9283e586	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
46fd50dc-e867-4ae9-a933-f368541f1575	135c0949-7a6a-4655-83bd-b5620476af5d	e8903930-e5b5-4595-8c1f-716644e0cd36	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4e2f617e-a735-458d-9cc2-85d86cb0496b	135c0949-7a6a-4655-83bd-b5620476af5d	a7f68eaf-f5ac-4476-97ea-46ec685fffce	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
67570ada-1cc6-4069-9b2a-ff179cd87f8e	699d15ea-c9f1-46ad-961e-caafd8417ec7	a16b2d11-3c9f-4269-8e8b-6466ca512626	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f2ba7e3c-9e04-41e8-8148-c26e11b21dac	699d15ea-c9f1-46ad-961e-caafd8417ec7	97b61762-ee6f-4445-8283-bc3283535753	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fd67946c-05f3-4a99-acef-8bf502deb58f	699d15ea-c9f1-46ad-961e-caafd8417ec7	e1437bc6-5a69-4c74-a1aa-59091d437a60	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
75180a8f-89fb-40bc-8c59-bbb9b53714a3	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	aef590c0-cec0-46f9-8429-bbc070b6139c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d2416dbc-4848-49ba-bf46-5a56639df422	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	10ff34be-af19-4c48-b193-6b86a62d3b3b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4bccd4d8-8def-47f4-b986-1ed5040099e2	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	dcd8fa9d-a7f8-498e-b411-7a2ce022196a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ffa850e8-883f-4414-8710-acfc9a92d5bc	d38eaac4-f66c-4e17-b50e-b26128346195	9c74edf5-c2f9-41ff-9fec-eb2b6c4e045e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3344e7fd-dbe3-474c-b707-1b3d58ee832d	d38eaac4-f66c-4e17-b50e-b26128346195	f4016ad1-71d6-4dea-ac80-125e02b752ea	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4893c3bf-8381-4246-81c4-465d8a522be3	d38eaac4-f66c-4e17-b50e-b26128346195	0d974eec-f97a-46a5-8273-177287a3ec4f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
64a63c79-b118-4b6a-97cb-5670d28ae586	b3b64900-2aec-410f-81ce-c6472e1d0e3b	df1a3e36-1a3d-4970-93ea-d9f19264193e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eb9879e5-5609-4d49-b5cd-ad09b828ac52	b3b64900-2aec-410f-81ce-c6472e1d0e3b	791dc063-c854-4b11-ba55-ccd1e8047a82	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
62b70a80-7b88-42be-b6e7-6342e0d0c9ca	b3b64900-2aec-410f-81ce-c6472e1d0e3b	f30f06e7-24d7-4649-91e0-79843e0929db	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f6078c1b-9cf4-4831-afc0-27cc35cc55f5	131577eb-5549-4503-853c-f6aa2cc8fffb	420d6a54-2de9-4a35-920f-faf5496c3306	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f0c5ce90-d0ad-4464-bd12-5a4e0383a1b9	131577eb-5549-4503-853c-f6aa2cc8fffb	089775da-63ed-4066-83ed-dbf201e65b56	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fa12913d-dbcc-44ba-8ed4-651b48ef6494	131577eb-5549-4503-853c-f6aa2cc8fffb	fb36c082-b399-4f0a-ac86-e5cd744d8ffd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
51e27875-1fc1-4f0a-a5fc-420107a5a4cc	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	7a4c89d4-ad9b-427d-b1b8-92497fabd8ca	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9120308f-9cc6-4089-bc18-e6d4cea913a0	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	5b96c8b2-0e0a-408d-9d75-0cb7af7669d8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9564a8c2-ae78-4b6a-81c5-b662426ed834	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	16ca5481-1442-4d13-87d6-c1eef89a32c5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
69455309-0f8d-48d3-9dd1-2220fe11f528	23c96d2c-f0bc-44c6-985d-ae133ff60463	26dca692-a1b7-4f00-a021-9e12cd9db50f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0a9392d8-6baf-48ce-9563-b48837d755e8	23c96d2c-f0bc-44c6-985d-ae133ff60463	0485b102-0e72-4bb8-b40b-b16fc76b3154	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
61292b2a-2ab7-41da-9929-66f0c215ccaf	23c96d2c-f0bc-44c6-985d-ae133ff60463	bca012c0-6810-433c-af0d-8e8a01586f31	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
583d5a84-bb1c-4d76-8cad-34e818a5f909	b24c1163-1aa1-48a2-939f-384c7fdb54b8	6d0eac88-e9c1-485b-94a7-14cf462ac668	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c88d41cd-243b-46a7-9453-827a383b7a2f	b24c1163-1aa1-48a2-939f-384c7fdb54b8	e1b29516-bf04-462d-9437-969b710d9752	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
156af320-2151-4f1f-9f40-6061fec48b46	b24c1163-1aa1-48a2-939f-384c7fdb54b8	d0a8d4ff-4a95-4d86-9afe-22426cb94d5a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2cd60579-945e-4b38-8b81-1c1d52aa7b1b	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	3ffed0a5-77f9-4263-8559-8aa129a24dcc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
79915996-1756-42bd-b485-0ba401108e7d	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	48cc640d-ad9f-4b06-86d8-f3f77f869e3a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
43e7b782-6cd3-4df4-80d0-bf21d31b3ca7	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	84d78d3c-a714-4b95-bf0f-ead96c2307ad	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
80c5de8e-1206-489d-9ed7-3c5236cfb052	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	d59d24ca-399b-4406-b8d3-6e68a1e2f5d5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ca3f18ff-daf0-497b-b96e-dd47d548b337	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	d87af94b-6ff0-484a-aa86-b86511122793	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aa5993b1-a43d-42a0-a459-43c867d6e206	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	7eb2852b-3937-4a06-a190-7d428303b437	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
75313f5e-f355-496f-b0bf-750e22ffbd88	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	cc1452db-ad6f-4254-b877-95de58e50702	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f7676eab-f21e-4e16-92ee-368d1448db5c	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	ea4e409b-a764-4315-a4d2-d3c0371780ed	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
964e87c5-0efa-44d1-acf0-e84adb6e271a	fb958e6e-1940-4631-9f05-f62028159987	0c166f51-2343-47c6-8287-ab51c74a3e43	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5e2bab9d-29c8-46fa-aa79-ad459835d928	fb958e6e-1940-4631-9f05-f62028159987	125669b3-1019-4dfb-b968-4774d6d73def	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3fc1bfcb-2c41-4e71-b2fc-4efbbe4f0eef	fb958e6e-1940-4631-9f05-f62028159987	708eccaf-a519-4c8e-ad83-d3b50ab1c272	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
210ba78c-f0de-4e26-a7bf-ed3646a2a485	15553f08-c40c-4fd8-a166-4194e9075710	d3fe6c18-0647-4efb-854e-d27a751598b8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
31ea26d5-61ae-4072-98df-fa31cfc7cfc0	15553f08-c40c-4fd8-a166-4194e9075710	ad91764a-059f-4891-8f2b-c7275e591efe	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e4c4bbc9-298d-4c41-b6a3-f7e045c03f8a	15553f08-c40c-4fd8-a166-4194e9075710	166ec740-4de4-406b-93ea-523dfb12ecbf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4e9f8089-7f7f-4556-b174-b76b632be433	20f4be9a-51ee-4756-9a64-79ded422babf	a5ab32f5-6e5c-4590-b9fc-8f8e0aceed49	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3a65fe58-c3c3-4bcf-a20e-aec5b81158b8	20f4be9a-51ee-4756-9a64-79ded422babf	37bae881-2659-4172-a37c-cf210412a63f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f15a2688-66a8-4401-845f-86946b95d231	20f4be9a-51ee-4756-9a64-79ded422babf	9b4be026-0359-4dc7-b5cc-091b60cf552d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5b528cbf-64c1-4805-8da1-acdbbefba4b5	8034090e-58ec-4514-8d62-82443952fc15	68ce2ea4-0347-43c6-8d36-6e67d1d2aef7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
75a80a2d-b635-49e2-90fd-ecc9c7132782	8034090e-58ec-4514-8d62-82443952fc15	abd7982e-9c74-4be1-9bbc-95e8f7566d1e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a1d9cd2d-0f6c-4199-b911-dc82a54e2b43	8034090e-58ec-4514-8d62-82443952fc15	d2dd0efd-97b0-4d80-acda-f86ceca5eda5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
86751033-2312-4d30-a4b5-9ed2846f651d	e6088ba1-617f-4822-adf8-97b3d2768da4	bfe6fb03-1247-4766-91dd-32b60fe818e3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6d6432d5-9d29-467d-bb8e-e1566a28e632	e6088ba1-617f-4822-adf8-97b3d2768da4	8732b7bd-9cbd-4e6e-ad02-387848cdac80	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5cbdfd84-d88c-4295-b999-48eba927c878	e6088ba1-617f-4822-adf8-97b3d2768da4	bdfbb3fb-1ad9-45bd-bd08-7fe6116d5a4a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ee26a13a-6f96-493a-9f13-e1bcc8b04da1	1bc47f29-3bd9-4148-9a23-03bb30709767	642dfbd2-f799-43d4-a2ec-7c87e2bdebb8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
64831c20-5f49-4141-bc93-443126e71995	1bc47f29-3bd9-4148-9a23-03bb30709767	92505733-3a77-445c-9ba5-73a8c5ae64db	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dd277560-061f-437c-8168-bff39ee04817	1bc47f29-3bd9-4148-9a23-03bb30709767	66638541-a6f9-40df-94f2-55051caf02c8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
19a72bc6-f367-4faf-a60e-c13e6283642f	2f8c8b6e-15d2-4b93-921a-7a56783b1152	86bc791f-a41c-4517-abd8-6fc2a91aa81d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e104e0e0-b4c5-4ff6-a6dc-9530b4cd629d	2f8c8b6e-15d2-4b93-921a-7a56783b1152	9ac3d3f0-64ad-43f0-8c99-6dd4ff9d895d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f2fb3bdc-f509-49e9-9c75-dfdfc6995c8d	2f8c8b6e-15d2-4b93-921a-7a56783b1152	5c7bb9a6-61ae-4ed2-a947-1fb9214be86d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
231e6e2e-8d7b-402d-9242-b859eb9abcc9	ec28cc53-46cd-4045-b86f-f6275b30ddb2	08a1c3b3-2d2b-4277-84cd-0b76642bda45	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5324f6ac-4dd1-4145-9086-6e5365f3e340	ec28cc53-46cd-4045-b86f-f6275b30ddb2	91a865ac-90e8-48d2-98fc-cad68c59c991	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eb5c5571-aa92-4ba7-a658-06ac09910cda	ec28cc53-46cd-4045-b86f-f6275b30ddb2	c4de2aca-688b-4348-bca6-cc3ed4086503	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
86f53e76-0839-455d-a8b0-2d982c9b0e82	0b92632c-950d-438d-bc32-27876a5e0583	2f268dce-b388-4fc8-9999-513383bc3758	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
de066e15-d0e0-41dd-9ce9-a3d0de2fb34d	0b92632c-950d-438d-bc32-27876a5e0583	54c3a583-07f3-48a7-9aab-36d1ee388c10	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9b912bb5-1830-416c-9739-4f332ed13f6b	0b92632c-950d-438d-bc32-27876a5e0583	9861662c-3172-48d4-bf0e-c987f41330d3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8a7461a8-b182-42f2-b5ae-e527685b76c2	0b47c2a7-881c-4371-a1b5-a4f61cf581da	6b881cd9-fce7-4f34-a37c-f56268ded6af	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6e886742-7663-4e00-9b43-6d5dcf6cd001	0b47c2a7-881c-4371-a1b5-a4f61cf581da	9507d442-11c3-4624-a4b5-025ebeb084bb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7bd8df3c-919b-4455-b63d-92e5231314f4	0b47c2a7-881c-4371-a1b5-a4f61cf581da	b0712ebe-b9ef-4b4a-9dd7-3fe0d0d17047	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5d5be33c-431c-469d-a6cc-606885a2d8dd	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	9b78ffc9-450b-40d3-b8cc-b992bf5960a5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0b73f8da-6905-4ac7-87d7-48fab9bdb804	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	533c6be1-1aaf-45b3-a5a2-f8b48b452c7b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5e5fb297-daec-41d7-bb7d-0479f9001a71	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	eeee42bc-77c4-4f62-99d2-bec19763e36e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
47b0d801-8ddb-4ec7-97e9-2b20efd54c6b	0fd5d982-5b25-445c-a0d9-2e085919bf83	0781ba79-c868-4794-bbb8-d47ee6f41b97	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
97cc001c-abb0-4ecf-8358-5be2fc3813f4	0fd5d982-5b25-445c-a0d9-2e085919bf83	3e5dd240-9da0-4a95-ab43-4ba4c29b0044	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
258269ee-2693-4e54-b531-2891f0b52982	0fd5d982-5b25-445c-a0d9-2e085919bf83	27982501-c638-4727-8752-1c8036f2eea9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3b6c3e48-dda6-40e6-999a-f52e22fa73d5	ca089290-93aa-4fd2-ab79-7b77e9c040cc	fcaafe54-ade0-438b-83b8-240d7129032f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
02843103-1df6-46a1-bde9-caf1586c6379	ca089290-93aa-4fd2-ab79-7b77e9c040cc	ad471a0f-94fd-4f28-bcca-f562f254a200	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
42481ef9-89df-481a-b13d-cb9a12ba0e74	ca089290-93aa-4fd2-ab79-7b77e9c040cc	03d447d9-e9f9-4e36-8597-21b4e400c101	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6859173e-319e-477d-b9a3-d12100af3d67	24f725b1-37dc-405d-94ab-21acf34aba16	f3121305-f974-4501-b9f1-634ee7f83394	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c3f82633-a7f2-42b6-9791-d53b928616f4	24f725b1-37dc-405d-94ab-21acf34aba16	737d99f5-17e2-425b-88da-22a2fbc65419	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a7123f92-ba9f-4ff1-9d95-db7afc8aa290	24f725b1-37dc-405d-94ab-21acf34aba16	4a032d8a-c15f-4956-956c-71bf2196d6b3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3194c481-234e-40da-bb75-1712658ce0b9	209d0031-641f-483a-9b3f-f5b81b56edb9	46c1f7f4-4d63-47f9-8941-681558f432ef	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
75a33a52-9b29-476d-845c-b71fc572e02a	209d0031-641f-483a-9b3f-f5b81b56edb9	2f99fcea-fa59-452a-b1a9-f3fa096b2b06	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
166167da-e3d8-48d8-b4b4-ee584d5e38da	209d0031-641f-483a-9b3f-f5b81b56edb9	ac7c7693-159e-4c5e-a29c-e21e54f92030	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
148caa2a-0a30-4188-aa41-53709a163d95	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	7dd51903-52ad-493f-a657-762f419ac983	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
30123c3c-2607-4885-8f86-3ac0ed6988d3	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	41986b0f-9391-4a9b-88e2-9867879c1572	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
010d2da1-9526-495d-9cbf-d2c43cb586db	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	aefb9dcb-998d-46dd-a9ab-04e37abdbb85	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7c149c4e-01db-44de-8ac0-364d6cea1388	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	fbff7b30-9ddb-4397-98a1-09c1249c95e6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
42d33aba-6b45-4a98-8bb8-6927d271d020	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	78e77b99-f1fd-488e-b3ce-a8e62ca67eb2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
165b8c14-055f-4d46-9c09-26b189bf19ca	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	b80f4aaf-9b1c-4132-bce6-918f929c72eb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b24c3e72-aab7-4bac-a943-46810e724566	e21c17a0-331b-4c9c-ad7f-db1e3242b916	d1c4efe6-3be2-4535-8da2-1abaeeb8a0ad	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fb4580fa-a1b6-4975-afb4-37a86edc46d9	e21c17a0-331b-4c9c-ad7f-db1e3242b916	a13def75-73b7-4f78-b48a-9d356b06e872	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d900a2ac-e51c-4e13-a70b-24c0c9cf0cec	e21c17a0-331b-4c9c-ad7f-db1e3242b916	25b376ca-0199-40fe-9c15-f4003b264800	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d8e7f068-af8e-4829-83e1-7b1827745b0f	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	8aaa13f5-abb6-42df-9965-6d49c19393c5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
38097e39-813e-4674-af0e-7d5ac92a6b6a	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	19ce927d-697b-4333-a519-9eac1b7cd417	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
467cdabf-75c4-416a-b24d-1e0a5278f564	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	8fce154c-e93f-4eaa-a904-2f0b431decc3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
92395cd4-b1eb-49b1-8561-cdf81a633836	038ba25e-adea-4aa2-9167-e955a0c2dbbc	a573160e-b5a5-4caa-abb0-23f73bc53ac2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a0402a3c-1351-4e9e-b7ca-7722728e40ca	038ba25e-adea-4aa2-9167-e955a0c2dbbc	48fedba5-6fe3-43dd-b7dc-aee2232a8c53	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4ffe8565-ddd3-4691-a668-d9fd9de140bb	038ba25e-adea-4aa2-9167-e955a0c2dbbc	11ccc70c-6235-44b9-a7c3-7c6938075dba	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
77be5642-4fd0-4c59-92ff-b4792f50b7af	f8358322-e61b-4018-b2ec-4ed99c30ab20	ab69c00f-2559-4397-872d-143a0252afac	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a4e6c4a7-a712-478f-850c-a7b9a5326c7d	f8358322-e61b-4018-b2ec-4ed99c30ab20	d512c752-2356-439b-b747-158f9aefd4fa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aa028c9d-e6f8-4692-a21c-88bdd7d364d1	f8358322-e61b-4018-b2ec-4ed99c30ab20	7ccbfe07-54b2-4fef-b081-d65d43ebb32f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
dfadfe0c-2df1-45a6-8488-dc2944631013	fd1f56db-0a26-4e9e-8703-433044728b1c	2fff22d9-7479-48fc-9707-364eef08bb92	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
474aebfa-77e3-48af-83a9-62a2cda29b2a	fd1f56db-0a26-4e9e-8703-433044728b1c	37419469-2e66-4787-a65e-e5ef7839a751	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
99b3bb05-ef05-400c-8caa-ebeee07d09f8	fd1f56db-0a26-4e9e-8703-433044728b1c	03b97d01-19f8-4cfa-9115-26ac17b5fca6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bd2d2093-6eb6-43a4-bc82-3551419b7f5e	327c9e42-c70f-4142-b85b-e7b7fd58a32f	4741f894-c8fa-4584-804c-f03855ae2cfd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
221cadfd-3151-4dcb-8421-9a49906f992b	327c9e42-c70f-4142-b85b-e7b7fd58a32f	14d991c7-d65b-4df0-82e4-b1786440125b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27aa2edc-42c6-49c2-b726-6551d9aa6e3b	327c9e42-c70f-4142-b85b-e7b7fd58a32f	a4aa8ed7-a8f3-4046-9c8e-df09f3cb6e4d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e93b4903-bd95-4850-8590-9613530cb953	af72522f-1085-4f94-ba11-206256972db1	145598bb-6a4c-4cf6-bdf3-7d7abf7c2bf4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f90ebc58-7035-4ea0-9f74-1007496593af	af72522f-1085-4f94-ba11-206256972db1	fd14f3c9-ceff-4b1c-a509-fd0f61c38776	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2f3387e1-c607-4cb1-b78f-1e634775acc9	af72522f-1085-4f94-ba11-206256972db1	598d7f98-93a6-4166-a13c-cdcfac3af5f4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4092c3b1-6b4d-4a6f-ae3b-d9f99ada455d	f00ab0e4-7352-4724-a5b6-9dcce9714156	20ec395c-0541-4656-914b-a80a5189bd6e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
371fd676-9b64-428d-b33e-7ec9425c75f6	f00ab0e4-7352-4724-a5b6-9dcce9714156	2d8b2836-28e6-43c6-b2d5-6972f2322107	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e062b9ed-f523-491b-a687-00b12f89d857	f00ab0e4-7352-4724-a5b6-9dcce9714156	ad007a8d-3e07-4606-901b-3543e75b214a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
27e22642-32a9-4700-b254-85bc0f1505b3	5a7c4378-e660-48ea-8550-2f2faee9958b	a4191763-3550-40e2-b1fc-175d34beb356	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
02dff9b0-e144-4465-a875-d583056af598	5a7c4378-e660-48ea-8550-2f2faee9958b	b9052c5f-b27c-4dc7-8079-d6fa96583ee3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8236b34c-5854-4535-b38e-6aaf3e785f47	5a7c4378-e660-48ea-8550-2f2faee9958b	6bd2ba7d-13c2-4424-8a61-f8836be033b7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8cf760a9-a255-46fa-b0f0-9176047fd61d	95a6f8ff-c74f-4a93-8475-a16c901900f7	1f2b5af3-4ca2-4551-ba31-16169c787d90	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fda7e46a-d50d-463f-a1ce-3885ae99264e	95a6f8ff-c74f-4a93-8475-a16c901900f7	d97161ab-596c-4408-8941-68fed7f76a41	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6380ce22-3db6-4dde-897f-9b0d4120cb0c	95a6f8ff-c74f-4a93-8475-a16c901900f7	ffcb5323-17a8-4c18-b6df-866450703ec4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ea134a9c-f5e3-4abc-831a-6754e5c807be	6bbe7394-f4b2-422c-b3de-24d5d3c28710	bdc3ebdd-a6dc-4851-af08-3b178e198b7c	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e65f4148-fd82-43b5-b490-e34735238410	6bbe7394-f4b2-422c-b3de-24d5d3c28710	b46a38a3-0ee3-4524-af5c-8815b418d71b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cbb892e1-54ea-4b19-af3b-b1fb069b0f28	6bbe7394-f4b2-422c-b3de-24d5d3c28710	41500a49-2b78-4022-ba91-6467059bb31f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
744c08b8-9293-4137-be0d-6aae4dcf520f	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	a11519f9-edf5-4916-ad51-805d14dd43ad	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3f7c409c-8f9c-4366-b922-c6b68c2de744	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	0dd4b71c-6ce0-437c-b2d2-02003f213bb4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
65f68206-be98-4092-9e6d-c9f3046fb257	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	8093031b-5fc0-4b82-ba20-28492a1bd07a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c66483eb-c9bd-412c-9f30-5cff47c39406	74771738-b03e-4746-a16e-a5577e605f98	bb919341-2040-4061-8222-f26abb5f5443	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1596fa1d-a2d4-4e4a-92f9-e8cf41f229cc	74771738-b03e-4746-a16e-a5577e605f98	3bbccce3-affe-418d-8e1d-0536fdc1faae	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
48a40eed-1941-4bf8-acd0-a4a22dfeae27	74771738-b03e-4746-a16e-a5577e605f98	4d800945-7c74-4d88-9edf-75c273e811e1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
77789590-43d2-4665-b50d-af3b5441c736	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	543d04b8-acec-4bfe-b8c3-f9613f9bf5d3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9cf67800-5527-4c7c-a260-073cb3f2618b	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	13e56844-4564-4354-9622-262051ff903d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
54952760-fea8-4b69-83fd-86929802098b	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	83d9f5aa-8e87-41aa-bb1f-f843a53de728	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9ab413d3-bcf4-4ff1-9ab7-79e710323152	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	40051fa7-d49a-4610-b18b-e8e9f15f66cd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d1f9fbd4-150b-4afb-ab72-6874e0fbf142	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	6a304a32-2ccc-4e82-ad51-d6419ac16a7d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e9faf135-9050-4d82-a946-b3a4699f3ca0	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	1b356126-d519-427d-a34a-bd3fca8ef0e5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
964ea042-0bbd-498d-9ae8-1c94cd203a14	842e3ac0-435e-4ffb-9070-79a13e1a63cb	aa8165ab-51e9-4fc5-b9d6-ba3c70f19eba	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5b43d44e-150b-4452-a0ff-9d078e000f7c	842e3ac0-435e-4ffb-9070-79a13e1a63cb	37263063-056b-42a6-bbd5-3e5a71163bbc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
85447472-d566-49f3-9c59-3e4a4aabf771	842e3ac0-435e-4ffb-9070-79a13e1a63cb	712394fc-dc3c-47a9-99d1-1e43d98025ec	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
28c66e37-4ee9-4bb1-a0cd-f234e1722d86	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	44bb451e-5f26-41a8-b650-02d594fc4c8f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5fc7e21b-174d-44d3-b6bf-d6eec1baee32	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	57efd67f-3fd9-45b3-8415-cae72e776164	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
15efdafc-675a-4f9f-a1ad-047726513140	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	338891cb-aed4-47bf-a312-7690b36ceed0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6294325a-6b19-4550-8ffe-23f88ad29b35	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	645d082d-da48-4aa0-8831-75fc8360824d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
39f15b4a-e9de-4939-8c5d-e96de972586d	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	38f6856b-2261-4664-bf4f-a6b973f38173	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
456284c5-2234-4f81-97b1-1ac4f01c0ba6	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	a6509db5-63c8-4fa9-bb26-7e992715851f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2e5c6451-1a1e-4c3f-865b-afee666d414c	306985d9-8ffb-4b62-9a71-cadf1d3ce599	3ecc3ab5-c50b-47f0-a2a3-dba79fdb98f3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
49b4c046-7513-43d8-b880-64ddaad7cc46	306985d9-8ffb-4b62-9a71-cadf1d3ce599	36c56f16-acf2-4468-a1d4-2ce4d67521fd	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0abec700-339d-49e4-bcb1-9939c1bd99f1	306985d9-8ffb-4b62-9a71-cadf1d3ce599	7918e05c-7fbd-4132-a183-9b194a3127c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c62bb7c3-2111-480b-a8e2-375fe0471045	23801d96-505a-4109-b5aa-aac795238315	ee334bc4-3078-414f-8c54-593010ccb054	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e17ee69a-558a-45ca-bbf0-42a8e92d0723	23801d96-505a-4109-b5aa-aac795238315	6a86b4b0-f6dc-40af-8065-619099e01b98	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bb92b34c-d2a1-49ea-950d-a0b71211c4d9	23801d96-505a-4109-b5aa-aac795238315	fbae4231-c2c4-4175-aa38-56c0163c75bc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
83d69e0a-ca92-4300-a659-941ca3e2f236	f35f005d-502a-47b6-b092-c568c4bf3f3b	3ee96e84-ba30-49b8-8a2a-3c4736641be4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e39dc34e-1344-4782-ad1f-2a88a270f2f0	f35f005d-502a-47b6-b092-c568c4bf3f3b	abc78e4a-f8d8-4cc2-9eb0-a3d06ffcdb20	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bc66d177-7790-4d7c-8971-abb1dba96f27	f35f005d-502a-47b6-b092-c568c4bf3f3b	62ceaf35-1d96-436d-a601-15a9cf77b8fa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b8c2dbdb-dee9-4efa-95f3-ea43fcc8bd4e	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	1b33bc30-ebc9-4865-bd02-366bf4769828	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
43a16bd1-52c0-4e90-8570-2648bcf7f7d5	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	dc185a67-c50a-4b87-9ded-9a42a03bf9f2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bef50972-ac7d-4024-8665-f86bf8dc2c9a	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	bdabac83-357c-4d26-9486-f0ef4f16387e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
98f49268-977e-4fe5-a1e9-b6678940069b	74f06a46-bbc3-4df9-a35b-bdc354055041	b12dd9f5-10b7-410a-a6c5-038a572ae6b2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f65f5a92-04a4-4940-8732-447fcf6fd700	74f06a46-bbc3-4df9-a35b-bdc354055041	6e34b94d-49da-4810-80bc-0096ecf33bae	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
8c3d771c-b876-427f-9b30-3263bd807d49	74f06a46-bbc3-4df9-a35b-bdc354055041	36578671-8f13-4b5c-af16-59dd544440ee	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b80df6ef-2aaa-4e96-a2ad-807a538461d1	9a621758-3d3e-425a-bf5f-db3123a27f24	71ba7325-9429-4b00-bd78-50b79d78ba9e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5f9d132d-015f-4a86-b950-9cb6956cd240	9a621758-3d3e-425a-bf5f-db3123a27f24	29a199a1-df67-4178-9634-5a0cfcc92438	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
92467abf-d243-41d6-b630-bb628edb2ff0	9a621758-3d3e-425a-bf5f-db3123a27f24	a5988ae0-9381-46ee-b356-3114f89fd1bc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eefb8d13-7b68-44c9-b647-202381055f29	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	8d18cfdc-7ba5-42a7-bdac-629fe9f95b5e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e9ab1aef-1e4e-4274-b772-c7fbc4372665	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	edda996f-f59a-4d7a-9388-71367d447a4a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
1fd83b6f-d37c-4e95-b9cf-fe21072c6e2a	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	8fbafc81-c66e-4dad-b5c2-735e2257c0ad	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
201ad84e-3b82-42ba-b90f-7d0ce3c194c7	1f102a6a-c86a-431b-8311-061a8e9f18a5	4f5453c6-7727-4bb9-b982-f779b2a5db73	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
77e24228-2342-42d7-aabe-6aa2d311ac40	1f102a6a-c86a-431b-8311-061a8e9f18a5	11715489-84a1-415c-8376-3bc0c40defca	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fa6b8d13-0921-43d9-adcb-508641f64b26	1f102a6a-c86a-431b-8311-061a8e9f18a5	1c0f4864-e5fd-4bff-87ae-4d04f65594f9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7dbc6d4f-95f9-4d47-a0d5-0dfae370fcc0	7fd8fd00-5741-458f-9b45-76abc54dd4a5	09abdd17-d273-45ca-a4bd-5514bdbafa45	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
342f0efa-cd87-42ca-bbb0-a76908d26c22	7fd8fd00-5741-458f-9b45-76abc54dd4a5	6052b52b-3fcb-47c5-a1ff-5b6ef764263b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
58975f33-bdd9-4b80-9f6f-486b03632d29	7fd8fd00-5741-458f-9b45-76abc54dd4a5	f734bf8c-f2c4-44fb-af1f-abd985ec83df	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
47278345-e147-4d28-8024-7eac2ba72a02	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	55310721-3f21-4dd1-ae22-f84a4c601e65	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2f7f87e7-5c34-42bf-8e0a-78f1331dbd7f	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	10739927-2bb0-4e97-8d77-23f64d1154be	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a4a8757d-c3a5-434b-8b57-59828ae99986	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	9ef2142d-b5c1-49f1-aebd-a35918519544	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cb48fb69-a169-4cad-adf3-5da9340e5cfe	877c698f-6385-4e69-a47b-0313fe652351	08471bd0-b64c-4b04-a2e6-dcac46b8502e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e3a16a5d-3ba8-4c05-b010-4059180c0f5a	877c698f-6385-4e69-a47b-0313fe652351	8e6762e2-b321-4130-9a6e-85fb7ae43aa3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
69cde977-7902-4227-89bf-621b3f895b44	877c698f-6385-4e69-a47b-0313fe652351	15ff5837-ad5e-4221-b35d-0dc0f8087909	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4eb149c9-67ea-47a0-aa65-e0088d4ec071	32280cdb-f1a5-4c78-bdfe-0a63755583d4	0e0afcdc-278b-4a67-bfed-bfb514d2a726	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
57603dbd-4281-481b-b997-dcb24f1fb4a4	32280cdb-f1a5-4c78-bdfe-0a63755583d4	2dc91ab3-e591-4ee2-8dd2-3383a1e6c5f5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7369893f-5690-4d20-8974-50fe9e3686d9	32280cdb-f1a5-4c78-bdfe-0a63755583d4	5d7a6c52-b818-4403-b94f-fdd2c2df0a59	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fa27ad50-71d7-471d-8bfd-b1d5c10447d9	f91d7284-2e9b-4de7-8f49-003bcace14a7	3d6c8574-55f1-47ad-a4fb-76d14d6a486d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
da488164-6ef0-46f4-ad76-c3b7fa3cdabb	f91d7284-2e9b-4de7-8f49-003bcace14a7	7d62fdc7-74ec-46b6-8135-286a21998e1a	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aea83328-1c92-4060-8a25-5593976e759d	f91d7284-2e9b-4de7-8f49-003bcace14a7	7e7eab23-951d-4595-a2a7-5c6473269ed9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6b18f528-5b5f-44d8-8e8f-655cd3ddd64f	662ef73f-78a7-4f64-8994-df72da082c28	721e80e0-2968-461f-975f-31f71cf10578	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
285196e2-f6fe-4c78-b172-67e85f3b65c7	662ef73f-78a7-4f64-8994-df72da082c28	e481b74a-b56d-4105-8570-25893fd0edc3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e07067a9-9084-40b8-b298-4a38792f6d69	662ef73f-78a7-4f64-8994-df72da082c28	81ef5fb4-d94e-41fd-baf2-0500e52b59c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6ad00e9d-ad33-48d2-bf02-7caaa13fbfe9	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	50021465-9329-4509-b00f-50b9e1606fc9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
199c3004-ec8f-489c-8683-76f24d992019	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	fa671892-a9db-43ea-b713-bac34e45e3fc	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c28cf7b2-0e53-4840-8ca4-4652dc156770	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	20460f9c-ad32-4cde-8cbd-6e8e41372176	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d2d6a991-9c34-4359-9673-1a7118e6e3e9	bca4baf7-e4dc-4dff-928b-f214ac8800fd	ed480b31-4d4b-4b90-8693-b5d5764e09a8	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ca954681-53a2-489b-a3d8-229d84cbbf39	bca4baf7-e4dc-4dff-928b-f214ac8800fd	60d5d711-91c8-4efd-a198-7bf61c940168	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
de60fa3d-9913-450c-97b8-95eaf63edf69	bca4baf7-e4dc-4dff-928b-f214ac8800fd	b5162fbf-c2a3-4ccf-9b76-e2f4cdffdd54	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
0e4b2497-beb4-4a73-96e8-6f933164c77d	b7473554-6287-40b5-90fa-9df6187953f3	7bf7de3f-89ea-449a-aeb5-8501ad23436e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7c3844ee-2bab-467f-bf18-d585a5ffbb15	b7473554-6287-40b5-90fa-9df6187953f3	d604c7d7-2108-4057-90c1-238aa9861d22	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2c62ad77-f5e9-4339-9841-efd961a0628d	b7473554-6287-40b5-90fa-9df6187953f3	3a28e707-e405-46f6-bc31-5546cdc41625	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f3311765-e38e-40df-977e-b0e1b096e0ac	e328201a-b076-4887-9927-3ed32d89da3c	ff054ae9-1ee5-45a1-8ab8-53c2127ab3c0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
50682969-545a-4f1a-b51b-80cb38dc84d5	e328201a-b076-4887-9927-3ed32d89da3c	eddb7545-9309-485e-89e0-ba6c4698cf09	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2e69a153-2bff-4bf4-8354-d1a968ca9b8c	e328201a-b076-4887-9927-3ed32d89da3c	a7791cb2-7d91-43b9-940e-3b713b69be12	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
35cb8e91-3356-4d23-9cbc-71800dd1f82f	8e7dbd83-b333-4569-8ec7-0bced577036a	f54bba97-fb5e-47f5-8932-e410ac8edcb5	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bab5ef2d-75fe-4bc5-bb17-ae7e4d16e07d	8e7dbd83-b333-4569-8ec7-0bced577036a	c00a9875-620d-4fdc-87f3-9f9f635d9b16	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
114b7f6c-9c07-47c4-af31-68e44b625882	8e7dbd83-b333-4569-8ec7-0bced577036a	e9f18100-0d46-421d-bfd7-23e6b7ca4ad2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
970b673a-0e0c-4d5a-8ac4-2f28fbdbccbb	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	fc4078fe-caaa-4a90-9646-81cc8624bb68	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ed71b5bf-9675-4294-9778-168568379f1d	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	16578750-6119-476a-b99e-5956002b9fb9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
983d1516-f8d6-48a1-a4ad-5e1062cc8e5e	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	07e3bee4-a32f-4b86-8491-3393f77c946b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
158ed3f9-68f6-4680-9341-d76e973c8027	7b85426f-e196-49f4-8354-d934e832a2ec	422bb2ba-dfb0-49b8-b897-2bf193c87069	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
26dc21d7-9ea5-4959-a993-e27eb209ecc0	7b85426f-e196-49f4-8354-d934e832a2ec	6a76f4fa-f40b-4ec8-bf00-be26ff00e6c4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
aa36f2c7-4045-49a9-ba84-8f11772d3bd2	7b85426f-e196-49f4-8354-d934e832a2ec	3033002a-bedd-4c68-a23f-45d559544020	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c0a40186-2796-482d-8962-b0fa3fea00cd	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	40ee8061-6415-400a-b2f9-69672ef6bac0	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2a9a4e3f-c8bc-4642-93bb-bc0319182690	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	8ecc5570-d705-47c3-9cc7-58572f502dee	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5126ba92-7faf-4eb3-b873-d514758f6b01	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	2b2dcba8-0dc1-465c-9407-e4101ff970f7	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4aa09e27-dd52-4592-80a9-b5cf56bdb9b6	127f37c8-72be-40df-9ae2-8fd333586096	e397d107-9011-46ab-a5a8-51403e18702e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
cb442808-7bdc-403d-aa9e-0cdbea086793	127f37c8-72be-40df-9ae2-8fd333586096	5db5f412-cedf-4f84-99d4-883e6c7c4a83	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4865fc36-4e37-4b91-af59-8f4dd3405b45	127f37c8-72be-40df-9ae2-8fd333586096	1bfcb70d-609c-406c-bac9-ad7b6b8dc789	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5896f981-74e1-4e93-8daa-bcfc9c21cea1	342d937e-95f0-469b-9c44-db23c035fc8c	bdb234ea-e276-4e5f-b5d3-4b45ebb64b47	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
32f56c23-131b-4a02-a806-a84555ff214a	342d937e-95f0-469b-9c44-db23c035fc8c	14fa0d4c-c5c8-4283-aa0b-3a043ea86dc4	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5a92e1aa-f881-445c-8a97-69e967272ab5	342d937e-95f0-469b-9c44-db23c035fc8c	10abd424-d8c1-44ee-a540-e760a44e668d	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
18a47c17-bf01-4777-857f-9b9e173ecf56	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	34fdf525-a5b1-4886-8228-e2c117efdb68	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
3c6fdbbe-56c4-4d11-896e-3b8fda57cc76	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	f52babd4-df11-4de7-aa56-25c0a98944aa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5909bb49-0737-4972-bc70-84b322f54d25	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	c6267002-7120-4659-9c19-3d920862d36b	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
9827100b-d27c-4307-9b96-6330697006b7	db074475-2bdc-44a6-88cb-3f24570f0974	f1f2ab00-8e3d-4dbe-9b11-52ed4b202fe6	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f2935fed-d1cc-43a0-b1aa-3649260fa982	db074475-2bdc-44a6-88cb-3f24570f0974	be0db896-3395-4c36-8c9d-5e6754d85cbb	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2164891f-278e-4957-a376-46650a0e2a6f	db074475-2bdc-44a6-88cb-3f24570f0974	9eb2a6e6-67e4-4278-9911-6e04ff546538	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4210da0e-ed9b-4b50-902b-2542a5a014e7	8697cd07-9cfc-4ad3-b66a-e726b205592b	f982af15-0b42-4249-8e69-dcc6057a94d3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
95211ff3-e86a-4b33-9a36-effd6d38319e	8697cd07-9cfc-4ad3-b66a-e726b205592b	6f13dcaf-c97f-494d-81dc-75e11254ad37	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
977e42fb-ddcc-4918-ac5b-7cb64362333f	8697cd07-9cfc-4ad3-b66a-e726b205592b	63aaa4f5-6e28-4372-96af-c8ad9d14072e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
94216d79-53b0-45eb-89f0-f0cd27ad6a2b	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	83434acd-4797-4f46-8954-c60b0b547ef2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
7e25aa1c-79c8-49bb-bd94-1c933c11bf39	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	a8c7f5e2-1604-41da-ad98-8dba6dee86f3	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
abcacd34-cd2f-492a-b935-2519c4fab994	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	3f2f0106-8df2-45b3-8ce9-d0d88d9e2d24	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c9c7dff3-9ab0-4fa9-868d-a08a1601a34b	cb51dfe2-adb2-42d2-970a-abbc99990bfa	7bb4b64c-e006-409d-979d-2261046c67a1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
eb83b0a8-baf6-4d9a-aac9-058245611f61	cb51dfe2-adb2-42d2-970a-abbc99990bfa	f627e158-bd37-4a73-8576-80034d726b46	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
15d4b722-5a47-4c17-a703-ec66ae02ee7a	cb51dfe2-adb2-42d2-970a-abbc99990bfa	774e1e33-1e8f-4066-9d35-9a82e36d9258	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d908466e-698b-4bf7-83b5-e8a552fc7f09	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	a1823de5-341e-441a-8504-057f0b58277e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
207c61bc-19c6-4129-aeed-a13adb740af1	19258c51-5210-4598-bb62-e829f84f09b0	9e6c1917-75c6-4d45-ab51-5a9dc1de63c1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
81f54736-21a9-4939-8e7e-5595094c6872	19258c51-5210-4598-bb62-e829f84f09b0	de779436-5a89-4903-af32-a50a4f5439cf	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
ca997560-a60d-4568-9476-1ec9acab799b	19258c51-5210-4598-bb62-e829f84f09b0	6100a5b8-96a1-4598-9cf8-a6ece0e5fa89	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
2094b84f-db03-4e74-852b-3e3842edacbe	e4531865-1bac-491c-8bca-1f2e1ac0f045	fed29ba2-43e8-4c25-8087-77562f1a6fd2	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
6eb80044-6b3b-4ea4-a6e8-168ec07ca6d6	e4531865-1bac-491c-8bca-1f2e1ac0f045	19041c52-d471-4620-a3ec-099931fe7f02	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
5524fc7a-ec6b-4b1e-950e-6baa336d5108	e4531865-1bac-491c-8bca-1f2e1ac0f045	7e0d8830-d18e-4d2c-957b-65b141c19c4f	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
f7a93810-4878-4f78-bc73-c0ba783ef3cc	a1cdcec6-1029-41e3-be91-786a73345bb6	e7c49e6f-e4a2-4f4e-9b82-387d76be256e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
a3f97bc3-bd0b-45b7-9c97-aba23bb107e6	a1cdcec6-1029-41e3-be91-786a73345bb6	ef34d894-db33-47ba-87f4-7b4b8f2f1051	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
fcd98a99-8ba2-4114-b79d-0871c40d331d	a1cdcec6-1029-41e3-be91-786a73345bb6	6716cfa6-2280-43d8-a5dc-8eec28424924	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c6ca714f-986d-450e-96c5-a93b85323ecc	e337df00-b9dd-4967-a845-0096a76ad289	321e242d-5865-4d3a-8b37-3e8dabb39dc1	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
832fbb2b-8b5f-486c-b7e0-1c9055c6c943	e337df00-b9dd-4967-a845-0096a76ad289	7a79c22a-6bc7-4d2f-aeac-3dbc27709b50	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
346f1dfa-7c2c-4028-9a0c-a539086ef9ed	e337df00-b9dd-4967-a845-0096a76ad289	3b8baf18-5277-4b33-b7c9-2b87a3afc6fa	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
bdaa9396-875a-4b4e-a870-044040b6662e	2a473ea8-80a8-4e61-b9d4-90934b86b7af	84abf345-9539-4dca-80ec-3cb378ca1662	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
506a14a3-378a-4a9a-9447-a0d675957f65	2a473ea8-80a8-4e61-b9d4-90934b86b7af	d67621e2-993f-4384-b59e-a68959ba8195	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4b02171e-2836-4609-928e-2e104a08c6d4	2a473ea8-80a8-4e61-b9d4-90934b86b7af	6259cdd7-df4b-46c2-bd89-6361064d07df	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
66448089-8c89-4799-92f2-cc4c27afeab9	56e35a49-ecda-4caa-b0fd-415b90d4da83	87f62b15-cd1d-4f07-88d6-58f96c1d11d9	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e25ae7ca-6530-4855-a4cc-40fa467cc371	56e35a49-ecda-4caa-b0fd-415b90d4da83	1c33a522-5573-476f-afa0-04d07d91cb15	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
67d140c5-e892-42b8-8517-56be3cad2767	56e35a49-ecda-4caa-b0fd-415b90d4da83	d47f41d5-e3a7-4171-b8ee-755f93162e6e	0	10	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
21437f30-9a6e-4652-a6e9-e6e65a831f9f	f5fee43d-13f3-43bb-8508-b08bda80dd2c	f1387879-401a-474b-bd05-baf4e2c414c7	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
d86b576e-156d-4d74-8522-79ca4c8de95a	767bc26f-f467-4b3f-9e70-f66c29c51718	77a3d07a-bb60-4838-a2fb-f34aa09b8922	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
c609443f-420a-4ad8-9649-26a4a989914e	ec08e506-0d25-4292-933a-7e77d056197c	7fb2893b-ecfb-467a-b840-a6e562127914	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
e20da711-f38c-4f7d-b63a-ebc72dca331e	7f1cb136-a5b1-4306-9704-62588862fbc2	f1f9d58c-7119-46a4-95cf-bf932be78433	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
716cd700-2142-4ad0-b2a8-d87afe2634cc	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	129725a9-6c5b-4c54-a03b-09aadb7f50ae	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
4cc338b3-ed9f-4b96-bc23-a269c6d2fd69	5ff2b307-6c42-4108-926a-6e6fa1fac47b	619c6077-c290-432d-b999-1590a1a01c3f	10	20	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
b7f7e9c1-7831-4b92-b9aa-6d0ae6fa1e75	f5fee43d-13f3-43bb-8508-b08bda80dd2c	0d334db1-57c7-427e-a4d2-8ff031422ea4	20	30	10	إضافة 10 حبات لكل المنتجات والأحجام	المدير	2026-07-04 17:13:27.603
\.


--
-- Data for Name: LoginAttempt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LoginAttempt" (id, ip_address, username, user_type, success, "employeeId", created_at) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, sku, slug, name_ar, name_en, inspired_by, main_category, gender, season, fragrance_family_raw, short_description_ar, short_description_en, long_description_ar, long_description_en, keywords_ar, image_filename, needs_image, visible_on_website, featured_on_frontend, low_stock_threshold, notes_top, notes_heart, notes_base, notes, research_confidence, needs_review, source_excel_row, created_at, updated_at, category_slug, season_slug, has_image, image_url, ready_for_storefront, visible, featured, fragrance_family, keywords, short_description, image_name, "categoryId") FROM stdin;
0489881e-3909-4d95-9a70-56f03ca9d2b8	DHB-0004	عود-ملكي-dhb-0004-a37209	عود ملكي	\N	Custom / House Blend	عود	مكس	شتوي			\N	\N	\N			t	t	f	5	\N	\N	\N	مثال على منتج بسعر خاص.	medium	f	\N	2026-07-04 15:48:36.153	2026-07-04 15:48:36.153	oud	winter	f	\N	f	f	f	عود، شرقي، عنبر	عود ملكي، عود، شرقي، مكس، فخم، عنبر، ثبات عالي، فوحان عالي، كل المواسم، دهب	عطر شرقي فاخر وثابت يجسد فخامة العود الملكي الممزوج بملامح دافئة من العنبر والتوابل الشرقية.	missing	228f3cb7-dc13-4e52-b54c-2ff4c4d57027
d5dbc3ff-685f-4366-a30b-867a527e8a15	DHB-0008	ارماني-كود-dhb-0008-24f897	ارماني كود	\N	Giorgio Armani Armani Code for Women	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.153	2026-07-04 21:09:55.849	women	both	t	/products/DHB-0008.webp	t	t	f	زهري، حمضي، فانيلا	ارماني كود، armani code، جورجيو ارماني، giorgio armani، نسائي، زهر البرتقال، عسل، فانيلا، حمضي، كل المواسم	عطر نسائي حسي وجذاب يجمع بين انتعاش زهر البرتقال وحلاوة العسل وقاعدة دافئة من الفانيلا.	DHB-0008.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3d2d1d5a-f214-4e54-a12c-d80ed46656f2	DHB-0011	اسكيب-dhb-0011-9e8586	اسكيب	\N	Calvin Klein Escape for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.153	2026-07-04 21:09:57.075	women	summer	t	/products/DHB-0011.webp	t	t	f	فواكه، زهري، بحري	اسكيب، escape، كالفن كلاين، calvin klein، نسائي، فواكه، زهري، كلاسيكي، بحري، كل المواسم	عطر نسائي كلاسيكي منعش يمزج بين عبير الفواكه الاستوائية والبابونج مع نفحات بحرية هادئة.	DHB-0011.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
767bc26f-f467-4b3f-9e70-f66c29c51718	DHB-0009	الور-شانيل-dhb-0009-1ed7df	الور شانيل	\N	Chanel Allure for Women	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.153	2026-07-04 21:09:58.312	women	both	t	/products/DHB-0009.webp	t	t	f	زهري، فواكه، بودري	الور شانيل، allure، شانيل، chanel، نسائي، زهري، فواكه، بودري، فخم، كلاسيك، كل المواسم	عطر نسائي راقي يتميز بتوليفة زهرية فاكهية غنية بعبير الياسمين والدراق وقاعدة بودرية دافئة.	DHB-0009.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4e5bc6ad-152d-4fc8-9513-270f4d1de52f	DHB-0007	اتيرنتي-dhb-0007-0664d8	اتيرنتي	\N	Calvin Klein Eternity for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.153	2026-07-04 21:09:59.616	women	summer	t	/products/DHB-0007.webp	t	t	f	زهري، منعش، أخضر	اتيرنتي، eternity، كالفن كلاين، calvin klein، نسائي، زهري، كلاسيكي، أخضر، منعش، كل المواسم	عطر نسائي كلاسيكي يفيض بالانتعاش والنقاء عبر باقة غنية من الزهور البيضاء واللمسات الخشبية المنعشة.	DHB-0007.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c6d45800-9bae-46ef-8800-343114afa08a	DHB-0002	سوفاج-dhb-0002-58ef5c	سوفاج	\N	Dior Sauvage	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.152	2026-07-04 21:10:00.84	men	summer	t	/products/DHB-0002.webp	t	t	f	أروماتك، حمضي، خشبي	سوفاج، sauvage، ديور، dior، رجالي، منعش، حمضي، خشبي، أمبروكسان، صيفي، فواح، قوي	عطر رجالي فواح ومنعش بنفحات أروماتيكية وحمضية جذابة مع طابع خشبي فاخر.	DHB-0002.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	DHB-0010	ادكت-ديور-dhb-0010-9b7b7a	ادكت ديور	\N	Dior Addict Eau de Parfum	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.154	2026-07-04 21:10:02.061	women	winter	t	/products/DHB-0010.webp	t	t	f	فانيلا، زهري، دافئ	ادكت ديور، dior addict، ديور، dior، نسائي، فانيلا، ياسمين، دافئ، حلو، شتوي، فخم	عطر نسائي دافئ وساحر ينبض بعبير زهور ملكة الليل والياسمين مع قاعدة شرقية مكثفة من الفانيلا.	DHB-0010.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d714c24f-a3cd-4109-b043-bb08f5cc0438	DHB-0005	الين-dhb-0005-ed9d86	الين	\N	Thierry Mugler Alien	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.153	2026-07-04 21:10:03.283	women	both	t	/products/DHB-0005.webp	t	t	f	زهري، خشبي، عنبر	الين، alien، تيري موغلر، mugler، نسائي، ياسمين، عنبر، خشبي، فخم، كل المواسم	عطر نسائي غامض وجذاب يرتكز على عبير الياسمين الساحر مع دفء العنبر واللمسات الخشبية الفاخرة.	DHB-0005.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b58cd811-68c3-46c6-b60e-c2cefb6b167c	DHB-0006	الومبيا-dhb-0006-ceb73e	الومبيا	\N	Paco Rabanne Olympea	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.154	2026-07-04 21:10:04.513	women	summer	t	/products/DHB-0006.webp	t	t	f	فانيلا، منعش، زهري	الومبيا، olympea، باكو رابان، paco rabanne، نسائي، فانيلا، منعش، مالح، صيفي، كل المواسم	عطر نسائي أنيق يجسد الأنوثة بنفحات الفانيلا الدافئة الممزوجة بانتعاش الياسمين المائي والزنجبيل.	DHB-0006.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
dd67cb78-da62-470d-8f29-c594b909f7a5	DHB-0017	ان-وايت-dhb-0017-a4db0f	ان وايت	\N	Elie Saab Le Parfum in White	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.061	2026-07-04 21:10:05.737	women	summer	t	/products/DHB-0017.webp	t	t	f	زهري، فواكه، مسك	ان وايت، in white، الي صعب، elie saab، نسائي، زهر البرتقال، ياسمين، مسك، فخم، كل المواسم	عطر نسائي مشرق وجذاب يفتتح بعبير زهر البرتقال والياسمين مع لمسة منعشة من التوت الأحمر وقاعدة مسكية فاخرة.	DHB-0017.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
73d4130e-1c54-4d63-8249-4f129c97cd90	DHB-0026	اسكادا-تاج-dhb-0026-feb65f	اسكادا تاج	\N	Escada Taj Sunset	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.085	2026-07-04 21:10:08.195	women	summer	t	/products/DHB-0026.webp	t	t	f	فواكه، حلو، حمضي	اسكادا تاج، taj sunset، اسكادا، escada، نسائي، فواكه، مانجو، استوائي، حلو، صيفي، منعش	عطر نسائي استوائي منعش يفوح برائحة المانجو الناضجة وجوز الهند والدراق مع قاعدة دافئة من المسك وخشب الصندل.	DHB-0026.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
fe518ee8-0974-4ce9-ab7c-2a2d259195b3	DHB-0037	برادوكس-إنتنس-dhb-0037-dd819e	برادوكس إنتنس	\N	Prada Paradoxe Intense	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:10:09.66	women	winter	t	/products/DHB-0037.webp	t	t	f	زهري، حلو، دافئ	برادوكس إنتنس، prada paradoxe intense، برادا، prada، نسائي، ياسمين، فانيلا، عنبر، دافئ، قوي	عطر نسائي عميق ومكثف يتميز بنفحات ياسمين غنية مع قاعدة دافئة من العنبر وطحلب البلوط وحلاوة الفانيلا المركزة.	DHB-0037.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
84f5ce1a-63c0-47a5-8b82-90022e5dadb9	DHB-0042	بون-بون-dhb-0042-eeb2ea	بون بون	\N	Viktor & Rolf Bonbon	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:10:10.881	women	both	t	/products/DHB-0042.webp	t	t	f	حلو، فواكه، زهري	بون بون، bonbon، فيكتور اند رولف، viktor rolf، نسائي، حلو، كراميل، فواكه، خوخ، شتوي	عطر نسائي حلو وشهي يرتكز على جاذبية الكراميل مع نفحات فاكهية منعشة من الخوخ والبرتقال وقاعدة عنبرية دافئة.	DHB-0042.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
2c1fca70-1b3d-43fc-8c20-7056a97adfb4	DHB-0057	نايت-dhb-0057-0cda59	نايت	\N	Victoria's Secret Night	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:10:12.11	women	both	t	/products/DHB-0057.webp	t	t	f	فواكه، دافئ، خشبي	نايت، night، فيكتوريا سيكرت، victoria secret، نسائي، فواكه، خوخ، أخشاب، دافئ، شتوي	عطر نسائي دافئ وحسي يمزج بين حلاوة البرقوق والتفاح ونفحات الأزهار النادرة مع قاعدة خشبية مسكية غنية.	DHB-0057.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
1df1bf29-393a-4a74-900b-711f93f278cd	DHB-0066	تشانس-فريش-dhb-0066-fa9b9b	تشانس فريش	\N	Chanel Chance Eau Fraiche	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.619	2026-07-04 21:10:13.327	women	summer	t	/products/DHB-0066.webp	t	t	f	حمضي، منعش، خشبي	تشانس فريش، chance eau fraiche، شانيل، chanel، نسائي، حمضي، ليمون، خشب الأرز، منعش، صيفي	عطر نسائي منعش ومفعم بالحيوية يجمع بين حدة الليمون ودفء خشب الأرز والباتشولي مع باقة زهرية مائية رقيقة.	DHB-0066.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
96114e09-ae93-454e-89fe-ac9abff3ccd6	DHB-0077	جادور-لور-dhb-0077-f5bce7	جادور لور	\N	Dior J'adore L'Or	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.644	2026-07-04 21:10:14.551	women	winter	t	/products/DHB-0077.webp	t	t	f	زهري، فانيلا، دافئ	جادور لور، jadore lor، ديور، dior، نسائي، ياسمين، ورد، فانيلا، تونكا، فخم، شتوي	عطر نسائي شرقي زهري دافئ يفيض بفخامة أزهار الياسمين والورد ولمسة حلوة من التوت وقاعدة كريمية من الفانيلا والتونكا.	DHB-0077.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
994fddd5-46f5-4b37-863b-4bb2dabf4e9c	DHB-0090	بربري-هير-الكسير-dhb-0090-3dc781	بربري هير الكسير	\N	Burberry Her Elixir de Parfum	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.672	2026-07-04 21:10:15.774	women	winter	t	/products/DHB-0090.webp	t	t	f	حلو، فواكه، فانيلا	بربري هير الكسير، burberry her elixir، بربري، burberry، نسائي، حلو، فراولة، توت، فانيلا، خشب الصندل، شتوي	عطر نسائي كريمي شديد الجاذبية يفوح بعبير الفواكه الحمراء كالفراولة والتوت الأسود مع قلب من الياسمين وقاعدة عنبرية فانيلا غنية.	DHB-0090.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4946e917-e9b2-4d63-a63c-96526efcffae	DHB-0093	ديڤوشين-dhb-0093-cd8ec2	ديڤوشين	\N	Dolce & Gabbana Devotion	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.888	2026-07-04 21:10:17.001	women	both	t	/products/DHB-0093.webp	t	t	f	حلو، فانيلا، حمضي	ديڤوشين، ديفوشين، devotion، دولتشي اند غابانا، dolce gabbana، نسائي، حلو، ليمون محلى، فانيلا، شتوي، فخم	عطر نسائي شهي وفريد يتميز بافتتاحية منعشة من الليمون المحلى وحلوى البانيتوني مع قلب من زهر البرتقال وقاعدة دافئة ومكثفة من الفانيلا.	DHB-0093.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
75ac202c-2415-48cf-ab16-a80f2e043943	DHB-0028	اسكادا-سكسي-جرافيت-dhb-0028-51909f	اسكادا سكسي جرافيت	\N	Escada Sexy Graffiti	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.085	2026-07-04 21:10:19.469	women	summer	t	/products/DHB-0028.webp	t	t	f	فواكه، زهري، منعش	اسكادا سكسي جرافيت، sexy graffiti، اسكادا، escada، نسائي، فواكه، فراولة، توت، صيفي، منعش	عطر نسائي منعش ومبهج يفوح بعبير الفواكه الحمراء الاستوائية كالفراولة والتوت مع باقة زهرية ناعمة وقاعدة مسكية.	DHB-0028.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
ff170f46-3d00-4500-9eb4-c137ecf3a31c	DHB-0038	برادوكس-راديار-إسينس-dhb-0038-4c1668	برادوكس راديار إسينس	\N	Prada Paradoxe Radical Essence	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:10:20.7	women	winter	t	/products/DHB-0038.webp	t	t	f	شرقي، حلو، خشبي	برادوكس راديار إسينس، radical essence، prada paradoxe، برادا، prada، نسائي، فستق، نيرولي، خشب الصندل، شتوي	عطر نسائي شرقي دافئ ومبتكر يجمع بين حيوية زهر البرتقال ونكهة الفستق المملح الفريدة مع قاعدة مخملية من خشب الصندل.	DHB-0038.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
0d8cc034-6fc7-4e4e-be73-3e250babb0fb	DHB-0047	بوس-اورنج-dhb-0047-7f19a7	بوس اورنج	\N	Hugo Boss Boss Orange for Women	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:10:21.981	women	both	t	/products/DHB-0047.webp	t	t	f	فواكه، زهري، منعش	بوس اورنج، boss orange، هوغو بوس، hugo boss، نسائي، تفاح أحضر، زهر البرتقال، فانيلا، صيفي، منعش	عطر نسائي منعش ومشرق يفتتح بنفحات التفاح الأحمر الحلوة مع قلب من زهور البرتقال البيضاء وقاعدة دافئة من الفانيلا وخشب الصندل.	DHB-0047.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
af4c5426-894d-4900-9b64-1acede6eaa6e	DHB-0059	بيور-سديكشين-dhb-0059-ea8883	بيور سديكشين	\N	Victoria's Secret Pure Seduction	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:10:23.203	women	summer	t	/products/DHB-0059.webp	t	t	f	فواكه، حلو، زهري	بيور سديكشين، pure seduction، فيكتوريا سيكرت، victoria secret، نسائي، فواكه، برقوق، فريزيا، حلو، منعش، صيفي	عطر نسائي مبهج فائق الجاذبية يجمع بين حلاوة البرقوق الأحمر وعصير الشمام مع عبير زهور الفريزيا الناعمة.	DHB-0059.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4633e3e4-c6e8-40a6-8e76-200f96f00d5f	DHB-0068	تريزور-ميد-نايت-لانوي-dhb-0068-df3f14	تريزور ميد نايت لانوي	\N	Lancome La Nuit Tresor	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.618	2026-07-04 21:10:24.444	women	winter	t	/products/DHB-0068.webp	t	t	f	حلو، فواكه، دافئ	تريزور ميد نايت لانوي، la nuit tresor، لانكوم، lancome، نسائي، حلو، كراميل، فراولة، فانيلا، شتوي، فخم	عطر نسائي شرقي دافئ وشهي للغاية يتميز بنفحات الفراولة والكمثرى مع قلب من الورد الأسود وقاعدة غنية بالكراميل والجاوي واللبان.	DHB-0068.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6f43ed94-2970-4f6e-8e58-4b1a7049b47a	DHB-0075	جود-جيرل-سوبريم-dhb-0075-462301	جود جيرل سوبريم	\N	Carolina Herrera Good Girl Supreme	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.644	2026-07-04 21:10:25.92	women	winter	t	/products/DHB-0075.webp	t	t	f	حلو، فواكه، دافئ	جود جيرل سوبريم، good girl supreme، كارولينا هريرا، carolina herrera، نسائي، توت بري، تونكا، ياسمين، حلو، شتوي، فخم	عطر نسائي شرقي شهي يمزج بين حيوية التوت البري وعمق التونكا الدافئة مع لمسة أنثوية من ياسمين سامباك.	DHB-0075.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d428176a-216a-4231-b4d7-acb249438281	DHB-0085	جابريل-dhb-0085-8354bb	جابريل	\N	Chanel Gabrielle	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:10:27.14	women	summer	t	/products/DHB-0085.webp	t	t	f	زهري، حمضي، منعش	جابريل، gabrielle، شانيل، chanel، نسائي، زهور بيضاء، زهر البرتقال، جريب فروت، منعش، صيفي، كل المواسم	عطر نسائي مشرق وفياض بالأنوثة يجمع بين نضارة الحمضيات وعبير زهر البرتقال والياسمين مع قلب كريمي مسكي رقيق.	DHB-0085.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b23c8016-75ac-4fc5-b0dc-2a828b6d6071	DHB-0100	جست-dhb-0100-9f2e4f	جست	\N	Roberto Cavalli Just Cavalli	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.889	2026-07-04 21:10:28.361	women	both	t	/products/DHB-0100.webp	t	t	f	زهري، خشبي، ناعم	جست، just cavalli، روبرتو كفالي، roberto cavalli، نسائي، نيرولي، زهرة التياري، خشب الورد، منعش، كل المواسم	عطر نسائي حسي وناعم يفتتح بنفحات النيرولي المشرقة مع قلب غني من أزهار التياري وقاعدة خشبية دافئة من خشب الورد.	DHB-0100.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f1a00606-4504-41f9-9b85-2a04a7f765a6	DHB-0031	ايدول-dhb-0031-da3ebf	ايدول	\N	Lancome Idole	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.086	2026-07-04 21:10:30.802	women	summer	t	/products/DHB-0031.webp	t	t	f	زهري، مسك، منعش	ايدول، idole، لانكوم، lancome، نسائي، ورد، مسك، إجاص، منعش، ناعم، كل المواسم	عطر نسائي رقيق ونظيف يحتفي بجمال الورد التركي والياسمين مع لمسة فاكهية حلوة وقاعدة ناعمة من المسك الأبيض.	DHB-0031.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3c88b567-7ac2-44c7-8726-fa4902c0650b	DHB-0039	بلو-ليدي-dhb-0039-b9709f	بلو ليدي	\N	Rasasi Blue Lady	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:10:32.027	women	both	t	/products/DHB-0039.webp	t	t	f	زهري، مسك، بودري	بلو ليدي، blue lady، الرصاصي، rasasi، نسائي، زهري، كلاسيكي، بودري، مسك، كل المواسم	عطر نسائي كلاسيكي غني يفوح بباقة دافئة من زهور الياسمين ومسك الروم مع لمسة بودرية حسية ونفحات خشبية ومسكية ثابتة.	DHB-0039.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	DHB-0050	برايت-كرستال-dhb-0050-65cdbf	برايت كرستال	\N	Versace Bright Crystal	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:10:33.256	women	summer	t	/products/DHB-0050.webp	t	t	f	زهري، فواكه، منعش	برايت كرستال، bright crystal، فرزاتشي، versace، نسائي، زهور، رمان، منعش، صيفي، ناعم	عطر نسائي منعش وساحر يمزج بين حيوية الرمان وثمار اليوزو مع قلب غني بزهور الفاوانيا واللوتس وقاعدة مسكية رقيقة.	DHB-0050.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
7feb7a06-6c47-4394-90ed-3210cf471c2a	DHB-0060	212-سكسي-dhb-0060-d90867	212 سكسي	\N	Carolina Herrera 212 Sexy	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:10:34.501	women	winter	t	/products/DHB-0060.webp	t	t	f	حلو، فانيلا، توابل	212 سكسي، 212 sexy، كارولينا هريرا، carolina herrera، نسائي، حلو، غزل البنات، فلفل وردي، فانيلا، دافئ، شتوي	عطر نسائي حسي وجذاب يمزج بنعومة بين حلاوة غزل البنات والفانيلا ونفحات الفلفل الوردي الحار مع قاعدة مسكية دافئة.	DHB-0060.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6f311c30-c216-438a-b707-2e69ab4de5ce	DHB-0069	جوديس-dhb-0069-f66194	جوديس	\N	Burberry Goddess	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.618	2026-07-04 21:10:35.721	women	both	t	/products/DHB-0069.webp	t	t	f	فانيلا، حلو، دافئ	جوديس، goddess، بربري، burberry، نسائي، فانيلا، لافندر، حلو، دافئ، خريف، شتاء، كل المواسم	عطر نسائي دافئ وراقي يرتكز على ثلاثية فريدة من الفانيلا الغنية الممزوجة بلمسة من الخزامى (اللافندر) وقاعدة خشبية ناعمة.	DHB-0069.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6192fe95-e612-45fd-820e-c6e7ec3ebe20	DHB-0079	جوتشي-فلورا-جاردينيا-dhb-0079-c0f4b1	جوتشي فلورا جاردينيا	\N	Gucci Flora Gorgeous Gardenia	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.645	2026-07-04 21:10:36.95	women	summer	t	/products/DHB-0079.webp	t	t	f	زهري، حلو، فواكه	جوتشي فلورا جاردينيا، flora gorgeous gardenia، جوتشي، gucci، نسائي، غاردينيا، خوخ، سكر بني، زهري، صيفي، منعش	عطر نسائي أنثوي ومبهج يمزج بين عبير زهور الغاردينيا الساحرة وحلاوة السكر البني مع نفحات منعشة من كمثرى السفرجل والتوت الأحمر.	DHB-0079.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
ede67ea9-e0e5-4e77-8841-b0504adc7f91	DHB-0088	جيرل-اوف-ناو-dhb-0088-d0170c	جيرل اوف ناو	\N	Elie Saab Girl of Now	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:10:38.18	women	winter	t	/products/DHB-0088.webp	t	t	f	حلو، فانيلا، فواكه	جيرل اوف ناو، girl of now، الي صعب، elie saab، نسائي، حلو، لوز، فستق، تونكا، فانيلا، شتوي، فخم	عطر نسائي شهي ودافئ ينبض بحلاوة اللوز والفستق الحلبي مع نفحات زهر البرتقال والكمثرى وقاعدة غنية من التونكا والفانيلا.	DHB-0088.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
41a4187a-0678-44a1-93ea-12faf3f859ff	DHB-0101	رالف-dhb-0101-2f8bdc	رالف	\N	Ralph Lauren Ralph	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.89	2026-07-04 21:10:39.505	women	summer	t	/products/DHB-0101.webp	t	t	f	فواكه، زهري، منعش	رالف، ralph، رالف لورين، ralph lauren، نسائي، تفاح، منعش، حمضيات، صيفي	عطر نسائي منعش ومبهج للغاية يفوح بنفحات أوراق التفاح الأخضر والماندرين الإيطالي مع باقة ناعمة من زهور الفريزيا والماغنوليا.	DHB-0101.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f0893160-9afd-4796-a6ae-f7eb69e3539a	DHB-0108	سو-سكاندل-dhb-0108-d81aa4	سو سكاندل	\N	Jean Paul Gaultier So Scandal!	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:10:40.723	women	summer	t	/products/DHB-0108.webp	t	t	f	زهري، حلو، فواكه	سو سكاندل، so scandal، جان بول غوتييه، jean paul gaultier، jpg، نسائي، مسك الروم، توت، حليب، حلو، صيفي، منعش	عطر نسائي جريء وفاتن يمزج بين حلاوة التوت البري ونضارة زهور البرتقال وياسمين سامباك مع نوتة حليبية كريمية فريدة ومثيرة.	DHB-0108.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
01f8559c-9dd2-4dad-90b6-c306988299e5	DHB-0030	you-dhb-0030-03cda4	You	\N	Giorgio Armani Because It's You	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.086	2026-07-04 21:10:43.414	women	both	t	/products/DHB-0030.webp	t	t	f	فواكه، زهري، فانيلا	Because It's You، armani، جورجيو ارماني، Giorgio Armani، نسائي، فواكه، توت، ورد، فانيلا، كل المواسم	عطر نسائي متألق وجذاب يمزج بين حلاوة التوت البري ونضارة زهر البرتقال مع قلب من الورد الجوري وقاعدة مسكية دافئة من الفانيلا.	DHB-0030.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
7f1cb136-a5b1-4306-9704-62588862fbc2	DHB-0040	برادا-كاندي-dhb-0040-358f70	برادا كاندي	\N	Prada Candy	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:10:44.637	women	winter	t	/products/DHB-0040.webp	t	t	f	حلو، فانيلا، بودري	برادا كاندي، prada candy، برادا، prada، نسائي، كراميل، فانيلا، بودري، حلو، شتوي	عطر نسائي حلو ودافئ يتميز بطابع شرقي شهي يمزج بين الكراميل اللذيذ والمسك الحسي وقاعدة ناعمة من الفانيلا والجاوي.	DHB-0040.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
0657e2e2-2d86-4106-b336-efd532d98fb4	DHB-0051	بلاك-x-s-dhb-0051-bd1804	بلاك X.s	\N	Paco Rabanne Black XS for Her	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:10:45.858	women	winter	t	/products/DHB-0051.webp	t	t	f	حلو، فواكه، توابل	بلاك اكس اس، black xs، باكو رابان، paco rabanne، نسائي، كاكاو، توت، توابل، حلو، شتوي، فخم	عطر نسائي جريء ودافئ يجمع بين حموضة التوت البري وحلاوة الكاكاو مع لمسة حارة من الفلفل الوردي وقاعدة من الباتشولي والفانيلا.	DHB-0051.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5ff2b307-6c42-4108-926a-6e6fa1fac47b	DHB-0061	212-vip-dhb-0061-eb89c4	212 VIP	\N	Carolina Herrera 212 VIP	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.352	2026-07-04 21:10:47.08	women	winter	t	/products/DHB-0061.webp	t	t	f	حلو، شرقي، فواكه	212 vip، كارولينا هريرا، carolina herrera، نسائي، حلو، باشون فروت، فانيلا، فخم، شتوي، كل المواسم	عطر نسائي شرقي حسي وجريء يمزج بين عبير الباشون فروت والمسك وقاعدة غنية ودافئة من الفانيلا.	DHB-0061.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	DHB-0070	جونسون-dhb-0070-125a64	جونسون	\N	Johnson's Baby Powder scent	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.618	2026-07-04 21:10:48.303	women	both	t	/products/DHB-0070.webp	t	t	f	بودري، مسك، ناعم	جونسون، johnson، جونسون للاطفال، بودرة، مسك، ناعم، نظافة، منعش، كل المواسم	عطر نسائي ناعم للغاية يفوح برائحة النظافة المنعشة وبودرة الأطفال الكلاسيكية مع لمسة رقيقة من الورد والمسك الأبيض.	DHB-0070.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
67285bc6-6382-4b7d-8173-2d857a4a1c13	DHB-0076	جادور-dhb-0076-f604cf	جادور	\N	Dior J'adore	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.645	2026-07-04 21:10:49.52	women	summer	t	/products/DHB-0076.webp	t	t	f	زهري، فواكه، منعش	جادور، jadore، ديور، dior، نسائي، زهور، إجاص، ياسمين، فخم، منعش، كل المواسم	عطر نسائي أيقوني فاخر يحتفي بالأنوثة عبر باقة ذهبية متألقة من الياسمين والورد مع لمسة فاكهية منعشة من الإجاص والدراق وقاعدة مسكية ناعمة.	DHB-0076.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
bab6c3d5-c460-43f7-a660-6d6b8747318b	DHB-0091	بربري-هير-dhb-0091-301da4	بربري هير	\N	Burberry Her Eau de Parfum	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.672	2026-07-04 21:10:50.74	women	summer	t	/products/DHB-0091.webp	t	t	f	فواكه، زهري، منعش	بربري هير، burberry her، بربري، burberry، نسائي، فواكه، فراولة، كرز، مسك، صيفي، منعش، كل المواسم	عطر نسائي حيوي ومنعش يتميز بانفجار عطري من ثمار التوت البري والفراولة والكرز مع قلب زهري ناعم وقاعدة خشبية مسكية.	DHB-0091.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
1c8ae757-4400-4989-ac57-d7a488bddcc7	DHB-0099	ربيرتو-كڤالي-dhb-0099-3abc04	ربيرتو كڤالي	\N	Roberto Cavalli Eau de Parfum	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.889	2026-07-04 21:10:51.963	women	winter	t	/products/DHB-0099.webp	t	t	f	زهري، حلو، دافئ	روبرتو كفالي، roberto cavalli، روبرتو كفالي ذهبي، نسائي، زهر البرتقال، فانيلا، تونكا، فخم، شتوي	عطر نسائي شرقي زهري دافئ وراقٍ يتميز بعبير زهر البرتقال الحسي وحرارة الفلفل الوردي مع قاعدة غنية من التونكا والجاوي والفانيلا.	DHB-0099.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	DHB-0012	الي-صعب-بيرفيوم-dhb-0012-056b97	الي صعب بيرفيوم	\N	Elie Saab Le Parfum	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.06	2026-07-04 21:10:53.188	women	winter	t	/products/DHB-0012.webp	t	t	f	زهري، عسل، دافئ	الي صعب، elie saab، le parfum، نسائي، زهر البرتقال، ياسمين، عسل، فخم، راقي، كل المواسم	عطر نسائي راقٍ ومشرق يحتفي بزهر البرتقال الأفريقي والياسمين مع قلب دافئ وعذب من عسل الورد.	DHB-0012.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
bed6484b-64cf-4785-9323-3805baed49a1	DHB-0022	اول-اوف-مي-dhb-0022-e005c1	اول اوف مي	\N	Narciso Rodriguez All of Me	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.084	2026-07-04 21:10:54.413	women	both	t	/products/DHB-0022.webp	t	t	f	زهري، مسك، ناعم	اول اوف مي، all of me، نرسيسو رودريغز، narciso rodriguez، نسائي، ورد، مسك، ناعم، فخم، كل المواسم	عطر نسائي عصري يحتفي بجمال الورد والجرانيوم مع قاعدة غنية ومخملية من المسك الأبيض المميز.	DHB-0022.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
8abad596-27ef-4643-8d66-4842a06760d6	DHB-0032	ايودي-موزيل-روز-dhb-0032-da526f	ايودي موزيل روز	\N	Givenchy Eaudemoiselle de Givenchy Rose à la Folie	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:10:55.657	women	summer	t	/products/DHB-0032.webp	t	t	f	زهري، فواكه، ناعم	ايودي موزيل روز، اودي موزيل، eaudemoiselle، rose، جيفنشي، givenchy، نسائي، ورد، فواكه، مسك، صيفي	عطر نسائي رومانسي وأنيق يجمع بين انتعاش ورد الشاي ونكهة التفاح المكرمل مع قاعدة ناعمة من المسك.	DHB-0032.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c8e98770-b2d9-4add-88b3-57af59796384	DHB-0043	بي-ديليشيس-dhb-0043-74bd85	بي ديليشيس	\N	DKNY Be Delicious	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:10:56.962	women	summer	t	/products/DHB-0043.webp	t	t	f	منعش، فواكه، زهري	بي ديليشيس، be delicious، دي كي ان واي، dkny، نسائي، تفاح أخضر، خيار، منعش، صيفي	عطر نسائي منعش وحيوي يفوح بعبير التفاح الأخضر والخيار المنعش مع باقة زهرية ناعمة وقاعدة خشبية خفيفة.	DHB-0043.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	DHB-0052	بلاك-x-s-بيور-dhb-0052-66bc6c	بلاك X.s بيور	\N	Paco Rabanne Pure XS for Her	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:10:58.432	women	winter	t	/products/DHB-0052.webp	t	t	f	حلو، زهري، فانيلا	بلاك اكس اس بيور، pure xs، باكو رابان، paco rabanne، نسائي، فشار، فانيلا، إيلنغ، حلو، دافئ، شتوي	عطر نسائي حسي ومثير يتميز بمزيج جريء وفريد يجمع بين حلاوة الفانيلا ونكهة الفشار المقرمش مع عبير أزهار الإيلنغ وقاعدة مسكية دافئة.	DHB-0052.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
39b3ece3-13cf-4797-9c65-45fe96c50d8a	DHB-0071	جويّ-dhb-0071-84a368	جويّ	\N	Dior Joy	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.618	2026-07-04 21:10:59.657	women	both	t	/products/DHB-0071.webp	t	t	f	زهري، حمضي، مسك	جوي، joy، ديور، dior، نسائي، ياسمين، حمضيات، مسك، خشب الصندل، منعش، كل المواسم	عطر نسائي مبهج ومشرق يمزج بين انتعاش الحمضيات وجاذبية الورد الجوري والياسمين مع قاعدة خشبية مسكية دافئة.	DHB-0071.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d9f8b7eb-47a6-489f-95f6-237cf032065d	DHB-0073	جود-جيرل-بلش-dhb-0073-5bd9e9	جود جيرل بلش	\N	Carolina Herrera Good Girl Blush	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.644	2026-07-04 21:11:00.875	women	both	t	/products/DHB-0073.webp	t	t	f	فانيلا، زهري، بودري	جود جيرل بلش، good girl blush، كارولينا هريرا، carolina herrera، نسائي، فانيلا، بودري، فاوانيا، ناعم، كل المواسم	عطر نسائي رقيق يتميز بعبير الفاوانيا والإيلنغ الأنثوي مع قلب بودري وقاعدة دافئة وحلوة من الفانيلا.	DHB-0073.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d59d095c-d4e2-4ccf-b856-a8752b4ad13c	DHB-0083	جوتشي-بامبو-dhb-0083-b5b9e7	جوتشي بامبو	\N	Gucci Bamboo	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:11:02.093	women	summer	t	/products/DHB-0083.webp	t	t	f	زهري، حمضي، خشبي	جوتشي بامبو، gucci bamboo، جوتشي، gucci، نسائي، زنبق، ياسمين، صندل، منعش، صيفي، كل المواسم	عطر نسائي أنيق ومتوازن يحتفي بعبير زنابق الدار البيضاء وأزهار البرتقال مع نضارة البرغموت وقاعدة مخملية من خشب الصندل.	DHB-0083.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	DHB-0094	ديكادينس-dhb-0094-d6c63a	ديكادينس	\N	Marc Jacobs Decadence	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.888	2026-07-04 21:11:03.314	women	winter	t	/products/DHB-0094.webp	t	t	f	حلو، دافئ، شرقي	ديكادينس، decadence، مارك جاكوبس، marc jacobs، نسائي، برقوق، زعفران، عنبر، فخم، شتوي، ثبات عالي	عطر نسائي شرقي فخم يتميز بنفحات دافئة من البرقوق الإيطالي والزعفران الثمين مع قلب من السوسن والورد وقاعدة عنبرية خشبية غنية وثابتة.	DHB-0094.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
84e50a6c-c3e0-4114-9150-d6205212b7ca	DHB-0013	ايڤوريا-dhb-0013-b7c346	ايڤوريا	\N	Calvin Klein Euphoria for Women	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.06	2026-07-04 21:11:26.898	women	winter	t	/products/DHB-0013.webp	t	t	f	فواكه، زهري، خشبي	ايڤوريا، ايفوريا، euphoria، كالفن كلاين، calvin klein، نسائي، فواكه، رمان، أوركيد، خشبي، شتوي	عطر نسائي غامض وجذاب يفتتح بنفحات الرمان المنعشة مع قلب من زهور الأوركيد وقاعدة خشبية عنبرية دافئة.	DHB-0013.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	DHB-0021	أنفي-مي-dhb-0021-34c2cf	أنفي مي	\N	Gucci Envy Me	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.061	2026-07-04 21:11:04.538	women	summer	t	/products/DHB-0021.webp	t	t	f	فواكه، زهري، منعش	انفي مي، envy me، جوتشي، gucci، نسائي، فواكه، زهري، منعش، مسك، صيفي، كل المواسم	عطر نسائي منعش ومبهج يجمع بين عبير الفاوانيا والياسمين ونفحات الفواكه الوردي مع قاعدة ناعمة من المسك الأبيض.	DHB-0021.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
16d29daf-79b9-42fb-964c-b50553900528	DHB-0027	اسكادا-كوليكشن-dhb-0027-9b3ab7	اسكادا كوليكشن	\N	Escada Collection	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.085	2026-07-04 21:11:05.773	women	winter	t	/products/DHB-0027.webp	t	t	f	شرقي، حلو، فانيلا	اسكادا كوليكشن، collection، اسكادا، escada، نسائي، حلو، كراميل، عسل، فانيلا، شتوي	عطر نسائي شرقي دافئ يتميز بنفحات عذبة من الكراميل وعسل النحل مع قاعدة غنية من الفانيلا وخشب الصندل.	DHB-0027.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b40bad66-7413-4610-b365-72dffcc94600	DHB-0036	برادوكس-dhb-0036-21faa8	برادوكس	\N	Prada Paradoxe	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:11:07.046	women	both	t	/products/DHB-0036.webp	t	t	f	زهري، حلو، عنبر	برادوكس، paradoxe، برادا، prada، نسائي، زهر البرتقال، عنبر، فانيلا، منعش، كل المواسم	عطر نسائي زهري حسي يجمع بين حيوية زهر البرتقال والياسمين ودفء العنبر والمسك مع لمسة حلوة من الفانيلا.	DHB-0036.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6210563a-b9ec-4047-b1d8-1da33e9662f2	DHB-0046	بلاك-ابيوم-ريد-dhb-0046-29baf6	بلاك ابيوم ريد	\N	Yves Saint Laurent Black Opium Over Red	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:11:08.27	women	winter	t	/products/DHB-0046.webp	t	t	f	حلو، فواكه، دافئ	بلاك ابيوم ريد، black opium over red، ysl، نسائي، كرز، قهوة، فانيلا، شتوي، فخم، دافئ	عطر نسائي حسي ودافئ يجمع بين حلاوة الكرز الأحمر وجاذبية القهوة السوداء مع قاعدة غنية بقرون الفانيلا والباتشولي.	DHB-0046.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b2ac3210-34a5-4e86-a628-0ea79aae160d	DHB-0056	إيوسو-سكسي-dhb-0056-990acf	إيوسو سكسي	\N	Victoria's Secret Eau So Sexy	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:11:09.493	women	summer	t	/products/DHB-0056.webp	t	t	f	حلو، فواكه، منعش	ايوسو سكسي، eau so sexy، فيكتوريا سيكرت، victoria secret، نسائي، تفاح، كريمة مخفوقة، حلو، منعش، صيفي	عطر نسائي حلو ومنعش يمزج بين نضارة التفاح الأخضر والبرغموت وحلاوة الكريمة المخفوقة بطابع ناعم ومبهج.	DHB-0056.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
51793003-ac19-41aa-801e-2d656912435e	DHB-0064	تشانس-dhb-0064-ed5b3a	تشانس	\N	Chanel Chance	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.617	2026-07-04 21:11:10.716	women	both	t	/products/DHB-0064.webp	t	t	f	زهري، باتشولي، منعش	تشانس، chance، شانيل، chanel، نسائي، باتشولي، فلفل وردي، ياسمين، منعش، فخم، كل المواسم	عطر نسائي كلاسيكي فاخر يجمع بين دفء الباتشولي وحرارة الفلفل الوردي مع عبير الياسمين ونضارة الحمضيات.	DHB-0064.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
0dc3136c-29dd-4108-8a0d-3ea7475a998b	DHB-0080	جوتشي-جلتي-dhb-0080-d9a599	جوتشي جلتي	\N	Gucci Guilty for Women	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.645	2026-07-04 21:11:11.941	women	winter	t	/products/DHB-0080.webp	t	t	f	زهري، توابل، دافئ	جوتشي جلتي، gucci guilty، جوتشي، gucci، نسائي، ليلك، فلفل وردي، باتشولي، خوخ، عنبر، كل المواسم	عطر نسائي كلاسيكي جذاب يمزج بين عبير زهور الليلك والدراق وحرارة الفلفل الوردي مع قاعدة دافئة من العنبر والباتشولي.	DHB-0080.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c5e324d5-ca7a-465e-936f-69e4a46381bd	DHB-0086	ذا-سنت-dhb-0086-4aa546	ذا سنت	\N	Hugo Boss The Scent for Her	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:11:13.186	women	both	t	/products/DHB-0086.webp	t	t	f	فواكه، حلو، زهري	ذا سنت، the scent، هوغو بوس، hugo boss، نسائي، خوخ، فريزيا، عسل، كاكاو، منعش، كل المواسم	عطر نسائي ناعم وحيوي يمزج بين حلاوة الخوخ المعسل وأناقة زهور الفريزيا وقاعدة دافئة وشهية من حبوب الكاكاو المحمصة.	DHB-0086.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	DHB-0098	براديسو-dhb-0098-f8c71c	براديسو	\N	Roberto Cavalli Paradiso	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.889	2026-07-04 21:11:14.649	women	summer	t	/products/DHB-0098.webp	t	t	f	منعش، زهري، خشبي	براديسو، paradiso، روبرتو كفالي، roberto cavalli، نسائي، ياسمين، صنوبر، حمضيات، صيفي، منعش	عطر نسائي منعش ومشرق يجسد أجواء الجزر الإيطالية بنفحات الياسمين الساحرة مع انتعاش الحمضيات وقاعدة خشبية من الصنوبر والسرو.	DHB-0098.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6db54e28-8ba7-420a-ba75-ebe7979f09d0	DHB-0018	انجل-جولد-dhb-0018-0785e4	انجل جولد	\N	Victoria's Secret Angel Gold	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.06	2026-07-04 21:11:15.886	women	summer	t	/products/DHB-0018.webp	t	t	f	زهري، فواكه، حمضي	انجل جولد، angel gold، فيكتوريا سيكرت، victoria secret، نسائي، فواكه، حمضي، زهري، منعش، صيفي	عطر نسائي منعش ومشرق يمزج بين حلاوة الإجاص وانتعاش البرغموت مع باقة زهرية من الغاردينيا وقاعدة مسكية هادئة.	DHB-0018.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
0ece9262-5007-4fc7-959d-b6804cb359b9	DHB-0024	اسكادا-مغنيسيوم-dhb-0024-3bca76	اسكادا مغنيسيوم	\N	Escada Magnetism	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.084	2026-07-04 21:11:17.112	women	winter	t	/products/DHB-0024.webp	t	t	f	حلو، فانيلا، فواكه	اسكادا مغنيسيوم، magnetism، اسكادا، escada، نسائي، حلو، كراميل، فواكه، فانيلا، شتوي	عطر نسائي دافئ وحلو للغاية يمزج بين كراميل الفانيلا اللذيذ والتوت الأحمر مع باقة زهرية شرقية ساحرة.	DHB-0024.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
a05ed06e-e57e-48f3-8e26-a861760bd2fb	DHB-0035	بربري-بودي-dhb-0035-d15b86	بربري بودي	\N	Burberry Body	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:11:18.334	women	both	t	/products/DHB-0035.webp	t	t	f	بودري، زهري، ناعم	بربري بودي، burberry body، بربري، burberry، نسائي، بودري، ورد، مسك، خشب، ناعم، كل المواسم	عطر نسائي دافئ وناعم يتميز بلمسات بودرية حسية تجمع بين الخوخ والورد الجوري وقاعدة غنية بخشب الصندل والمسك.	DHB-0035.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c0221751-2228-456b-a326-b8d40f23c6c7	DHB-0048	بوس-فيمي-dhb-0048-390590	بوس فيمي	\N	Hugo Boss Femme	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:11:19.558	women	summer	t	/products/DHB-0048.webp	t	t	f	زهري، فواكه، منعش	بوس فيمي، boss femme، هوغو بوس، hugo boss، نسائي، زهري، فواكه، فريزيا، ياسمين، منعش، صيفي	عطر نسائي ناعم ومنعش يجسد الأنوثة بباقة متألقة من أزهار الفريزيا والياسمين مع لمسة فاكهية ونهاية مسكية هادئة.	DHB-0048.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
fd56b88d-1e3d-4b94-841d-485aa0c62d93	DHB-0055	باريس-هيلتون-dhb-0055-7db7e8	باريس هيلتون	\N	Paris Hilton for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:11:20.787	women	summer	t	/products/DHB-0055.webp	t	t	f	فواكه، زهري، منعش	باريس هيلتون، paris hilton، باريس، paris، نسائي، فواكه، شمام، تفاح، زهور، منعش، صيفي	عطر نسائي منعش ومشرق يفوح بعبير فواكه الصيف اللذيذة كالشمام والدراق والتفاح الأخضر مع باقة زهرية ناعمة من الفريزيا والياسمين.	DHB-0055.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c5c96781-0c85-4e34-aba6-f68cd878276e	DHB-0065	تشانس-تندر-dhb-0065-afce55	تشانس تندر	\N	Chanel Chance Eau Tendre	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.617	2026-07-04 21:11:22.008	women	summer	t	/products/DHB-0065.webp	t	t	f	زهري، فواكه، منعش	تشانس تندر، chance eau tendre، شانيل، chanel، نسائي، فواكه، سفرجل، ياسمين، مسك، صيفي، منعش	عطر نسائي رقيق ومنعش يتميز بنفحات فاكهية ناعمة من السفرجل والجريب فروت مع قلب زهري من الياسمين وقاعدة مسكية دافئة.	DHB-0065.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
67aca763-e6a4-4936-ab6f-bbc99de5558f	DHB-0072	جود-جيرل-بلش-الكسير-dhb-0072-f83c8c	جود جيرل بلش الكسير	\N	Carolina Herrera Good Girl Blush Elixir	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.644	2026-07-04 21:11:23.233	women	winter	t	/products/DHB-0072.webp	t	t	f	فانيلا، زهري، باتشولي	جود جيرل بلش الكسير، good girl blush elixir، كارولينا هريرا، carolina herrera، نسائي، فانيلا، ورد، باتشولي، فخم، كل المواسم	عطر نسائي فاخر وجذاب يمزج بين حلاوة الفانيلا وأناقة الورد والإيلنغ مع قاعدة ترابية دافئة ومكثفة من الباتشولي.	DHB-0072.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
91c7b155-374a-44ab-8f3c-dfa7ad66a823	DHB-0082	جوتشي-رش-dhb-0082-3cc267	جوتشي رش	\N	Gucci Rush	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:11:24.456	women	winter	t	/products/DHB-0082.webp	t	t	f	حلو، فواكه، باتشولي	جوتشي رش، gucci rush، جوتشي، gucci، نسائي، دراق، باتشولي، فانيلا، توابل، قوي، شتوي، فخم	عطر نسائي مغوٍ وجريء يرتكز على حلاوة الدراق الأبيض الفاتنة والغاردينيا مع لمسة توابل دافئة وقاعدة ترابية قوية من الباتشولي.	DHB-0082.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
42517512-0290-480f-9a2c-7f0ae2f7c7d3	DHB-0097	كوين-dhb-0097-edb261	كوين	\N	Dolce & Gabbana Q	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.889	2026-07-04 21:11:25.678	women	summer	t	/products/DHB-0097.webp	t	t	f	فواكه، حمضي، خشبي	كوين، Q، دولتشي اند غابانا، dolce gabbana، نسائي، كرز، ليمون، خشب الأرز، منعش، صيفي	عطر نسائي ملكي منعش يمزج بين حمضية الليمون الصقلي وحلاوة الكرز الأحمر مع قاعدة دافئة وقوية من خشب الأرز.	DHB-0097.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
856088c4-d455-4674-86d7-1abe92e243b6	DHB-0023	اسنشوال-dhb-0023-951c9d	اسنشوال	\N	Johan B Sensual	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.084	2026-07-04 21:11:28.13	women	both	t	/products/DHB-0023.webp	t	t	f	فواكه، زهري، مسك	اسنشوال، sensual، جوهان بي، johan b، نسائي، فواكه، زهري، مسك، ناعم، كل المواسم	عطر نسائي ناعم يتميز بمزيج حيوي من الفواكه الاستوائية والأزهار الرقيقة مع لمسة دافئة من المسك والباتشولي.	DHB-0023.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d1b1746c-1ec4-4692-ae96-47e2aadee234	DHB-0034	بوس-اليڤ-dhb-0034-a5a50c	بوس اليڤ	\N	Hugo Boss Alive	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:11:29.353	women	winter	t	/products/DHB-0034.webp	t	t	f	فواكه، فانيلا، خشبي	بوس اليڤ، boss alive، هوغو بوس، hugo boss، نسائي، فواكه، تفاح، فانيلا، خشب، كل المواسم	عطر نسائي حيوي وجذاب ينبض بنفحات الفواكه الطازجة كالتفاح والخوخ مع لمسة دافئة من القرفة والفانيلا والأخشاب الثمينة.	DHB-0034.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
996405d5-6f23-4ccc-a387-9d7f6fba68e8	DHB-0045	بلاك-ابيوم-dhb-0045-c28f72	بلاك ابيوم	\N	Yves Saint Laurent Black Opium	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:11:30.817	women	winter	t	/products/DHB-0045.webp	t	t	f	حلو، زهري، دافئ	بلاك ابيوم، black opium، ysl، نسائي، حلو، شتوي، فخم، قهوة، فانيلا، دافئ	عطر نسائي دافئ وساحر يمزج بين فخامة حبوب القهوة وجاذبية الفانيلا الحلوة مع لمسة زهرية ناعمة.	DHB-0045.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
74a0a41c-a5ca-4967-98d0-333b7ec343b9	DHB-0053	بويزن-جيرل-dhb-0053-6c2e62	بويزن جيرل	\N	Dior Poison Girl	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:11:32.036	women	both	t	/products/DHB-0053.webp	t	t	f	حلو، فانيلا، دافئ	بويزن جيرل، poison girl، ديور، dior، نسائي، حلو، لوز، فانيلا، برتقال مر، دافئ، شتوي	عطر نسائي جذاب وشهي يفتتح بنفحات منعشة من البرتقال المر ليمهد الطريق لقلب دافئ من اللوز وقاعدة حلوة ومكثفة من فانيلا مدغشقر والجاوي.	DHB-0053.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5b2f01bb-00bd-4a50-a834-3460898a017b	DHB-0062	تومي-جيرل-dhb-0062-94d2e4	تومي جيرل	\N	Tommy Hilfiger Tommy Girl	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.617	2026-07-04 21:11:33.253	women	summer	t	/products/DHB-0062.webp	t	t	f	منعش، زهري، حمضي	تومي جيرل، tommy girl، تومي هيلفيغر، tommy hilfiger، نسائي، منعش، حمضيات، أزهار، صيفي	عطر نسائي منعش ومفعم بالنشاط يفوح بعبير الياسمين البري وأزهار الكاميليا مع نضارة الليمون والنعناع المنعش.	DHB-0062.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
84981eb1-6893-4085-9c0d-58fef95b3333	DHB-0081	جوتشي-فلورا-dhb-0081-0244e3	جوتشي فلورا	\N	Gucci Flora	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.645	2026-07-04 21:11:34.48	women	summer	t	/products/DHB-0081.webp	t	t	f	زهري، فواكه، حمضي	جوتشي فلورا، gucci flora، جوتشي، gucci، نسائي، زهور، الحمضيات، فواكه، صندل، منعش، صيفي	عطر نسائي ناعم وراقٍ يفتتح بنفحات الحمضيات والفاوانيا المنعشة مع قلب من زهور الأوسمانثوس وقاعدة دافئة من خشب الصندل.	DHB-0081.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
145322fb-82ad-4c59-97f4-f83351d153f6	DHB-0089	ذا-ون-dhb-0089-a4738f	ذا ون	\N	Dolce & Gabbana The One for Women	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.672	2026-07-04 21:11:35.697	women	both	t	/products/DHB-0089.webp	t	t	f	فواكه، فانيلا، دافئ	ذا ون، the one، دولتشي اند غابانا، dolce gabbana، نسائي، دراق، فانيلا، عنبر، ياسمين، فخم، كل المواسم	عطر نسائي دافئ وراقٍ يمزج بين حلاوة الدراق وثمار الليتشي مع زنابق الوادي وقاعدة حسية غنية بالفانيلا والعنبر.	DHB-0089.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
2035fc62-bb44-415b-93a3-664bf0317667	DHB-0095	l-3-dhb-0095-33d950	L.3	\N	Dolce & Gabbana L'Imperatrice 3	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.888	2026-07-04 21:11:36.912	women	summer	t	/products/DHB-0095.webp	t	t	f	فواكه، منعش، بحري	L.3، l'imperatrice 3، دولتشي اند غابانا، dolce gabbana، نسائي، فواكه، بطيخ، كيوي، منعش، صيفي، مائي	عطر نسائي مائي منعش يفوح بعبير البطيخ الأحمر الحلو والكيوي المنعش مع باقة أزهار رقيقة وقاعدة مسكية خفيفة تناسب الصيف.	DHB-0095.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	DHB-0104	باشن-si-dhb-0104-ffb273	باشن Si	\N	Giorgio Armani Sì Passione	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:11:38.151	women	both	t	/products/DHB-0104.webp	t	t	f	فواكه، زهري، فانيلا	باشن سي، si passione، جورجيو ارماني، giorgio armani، نسائي، فواكه، كمثرى، ورد، فانيلا، أحمر، فخم، كل المواسم	عطر نسائي أنيق وجريء يجمع بين حميمية الفواكه كالتوت الأسود والكمثرى وعبير الورد الأنثوي مع قاعدة فانيلا دافئة وحسية.	DHB-0104.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
33b4dc2a-b042-4330-8113-fda43f07cd10	DHB-0025	اسكادا-كاندي-لڤ-dhb-0025-8ccfab	اسكادا كاندي لڤ	\N	Escada Candy Love	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.084	2026-07-04 21:11:40.621	women	both	t	/products/DHB-0025.webp	t	t	f	حلو، فواكه، فانيلا	اسكادا كاندي لڤ، candy love، اسكادا، escada، نسائي، حلو، تفاح، غزل البنات، فانيلا، صيفي	عطر نسائي مبهج وحلو بنفحات غزل البنات اللذيذة والتفاح المغطى بالكراميل مع قلب من ورود سنتيفوليا الناعمة.	DHB-0025.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
df36fd9b-d366-4c34-a5fa-1199df68bb26	DHB-0033	ارزستبل-dhb-0033-716501	ارزستبل	\N	Givenchy Irresistible	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:11:41.845	women	both	t	/products/DHB-0033.webp	t	t	f	زهري، فواكه، مسك	ارزستبل، irresistible، جيفنشي، givenchy، نسائي، ورد، مسك، إجاص، فخم، كل المواسم	عطر نسائي جذاب وناعم يتميز بعبير الورد والزنبق مع لمسة فاكهية حلوة وقاعدة خشبية مسكية دافئة.	DHB-0033.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4e8eded0-f8b2-4136-a7e0-d926ef5dada0	DHB-0044	بندورا-dhb-0044-4adf2a	بندورا	\N	J. Casanova Pandora	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:11:43.075	women	both	t	/products/DHB-0044.webp	t	t	f	زهري، مسك، أخضر	بندورا، pandora، كازانوفا، j casanova، نسائي، زهري، كلاسيكي، أخضر، مسك، كل المواسم	عطر نسائي كلاسيكي عريق يتميز بنقاء الزهور البيضاء وأزهار السوسن مع نفحات خضراء منعشة وقاعدة دافئة من المسك وخشب الصندل.	DHB-0044.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
8905257e-c381-4912-a966-00223625f3e4	DHB-0054	بويزن-بيور-dhb-0054-65147d	بويزن بيور	\N	Dior Pure Poison	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:11:44.293	women	summer	t	/products/DHB-0054.webp	t	t	f	زهري، مسك، منعش	بويزن بيور، pure poison، ديور، dior، نسائي، زهور بيضاء، ياسمين، مسك، منعش، فخم، كل المواسم	عطر نسائي راقٍ ونظيف يحتفي بجمال الزهور البيضاء كالياسمين والغاردينيا مع نضارة الحمضيات وقاعدة دافئة وثابتة من خشب الصندل والمسك الأبيض.	DHB-0054.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f8d86061-8839-4601-ba76-588935717299	DHB-0063	تاتش-اوف-بينك-dhb-0063-e015a8	تاتش اوف بينك	\N	Lacoste Touch of Pink	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.617	2026-07-04 21:11:45.514	women	summer	t	/products/DHB-0063.webp	t	t	f	فواكه، زهري، حمضي	تاتش اوف بينك، touch of pink، لاكوست، lacoste، نسائي، حمضيات، برتقال، خوخ، ياسمين، صيفي، منعش	عطر نسائي حيوي ومنعش يمزج بين حمضية البرتقال الأحمر وحلاوة الدراق مع قلب زهري ناعم وقاعدة دافئة من الفانيلا.	DHB-0063.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
280ca217-97f0-454a-a18e-0d952e3f0b1d	DHB-0074	جود-جيرل-dhb-0074-5b654f	جود جيرل	\N	Carolina Herrera Good Girl	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.644	2026-07-04 21:11:46.976	women	winter	t	/products/DHB-0074.webp	t	t	f	حلو، دافئ، كاكاو	جود جيرل، good girl، كارولينا هريرا، carolina herrera، نسائي، كاكاو، تونكا، ياسمين، حلو، شتوي، فخم	عطر نسائي حسي وغامض يمزج بين دفء حبوب الكاكاو والتونكا وجاذبية الياسمين ومسك الروم بطابع فخم ومثير.	DHB-0074.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f1f94b0e-2997-4c2b-b542-7dc1873f2223	DHB-0084	جوتشي-عود-انتس-dhb-0084-c0bafa	جوتشي عود انتس	\N	Gucci Intense Oud	عود	مكس	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:11:48.195	oud	winter	t	/products/DHB-0084.webp	t	t	f	عود، شرقي، جلدي	جوتشي عود انتس، intense oud، جوتشي، gucci، مكس، رجالي، نسائي، عود، بخور، جلد، فخم، شتوي، ثبات عالي	عطر شرقي فاخر ومهيب يتميز بتركيز عميق يجمع بين فخامة العود وحرارة البخور ولمسات الجلود الفاخرة بطابع ملكي ثابت.	DHB-0084.webp	228f3cb7-dc13-4e52-b54c-2ff4c4d57027
96218f01-4d39-4de3-a748-6dd625db4252	DHB-0092	شير-بيوتي-dhb-0092-a07579	شير بيوتي	\N	Calvin Klein Sheer Beauty	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.888	2026-07-04 21:11:49.413	women	summer	t	/products/DHB-0092.webp	t	t	f	فواكه، زهري، منعش	شير بيوتي، sheer beauty، كالفن كلاين، calvin klein، نسائي، دراق، فاوانيا، مسك، منعش، صيفي	عطر نسائي ناعم ومنعش يمزج بين حلاوة الدراق والتوت الأحمر مع عبير الفاوانيا الوردية والياسمين وقاعدة مسكية رقيقة.	DHB-0092.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
dbcd7aa8-c953-40fc-9397-cd6e82970408	DHB-0120	فانيتاز-dhb-0120-55be4c	فانيتاز	\N	Versace Vanitas	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.297	2026-07-04 21:11:50.64	women	summer	t	/products/DHB-0120.webp	t	t	f	زهري، حمضي، منعش	فانيتاز، vanitas، فيرزاتشي، versace، نسائي، ليمون، زهرة التياري، فريزيا، صيفي، منعش	عطر نسائي زهري منعش وأنيق يجمع بين نضارة الليمون وقلب متألق من زهرة التياري الاستوائية والفريزيا وقاعدة خشبية ناعمة.	DHB-0120.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
1b719431-0f16-4095-b56e-c037998814aa	DHB-0041	بلاي-فور-هير-dhb-0041-15d44c	بلاي فور هير	\N	Givenchy Play For Her	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:48.121	2026-07-04 21:11:53.091	women	both	t	/products/DHB-0041.webp	t	t	f	فواكه، زهري، حلو	بلاي فور هير، play for her، جيفنشي، givenchy، نسائي، فواكه، زهري، حلو، خشب الصندل، كل المواسم	عطر نسائي مبهج وحسي يمزج بين حلاوة الدراق الأبيض وزهور الأوركيد وقاعدة دافئة من خشب الصندل والمسك.	DHB-0041.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	DHB-0049	بينك-شوغر-dhb-0049-540581	بينك شوغر	\N	Aquolina Pink Sugar	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:51.325	2026-07-04 21:11:54.309	women	winter	t	/products/DHB-0049.webp	t	t	f	حلو، فانيلا، فواكه	بينك شوغر، pink sugar، اكوالينا، aquolina، نسائي، حلو، غزل البنات، كراميل، فانيلا، شتوي	عطر نسائي شهي وفائق الحلاوة يفوح برائحة غزل البنات والكراميل الممزوج بالتوت الأحمر مع لمسة دافئة من الفانيلا.	DHB-0049.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
69da95bf-6e1a-486b-b0c5-7d3fed07e012	DHB-0058	بمب-شيل-dhb-0058-4b9e76	بمب شيل	\N	Victoria's Secret Bombshell	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:54.351	2026-07-04 21:11:55.642	women	summer	t	/products/DHB-0058.webp	t	t	f	فواكه، زهري، منعش	بمب شيل، bombshell، فيكتوريا سيكرت، victoria secret، نسائي، فواكه، باشون فروت، فاوانيا، منعش، صيفي	عطر نسائي منعش ومشرق يفوح بنفحات فاكهية استوائية من الباشون فروت والبرتقال مع قلب من زهور الفاوانيا وقاعدة مسكية ناعمة.	DHB-0058.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
8069c814-bcd5-4efd-bc8c-3b904c32fb05	DHB-0067	ترزيور-ميد-نايت-روز-dhb-0067-4754b2	ترزيور ميد نايت روز	\N	Lancome Tresor Midnight Rose	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:57.618	2026-07-04 21:11:56.866	women	winter	t	/products/DHB-0067.webp	t	t	f	فواكه، حلو، زهري	ترزيور ميد نايت روز، tresor midnight rose، لانكوم، lancome، نسائي، توت، ورد، مسك، حلو، دافئ، شتوي	عطر نسائي حسي وساحر يمزج بين حلاوة التوت العليق الأحمر وعبير الورد الجوري مع لمسة دافئة من خشب الأرز والمسك.	DHB-0067.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
41bad034-f7d7-48d2-a4fa-06afd3822985	DHB-0078	جوتشي-بلوم-dhb-0078-0d6650	جوتشي بلوم	\N	Gucci Bloom	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:00.645	2026-07-04 21:11:58.087	women	summer	t	/products/DHB-0078.webp	t	t	f	زهري، ناعم، منعش	جوتشي بلوم، gucci bloom، جوتشي، gucci، نسائي، ياسمين، مسك الروم، زهور بيضاء، منعش، صيفي	عطر نسائي ناعم وراقٍ يجسد روعة باقة من الزهور البيضاء الفواحة كمستخلص مسك الروم وبراعم الياسمين الطبيعي.	DHB-0078.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
acdf7fe9-649c-4462-ad02-38097659151d	DHB-0087	اونلي-ذا-ون-dhb-0087-3ee3d0	اونلي ذا ون	\N	Dolce & Gabbana The Only One	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:03.671	2026-07-04 21:11:59.304	women	winter	t	/products/DHB-0087.webp	t	t	f	حلو، فانيلا، بودري	اونلي ذا ون، the only one، دولتشي اند غابانا، dolce gabbana، نسائي، حلو، كراميل، قهوة، بنفسج، فانيلا، شتوي	عطر نسائي ساحر ومبتكر يتميز بتباين فريد بين نفحات القهوة الدافئة والبنفسج البودري مع قاعدة شهية من الكراميل والفانيلا.	DHB-0087.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
ff1b01c0-d0e9-4988-af57-57ef959974b4	DHB-0096	g-3-dhb-0096-dd5450	G.3	\N	Dolce & Gabbana L'Imperatrice 3	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:06.889	2026-07-04 21:12:00.552	women	summer	t	/products/DHB-0096.webp	t	t	f	فواكه، منعش، بحري	G.3، l'imperatrice 3، دولتشي اند غابانا، dolce gabbana، نسائي، فواكه، بطيخ، كيوي، منعش، صيفي، مائي	عطر نسائي مائي منعش يفوح بعبير البطيخ الأحمر الحلو والكيوي المنعش مع باقة أزهار رقيقة وقاعدة مسكية خفيفة تناسب الصيف.	DHB-0096.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d8defac8-a4f0-4335-a403-23d76a646acb	DHB-0110	سكاندل-نايت-dhb-0110-2ed680	سكاندل نايت	\N	Jean Paul Gaultier Scandal By Night	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.984	2026-07-04 21:12:01.776	women	winter	t	/products/DHB-0110.webp	t	t	f	حلو، دافئ، توابل	سكاندل نايت، scandal by night، جان بول غوتييه، jean paul gaultier، jpg، نسائي، عسل، كرز، تونكا، باتشولي، حلو، شتوي، فخم	عطر نسائي حسي ودافئ يتميز بتوليفة حلوة مكثفة تجمع عسل النحل والكرز والتونكا مع عبير مسك الروم والباتشولي الأنيق.	DHB-0110.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
44e5cc25-c5c0-4fa4-b503-2e4865d1213b	DHB-0119	بورن-ان-روما-اكسترا-دوز-dhb-0119-4b7620	بورن ان روما اكسترا دوز	\N	Valentino Donna Born in Roma Extradose	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:12:04.461	women	winter	t	/products/DHB-0119.webp	t	t	f	حلو، فانيلا، دافئ	بورن ان روما اكسترا دوز, born in roma extradose, فالنتينو, valentino, نسائي, فانيلا, رم, توت أسود, أخشاب, فخم, شتوي, ثبات عالي	عطر نسائي شرقي مكثف ذو تركيز عالٍ وفوحان استثنائي، يمزج بين دفء الفانيلا ونكهة الرم الفاخرة مع حلاوة التوت الأسود والأخشاب الداكنة.	DHB-0119.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3a63970f-150d-47d6-ada7-457c5eeac590	DHB-0127	ڤرزاتشي-ايروس-dhb-0127-df5bbd	ڤرزاتشي ايروس	\N	Versace Eros Pour Femme	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:12:05.681	women	summer	t	/products/DHB-0127.webp	t	t	f	حمضي، زهري، مسك	فرزاتشي ايروس، eros pour femme، فيرزاتشي، versace، نسائي، ليمون، رمان، ياسمين، مسك، صيفي، منعش	عطر نسائي حمضي زهري منعش يمزج بين حيوية الليمون الصقلي والرمان وقلب من أزهار الياسمين وقاعدة مسكية خشبية دافئة.	DHB-0127.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
710f4d3a-54e2-40b1-894b-461bd25408ec	DHB-0136	لايت-بلو-dhb-0136-fa87f8	لايت بلو	\N	Dolce & Gabbana Light Blue for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.359	2026-07-04 21:12:06.903	women	summer	t	/products/DHB-0136.webp	t	t	f	حمضي، منعش، فواكه	لايت بلو، light blue، دولتشي اند غابانا، dolce gabbana، نسائي، ليمون، تفاح أخضر، أرز، منعش، صيفي	عطر نسائي صيفي منعش للغاية يجسد حيوية البحر المتوسط بمزيج من الليمون الحامض والتفاح الأخضر المقرمش وقاعدة خشبية ناعمة من خشب الأرز.	DHB-0136.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3d9de990-655a-412f-a171-2e99c9ec7a98	DHB-0142	لانتروديت-إنتس-dhb-0142-2035ad	لانتروديت إنتس	\N	Givenchy L'Interdit Intense	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:12:08.124	women	winter	t	/products/DHB-0142.webp	t	t	f	حلو، دافئ، توابل	لانتروديت انتس، l'interdit intense، جيفنشي، givenchy، نسائي، مسك الروم، سمسم، فلفل أسود، فانيلا، باتشولي، شتوي، فخم	عطر نسائي شرقي غامض ومكثف يفتتح بلمسة من الفلفل الأسود مع قلب من مسك الروم والسمسم وقاعدة دافئة من الفانيلا السوداء والباتشولي.	DHB-0142.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
84da58fa-0b61-407a-b718-025e11580a93	DHB-0154	مس-ديور-بوكيه-dhb-0154-ddd204	مس ديور بوكيه	\N	Dior Miss Dior Blooming Bouquet	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.597	2026-07-04 21:12:09.346	women	summer	t	/products/DHB-0154.webp	t	t	f	زهري، مسك، منعش	مس ديور بوكيه، blooming bouquet، ديور، dior، نسائي، فاوانيا، ورد، مسك أبيض، صيفي، منعش	عطر نسائي ناعم ومنعش يجسد رقة بتلات الفاوانيا والورد الدمشقي مع انتعاش البرغموت وقاعدة مخملية من المسك الأبيض.	DHB-0154.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
7993d6f5-ae55-42f9-8a93-33469f77f97e	DHB-0171	هابنوتيك-بويزن-dhb-0171-2e0f27	هابنوتيك بويزن	\N	Dior Hypnotic Poison	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.873	2026-07-04 21:12:10.567	women	winter	t	/products/DHB-0171.webp	t	t	f	فانيلا، حلو، دافئ	هابنوتيك بويزن، hypnotic poison، ديور، dior، نسائي، لوز، جوز هند، فانيلا، مسك، ياسمين، فخم، شتوي	عطر نسائي حسي وساحر للغاية يجمع بين مرارة اللوز وحلاوة جوز الهند مع قلب من زهور الياسمين وقاعدة غنية من فانيلا البوربون والمسك.	DHB-0171.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
46a122eb-37ed-4656-9987-cad400a5d461	DHB-0173	هابينوس-dhb-0173-b38de4	هابينوس	\N	Lancome Hypnose	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.892	2026-07-04 21:12:11.791	women	both	t	/products/DHB-0173.webp	t	t	f	فانيلا، زهري، دافئ	هابينوس، هيبنوس، hypnose، لانكوم، lancome، نسائي، زهرة الآلام، ياسمين، غاردينيا، فانيلا، نجيل الهند، فخم	عطر نسائي حسي وساحر يرتكز على جاذبية زهرة الآلام الاستوائية وأزهار الياسمين والغاردينيا مع قاعدة غنية ودافئة من الفانيلا ونجيل الهند.	DHB-0173.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
debb67da-79f1-487a-8b7e-3eea8acf835e	DHB-0186	الور-سبورت-dhb-0186-a8dfd0	الور سبورت	\N	Chanel Allure Homme Sport	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:12:13.014	men	summer	t	/products/DHB-0186.webp	t	t	f	حمضي، بحري، منعش	الور سبورت، allure homme sport، شانيل، chanel، رجالي، برتقال، بحري، ألديهيد، فانيلا، مسك، صيفي، منعش	عطر رجالي رياضي حيوي يمزج بين نضارة الماندرين والنوتات البحرية المنعشة مع قاعدة دافئة وثابتة من فانيلا التونكا والمسك الأبيض.	DHB-0186.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
bbbe0953-9dad-41a1-b246-0bbf527278d2	DHB-0015	انج-دي-مون-dhb-0015-5c328a	انج دي مون	\N	Givenchy Ange ou Demon	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.061	2026-07-04 21:10:06.97	women	winter	t	/products/DHB-0015.webp	t	t	f	زهري، شرقي، فانيلا	انج دي مون، ange ou demon، جيفنشي، givenchy، نسائي، فانيلا، شرقي، توابل، غامض، كل المواسم	عطر نسائي غامض وجذاب يجمع بين نقاء الزهور البيضاء ودفء التوابل الشرقية وقاعدة غنية بالفانيلا الناعمة.	DHB-0015.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c2a9a595-7ec0-49f3-9016-9f1325ebd800	DHB-0117	بورن-ان-روما-انتس-dhb-0117-68a086	بورن ان روما انتس	\N	Valentino Donna Born In Roma Intense	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:12:15.451	women	winter	t	/products/DHB-0117.webp	t	t	f	فانيلا، دافئ، زهري	بورن ان روما انتس، born in roma intense، فالنتينو، valentino، نسائي، ياسمين، فانيلا، عنبر، فخم، دافئ، شتوي	عطر نسائي شرقي مكثف ودافئ للغاية يرتكز على ثلاثية دافئة من الفانيلا والجاوي مع عبير أزهار الياسمين الأنثوي وجاذبية العنبر.	DHB-0117.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3dc58dd7-9617-4636-9d21-20b318a02125	DHB-0124	ڤيفا-لجوسي-dhb-0124-b88895	ڤيفا لجوسي	\N	Juicy Couture Viva la Juicy	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:12:16.672	women	both	t	/products/DHB-0124.webp	t	t	f	حلو، فواكه، فانيلا	فيفا لا جوسي، viva la juicy، جوسي كوتور، juicy couture، نسائي، كراميل، برالين، توت، غاردينيا، فانيلا، حلو، صيفي	عطر نسائي حلو وشهي يجمع بين عصير التوت البري المنعش وقلب من زهور الغاردينيا وقاعدة غنية بالكراميل الذائب والبرالين والفانيلا.	DHB-0124.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c6dbb337-65ba-4360-8e98-483939d0faf0	DHB-0141	لانتروديت-dhb-0141-69db83	لانتروديت	\N	Givenchy L'Interdit	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.36	2026-07-04 21:12:17.897	women	winter	t	/products/DHB-0141.webp	t	t	f	زهري، حلو، دافئ	لانتروديت، l'interdit، جيفنشي، givenchy، نسائي، مسك الروم، ياسمين، كمثرى، باتشولي، فخم، كل المواسم	عطر نسائي أنيق وجريء يدعو لتجاوز الحدود، بفضل مزيج مسك الروم والياسمين وزهر البرتقال مع كمثرى حلوة وقاعدة دافئة من الباتشولي.	DHB-0141.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f874db57-7f97-4bdc-b2ca-e41134fcd67e	DHB-0150	ليدي-مليون-جولد-dhb-0150-64b4e7	ليدي مليون جولد	\N	Paco Rabanne Million Gold for Her	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:12:19.361	women	both	t	/products/DHB-0150.webp	t	t	f	زهري، فواكه، مسك	ليدي مليون جولد، million gold for her، باكو رابان، paco rabanne، نسائي، ورد، ياسمين، كمثرى، فانيلا، مسك، فخم، ذهبي، إصدار جديد	عطر نسائي ذهبي فاخر ومسكي يمزج بين عبير أزهار الإيلنغ والياسمين والورد وحلاوة الكمثرى المنعشة مع قاعدة دافئة من الفانيلا والمسك.	DHB-0150.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	DHB-0155	مس-ديور-شيري-dhb-0155-66febc	مس ديور شيري	\N	Dior Miss Dior Cherie	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:12:20.582	women	winter	t	/products/DHB-0155.webp	t	t	f	حلو، فواكه، باتشولي	مس ديور شيري، miss dior cherie، ديور، dior، نسائي، فراولة، كرز، فشار، كراميل، باتشولي، حلو، فخم، شتوي	عطر نسائي أيقوني شهير يمزج بجرأة بين حلاوة الفراولة والكرز ونكهة الفشار بالكراميل مع قلب زهري ناعم وقاعدة غنية بالباتشولي.	DHB-0155.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
1904f302-353b-49a3-a3cf-a44a83900ef1	DHB-0168	نرسيسو-امبريه-dhb-0168-01c5f8	نرسيسو امبريه	\N	Narciso Rodriguez Narciso Ambree	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.871	2026-07-04 21:12:21.802	women	winter	t	/products/DHB-0168.webp	t	t	f	زهري، حلو، دافئ	نرسيسو امبريه، narciso ambree، نارسيسو رودريغز، narciso rodriguez، نسائي، فرانجيباني، إيلنغ، مسك، عنبر، فانيلا، كل المواسم	عطر نسائي دافئ وراقي يجسد حرارة الشمس بمزيج من أزهار الفرانجيباني والإيلنغ والمسك مع قاعدة دافئة من العنبر والفانيلا وخشب الكشمير.	DHB-0168.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
a5e213c8-bcaf-487d-a232-fec41894abd2	DHB-0180	يالو-دايموند-dhb-0180-69d39d	يالو دايموند	\N	Versace Yellow Diamond	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:12:23.021	women	summer	t	/products/DHB-0180.webp	t	t	f	حمضي، زهري، منعش	يالو دايموند، yellow diamond، فيرزاتشي، versace، نسائي، ليمون، إجاص، ميموزا، مسك، صيفي، منعش	عطر نسائي مشرق ومنعش كأشعة الشمس يمزج بين حمضية الليمون وحلاوة الإجاص مع عبير أزهار الميموزا وقاعدة مسكية رقيقة.	DHB-0180.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
52969a79-f71b-4494-baa5-f0f72b8362a5	DHB-0121	ڤانيلا-dhb-0121-1c303b	ڤانيلا	\N	Chopard Vanille de Madagascar	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.297	2026-07-04 21:12:25.464	women	winter	t	/products/DHB-0121.webp	t	t	f	فانيلا، حلو، دافئ	فانيلا، vanille de madagascar، شوبارد، chopard، نسائي، فانيلا مدغشقر، كراميل، لوز، دافئ، فخم، شتوي	عطر نسائي شرقي فخم يرتكز على فخامة فانيلا مدغشقر الطبيعية الممزوجة بحلاوة الكراميل واللوز المر بطابع كريمي دافئ وساحر.	DHB-0121.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5c23ac7f-336a-411c-b5bb-f436e407e8e3	DHB-0130	كالورينا-هريرا-dhb-0130-5e680c	كالورينا هريرا	\N	Carolina Herrera for Women (1988)	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.338	2026-07-04 21:12:26.683	women	winter	t	/products/DHB-0130.webp	t	t	f	زهري، حلو، دافئ	كارولينا هريرا، carolina herrera 1988، كارولينا هريرا، carolina herrera، نسائي، مسك الروم، ياسمين، دراق، عنبر، صندل، فخم، كلاسيكي	عطر نسائي كلاسيكي فاخر يمثل الهوية الأولى للدار، يرتكز على فخامة مسك الروم والياسمين مع حلاوة المشمش وقاعدة عنبرية خشبية دافئة وثابتة.	DHB-0130.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c50b0594-d1a2-4571-99c1-3ae820c80c97	DHB-0137	ليبرا-dhb-0137-61618e	ليبرا	\N	Yves Saint Laurent Libre	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.359	2026-07-04 21:12:27.908	women	summer	t	/products/DHB-0137.webp	t	t	f	زهري، حمضي، فانيلا	ليبرا، libre، ايف سان لوران، yves saint laurent، ysl، نسائي، لافندر، زهر البرتقال، فانيلا، منعش، فخم، كل المواسم	عطر نسائي أنيق يمثل الحرية بمزيج فريد يجمع بين الخزامى (اللافندر) الفرنسي ونضارة زهر البرتقال المغربي وقاعدة دافئة من الفانيلا والمسك.	DHB-0137.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3de69211-944c-4d70-a176-6144b2d5d8b5	DHB-0147	ليدي-امبليم-dhb-0147-f64981	ليدي امبليم	\N	Montblanc Lady Emblem	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:12:29.131	women	both	t	/products/DHB-0147.webp	t	t	f	فواكه، زهري، حلو	ليدي امبليم، lady emblem، مونت بلانك، montblanc، نسائي، دراق، مربى الورد، مسك، خشب الصندل، منعش، كل المواسم	عطر نسائي أنثوي ناعم يمزج بين حلاوة الدراق ومربى الورد الأحمر وتوت العليق مع قلب زهري دافئ وقاعدة مسكية رقيقة.	DHB-0147.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
39d50a82-2cdd-434d-86a0-697a11b8b4e8	DHB-0160	مانفيستو-dhb-0160-b3858a	مانفيستو	\N	Yves Saint Laurent Manifesto	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:12:30.356	women	winter	t	/products/DHB-0160.webp	t	t	f	فانيلا، حلو، زهري	مانفيستو، manifesto، ايف سان لوران، yves saint laurent، ysl، نسائي، فانيلا، تونكا، ياسمين، توت أسود، خشبي، شتوي، فخم	عطر نسائي شرقي فخم يتميز بحلاوة التونكا والفانيلا الممزوجة بنفحات الياسمين والتوت الأسود وقاعدة خشبية كريمية من خشب الصندل.	DHB-0160.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
a99e49e0-69e2-4a60-95d2-537c71c8430b	DHB-0166	نرسيسو-فور-هير-بلاك-dhb-0166-076cd6	نرسيسو فور هير  بلاك	\N	Narciso Rodriguez For Her EDT (Black Bottle)	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.87	2026-07-04 21:12:31.584	women	winter	t	/products/DHB-0166.webp	t	t	f	مسك، زهري، باتشولي	نرسيسو فور هير بلاك، narciso for her edt، نارسيسو رودريغز، narciso rodriguez، نسائي، مسك، أوسمانثوس، زهر البرتقال، باتشولي، فخم، كل المواسم	عطر نسائي أيقوني راقٍ يتميز بجاذبية المسك البارزة والزهور كالأوسمانثوس وزهر البرتقال مع قاعدة دافئة وثابتة من الباتشولي والعنبر.	DHB-0166.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c7e2a675-839e-4f75-96be-4414eafe4cd2	DHB-0176	اسمياكي-بور-فيم-dhb-0176-c72726	اسمياكي بور فيم	\N	Issey Miyake L'Eau d'Issey for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:12:32.809	women	summer	t	/products/DHB-0176.webp	t	t	f	بحري، زهري، منعش	اسمياكي بور فيم، leau dissey، ايسّي ميّاكي، issey miyake، نسائي، مائي، لوتس، زنبق، ياسمين، منعش، صيفي	عطر نسائي أيقوني منعش بطابع مائي نقي، يفوح بعبير أزهار اللوتس المائية والزنبق والفريزيا مع نفحات بحرية باردة وقاعدة خشبية ناعمة.	DHB-0176.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
228cab4e-f472-4d7a-8378-a31d69d6c1c0	DHB-0116	بورن-ان-روما-dhb-0116-bda781	بورن ان روما	\N	Valentino Donna Born In Roma	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:12:35.511	women	both	t	/products/DHB-0116.webp	t	t	f	فانيلا، زهري، دافئ	بورن ان روما، born in roma، فالنتينو، valentino، نسائي، ياسمين، فانيلا، فلفل وردي، فخم، كل المواسم	عطر نسائي أنيق وحديث يجمع بين أزهار الياسمين الثلاثية وجاذبية التوت الأسود مع قاعدة دافئة من فانيلا البوربون الغنية.	DHB-0116.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	DHB-0126	كلوي-نوماد-dhb-0126-b8bed7	كلوي نوماد	\N	Chloé Nomade	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:12:36.734	women	summer	t	/products/DHB-0126.webp	t	t	f	منعش، فواكه، أخضر	كلوي نوماد، chloe nomade، كلوي، chloe، نسائي، طحلب البلوط، برقوق، فريزيا، منعش، ترابي، كل المواسم	عطر نسائي عصري بطابع ترابي منعش يمزج بين حلاوة برقوق ميرابيل وعبير زهور الفريزيا الناعمة مع قاعدة رطبة ونظيفة من طحلب البلوط.	DHB-0126.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f29e0936-5075-4959-9f3a-8e0631322a56	DHB-0135	كوكو-شانيل-نوار-dhb-0135-b38b27	كوكو شانيل نوار	\N	Chanel Coco Noir	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.359	2026-07-04 21:12:37.956	women	both	t	/products/DHB-0135.webp	t	t	f	باتشولي، زهري، دافئ	كوكو شانيل نوار، كوكو نوار، coco noir، شانيل، chanel، نسائي، باتشولي، ورد، صندل، فانيلا، فخم، شتوي	عطر نسائي غامض وجذاب يفتتح بانتعاش الجريب فروت والبرغموت ليمهد لقلب من الورد والجرانيوم وقاعدة دافئة من الباتشولي وخشب الصندل والفانيلا.	DHB-0135.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
a51f935a-1c25-4c97-a1b0-f3a48f84110d	DHB-0148	لا-بيل-dhb-0148-cd1a3f	لا بيل	\N	Jean Paul Gaultier La Belle	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:12:39.175	women	winter	t	/products/DHB-0148.webp	t	t	f	حلو، فانيلا، دافئ	لا بيل، la belle، جان بول غوتييه، jean paul gaultier، jpg، نسائي، فانيلا، كمثرى، نجيل الهند، حلو، شتوي، فخم	عطر نسائي دافئ وشهي للغاية يجمع بجرأة بين حلاوة الكمثرى المخبوزة وعبق نجيل الهند (الفتيفير) وقاعدة مكثفة من الفانيلا الجذابة.	DHB-0148.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d2c53ac9-0886-43a5-845d-4b799b6ea413	DHB-0156	ميركل-dhb-0156-039dc0	ميركل	\N	Lancome Miracle	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:12:40.395	women	summer	t	/products/DHB-0156.webp	t	t	f	زهري، توابل، منعش	ميركل، miracle، لانكوم، lancome، نسائي، ليتشي، فريزيا، زنجبيل، فلفل، مسك، منعش، صيفي	عطر نسائي حيوي ومنعش يمزج بين حلاوة ثمار الليتشي وعبير زهور الفريزيا مع نفحات توابل دافئة من الزنجبيل والفلفل وقاعدة مسكية.	DHB-0156.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
1f91a997-29da-43c3-a68e-c685e4805c44	DHB-0163	نرسيسو-مسك-dhb-0163-9dda5b	نرسيسو مسك	\N	Narciso Rodriguez Pure Musc for Her	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.87	2026-07-04 21:12:41.616	women	both	t	/products/DHB-0163.webp	t	t	f	مسك، زهري، ناعم	نرسيسو مسك، pure musc، نارسيسو رودريغز، narciso rodriguez، نسائي، مسك أبيض، زهور بيضاء، كشمير، نظافة، ناعم، كل المواسم	عطر نسائي رائع يفيض بالنظافة والأنوثة، يرتكز بجمال استثنائي على المسك الأبيض النقي والزهور البيضاء وقاعدة مخملية دافئة من الكشمير والأخشاب الناعمة.	DHB-0163.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
70e4bf39-2a9d-4593-9ba1-8ec2e507809c	DHB-0179	جوتشي-بلوم-انتس-dhb-0179-4f3c66	جوتشي بلوم انتس	\N	Gucci Bloom Intense	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:12:42.838	women	both	t	/products/DHB-0179.webp	t	t	f	زهري، حلو، دافئ	جوتشي بلوم انتس، gucci bloom intense، جوتشي، gucci، نسائي، ياسمين، مسك الروم، جوز الهند، باتشولي، فخم، شتوي	عطر نسائي حسي ومكثف يتميز بعبير أزهار مسك الروم والياسمين مع دفء الباتشولي ولمسة كريمية ناعمة من جوز الهند.	DHB-0179.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3a198552-3977-46a7-9bec-cc0802770a86	DHB-0189	ارماني-كود-dhb-0189-d18993	ارماني كود	\N	Giorgio Armani Armani Code Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:12:44.061	men	winter	t	/products/DHB-0189.webp	t	t	f	توابل، جلدي، دافئ	ارماني كود، armani code، جورجيو ارماني، giorgio armani، رجالي، ليمون، يانسون نجمي، جلود، تبغ، تونكا، شتوي	عطر رجالي شرقي فخم يمزج بنعومة بين انتعاش البرغموت وحرارة اليانسون النجمي مع قلب من زهور الزيتون وقاعدة دافئة من الجلود والتبغ والتونكا.	DHB-0189.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f8f9d7f6-af89-40d0-8483-cd0efeeeb672	DHB-0016	امور-امور-dhb-0016-542391	امور امور	\N	Cacharel Amor Amor	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.061	2026-07-04 21:10:18.247	women	summer	t	/products/DHB-0016.webp	t	t	f	فواكه, حمضي, فانيلا	امور امور، amor amor، كاشريل، cacharel، نسائي، فواكه، حمضي، فانيلا، حيوي، منعش، كل المواسم	عطر نسائي مبهج وحيوي يفوح بنفحات حمضية منعشة من الجريب فروت والبرتقال مع قلب زهري فاكهي وقاعدة ناعمة من الفانيلا.	DHB-0016.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4ea8bb24-7ec1-4c34-b4dc-b08985addb07	DHB-0115	ڤلانتينو-بينك-dhb-0115-20c964	ڤلانتينو بينك	\N	Valentino Valentina Pink	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:12:46.508	women	both	t	/products/DHB-0115.webp	t	t	f	حلو، فواكه، زهري	فلانتينو بينك، valentina pink، فالنتينو، valentino، نسائي، فراولة، توت، شوكولا، برالين، ورد، صيفي، مبهج	عطر نسائي مبهج فائق الأنوثة يفتتح بحلاوة الفراولة والتوت الأسود مع باقة زهرية من الفاوانيا والورد وقاعدة شهية من الشوكولاته والبرالين.	DHB-0115.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
778e0606-669c-4c18-8e9f-55043d1115f0	DHB-0128	kool-water-dhb-0128-cc8764	kool water	\N	Davidoff Cool Water for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:12:47.727	women	summer	t	/products/DHB-0128.webp	t	t	f	بحري، منعش، زهري	كول وتر، cool water for women، دافيدوف، davidoff، نسائي، مائي، شمام، لوتس، منعش، صيفي	عطر نسائي صيفي منعش بطابع مائي يفوح بنفحات الشمام والليمون مع قلب رقيق من أزهار اللوتس والزنبق وقاعدة مسكية باردة.	DHB-0128.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b9aeb545-ec2a-43c1-85a1-56c24bb32a15	DHB-0134	كورماندل-dhb-0134-82b3ec	كورماندل	\N	Chanel Coromandel	نسائي	مكس	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.359	2026-07-04 21:12:48.948	women	winter	t	/products/DHB-0134.webp	t	t	f	شرقي، خشبي، حلو	كورماندل، coromandel، شانيل، chanel، مكس، رجالي، نسائي، باتشولي، شوكولاته بيضاء، بخور، أخشاب، فخم، شتوي، عطور النيش	عطر شرقي خشبي فاخر للجنسين من مجموعة شانيل الخاصة، يمزج بين دفء الباتشولي وحلاوة الشوكولاته البيضاء مع لمسة بخور شرقية غامضة وساحرة.	DHB-0134.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4b07031f-9a4b-46b9-b02d-6ee759270535	DHB-0146	لوڤ-ستوري-dhb-0146-66cc96	لوڤ ستوري	\N	Chloe Love Story	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:12:50.17	women	summer	t	/products/DHB-0146.webp	t	t	f	زهري، حمضي، منعش	لوف ستوري، love story، كلوي، chloe، نسائي، زهر البرتقال، نيرولي، ياسمين، منعش، صيفي	عطر نسائي منعش ورقيق يجسد أجواء قصص الحب الباريسية، يفوح بعبير زهر البرتقال والنيرولي المشرق مع باقة زهرية وقاعدة مسكية ناعمة.	DHB-0146.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
32d809a3-ffdb-4943-a764-d5a51ab9197b	DHB-0152	ماي-بربري-بلاك-dhb-0152-912b77	ماي بربري بلاك	\N	Burberry My Burberry Black	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.597	2026-07-04 21:12:51.634	women	winter	t	/products/DHB-0152.webp	t	t	f	حلو، دافئ، زهري	ماي بربري بلاك، my burberry black، بربري، burberry، نسائي، دراق، عنبر، ياسمين، باتشولي، فخم، شتوي	عطر نسائي شرقي دافئ وراقٍ يجمع بين حلاوة الدراق الناضج وجاذبية ياسمين سامباك مع قاعدة عنبرية مكثفة من الباتشولي والورد.	DHB-0152.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6ca38c24-ff0b-4de6-bb02-7728da1a152c	DHB-0164	نرسيسو-بودريه-dhb-0164-9a8b26	نرسيسو بودريه	\N	Narciso Rodriguez Narciso Poudree	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.87	2026-07-04 21:12:52.862	women	both	t	/products/DHB-0164.webp	t	t	f	بودري، مسك، زهري	نرسيسو بودريه، narciso poudree، نارسيسو رودريغز، narciso rodriguez، نسائي، بودرة، ياسمين، ورد، مسك، ناعم، كل المواسم	عطر نسائي مخملي ناعم للغاية بطابع بودري راقٍ يمزج بين ياسمين سامباك والورد الجوري وقلب من المسك الحسي وقاعدة خشبية من الأرز الأبيض.	DHB-0164.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
2c525b80-1cd2-430a-94c4-cd60d4aef1f1	DHB-0175	هوت-كوتور-dhb-0175-35d1f3	هوت كوتور	\N	Givenchy Hot Couture	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:12:54.086	women	winter	t	/products/DHB-0175.webp	t	t	f	فواكه، توابل، دافئ	هوت كوتور، hot couture، جيفنشي، givenchy، نسائي، توت، فلفل أسود، ماغنوليا، نجيل الهند، فخم، شتوي	عطر نسائي شرقي فخم يمزج بجرأة بين حلاوة التوت العليق وحرارة الفلفل الأسود مع قلب من زهور الماغنوليا وقاعدة عنبرية خشبية غنية وثابتة.	DHB-0175.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d5e13d3f-4976-4654-9ee1-4b7481113f8a	DHB-0114	ڤوكا-ڤيفا-dhb-0114-f25fd8	ڤوكا ڤيفا	\N	Valentino Voce Viva	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:12:56.555	women	summer	t	/products/DHB-0114.webp	t	t	f	زهري، حمضي، فانيلا	فوكا فيفا، voce viva، فالنتينو، valentino، نسائي، زهر البرتقال، ياسمين، فانيلا، حمضيات، منعش، كل المواسم	عطر نسائي دافئ وراقٍ يجمع بين نضارة الماندرين والبرغموت وقلب متألق من زهر البرتقال مع قاعدة كريمية من الفانيلا والمسك.	DHB-0114.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c48de798-90ac-46ab-8a7d-ce383a9b5197	DHB-0129	كاسيليا-dhb-0129-b3ce46	كاسيليا	\N	Pacoma Cassilia	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:12:57.802	women	both	t	/products/DHB-0129.webp	t	t	f	فواكه، زهري، حلو	كاسيليا، cassilia، باكوما، pacoma، نسائي، دراق، مشمش، توت، ياسمين، فانيلا، كلاسيكي	عطر نسائي كلاسيكي أنيق يتميز بتوليفة فاكهية حلوة من الدراق والمشمش والتوت مع باقة من الورد والياسمين وقاعدة دافئة من الفانيلا.	DHB-0129.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
11f0346a-b5bc-4898-b80d-3036af83d7dd	DHB-0132	كرستال-نوار-dhb-0132-6eb2f0	كرستال نوار	\N	Versace Crystal Noir	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.359	2026-07-04 21:12:59.024	women	winter	t	/products/DHB-0132.webp	t	t	f	حلو، دافئ، جوز هند	كريستال نوار، crystal noir، فيرزاتشي، versace، نسائي، جوز هند، توابل، غاردينيا، عنبر، فخم، شتوي	عطر نسائي شرقي فخم يتميز بنكهة جوز الهند الكريمة ودفء التوابل كالزنجبيل والفلفل مع أزهار الغاردينيا وقاعدة عنبرية عميقة وثابتة.	DHB-0132.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
4fe0dc57-7dbc-4219-b34d-e17eef96168a	DHB-0143	لانتروديت-روج-dhb-0143-df3c95	لانتروديت روج	\N	Givenchy L'Interdit Rouge	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:13:00.246	women	winter	t	/products/DHB-0143.webp	t	t	f	توابل، زهري، دافئ	لانتروديت روج، l'interdit rouge، جيفنشي، givenchy، نسائي، زنجبيل، برتقال أحمر، مسك الروم، خشب الصندل، شتوي، فخم، حار	عطر نسائي حار وحسي يمزج بين انتعاش البرتقال الأحمر وحرارة الزنجبيل والفلفل مع قلب زهري من مسك الروم وقاعدة من خشب الصندل والباتشولي.	DHB-0143.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
64a976f5-a78e-4dcd-88bd-7412386b16a7	DHB-0153	مس-ديور-dhb-0153-18efc5	مس ديور	\N	Dior Miss Dior Eau de Parfum (2021)	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.597	2026-07-04 21:13:01.466	women	both	t	/products/DHB-0153.webp	t	t	f	زهري، حلو، فانيلا	مس ديور، miss dior، ديور، dior، نسائي، زهور، ورد، فاوانيا، فانيلا، مسك، ناعم، كل المواسم	عطر نسائي رقيق وراقٍ يفوح بعبير الورد الجوري والفاوانيا الناعمة مع لمسات حلوة من الخوخ والدراق وقاعدة مسكية من الفانيلا.	DHB-0153.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
39591cde-e167-4fa1-b3cb-3a620edcfbe2	DHB-0162	مودرن-ميوس-dhb-0162-b69720	مودرن ميوس	\N	Estee Lauder Modern Muse	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.87	2026-07-04 21:13:02.719	women	summer	t	/products/DHB-0162.webp	t	t	f	زهري، مسك، منعش	مودرن ميوس، modern muse، استي لودر، estee lauder، نسائي، ياسمين، زهور، مسك، باتشولي، منعش، صيفي	عطر نسائي أنيق وعصري يحتفي بالياسمين الفواح والزهور البيضاء مع دفء المسك والباتشولي وخشب الأرز بطابع ناعم وجذاب.	DHB-0162.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5334b375-acf6-426b-b62d-96cfd55e373a	DHB-0174	ويك-اند-dhb-0174-3a656f	ويك اند	\N	Burberry Weekend for Women	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.892	2026-07-04 21:13:03.941	women	summer	t	/products/DHB-0174.webp	t	t	f	فواكه، زهري، منعش	ويك اند، weekend for women، بربري، burberry، نسائي، دراق، خوخ، ياسمين، زهور، منعش، صيفي	عطر نسائي منعش ومبهج للغاية يفوح بعبير فواكه الخوخ والدراق ونفحات زهرية رقيقة من الياقوتية والسوسن والورد مع لمسة صندل ومسك.	DHB-0174.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	DHB-0184	انفكتوس-الكسير-dhb-0184-39af23	انفكتوس  الكسير	\N	Paco Rabanne Invictus Victory Elixir	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.909	2026-07-04 21:13:05.161	men	winter	t	/products/DHB-0184.webp	t	t	f	حلو، فانيلا، دافئ	انفكتوس الكسير، invictus victory elixir، باكو رابان، paco rabanne، رجالي، فانيلا، تونكا، بخور، لافندر، شتوي، فخم	عطر رجالي شرقي فاخر ذو ثبات استثنائي، يجمع بين حلوى الفانيلا والتونكا الدافئة وعبير البخور واللافندر بطابع فخم وجذاب.	DHB-0184.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
89f69073-7c68-4e9e-852e-df3cf5cfe3d8	DHB-0112	سجناتور-dhb-0112-66163c	سجناتور	\N	Montblanc Signature	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:13:07.861	women	summer	t	/products/DHB-0112.webp	t	t	f	بودري، فانيلا، مسك	سجناتور، signature، مونت بلانك، montblanc، نسائي، مسك أبيض، فانيلا، ماغنوليا، نظافة، ناعم، كل المواسم	عطر نسائي ناعم يفيض بالنظافة والأنوثة، يرتكز على دفء المسك الأبيض والفانيلا مع قلب زهري منعش من الماغنوليا واليوسفي.	DHB-0112.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
53d206c0-c23e-4dd3-a128-783b456c7717	DHB-0123	فلور-بمب-dhb-0123-a79915	فلور بمب	\N	Viktor & Rolf Flowerbomb	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:13:09.082	women	winter	t	/products/DHB-0123.webp	t	t	f	زهري، حلو، باتشولي	فلور بمب، flowerbomb، فيكتور اند رولف، viktor rolf، نسائي، ياسمين، أوركيد، باتشولي، فانيلا، حلو، دافئ، شتوي	عطر نسائي حسي وشهير يتميز بانفجار باقة من الزهور الفاخرة كالياسمين والأوركيد والورد مع قاعدة دافئة من الباتشولي والفانيلا.	DHB-0123.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
29161948-28d9-496c-b580-4db234dcfd49	DHB-0133	كوكو-مدموزيل-dhb-0133-d3e49c	كوكو مدموزيل	\N	Chanel Coco Mademoiselle	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.359	2026-07-04 21:13:10.3	women	both	t	/products/DHB-0133.webp	t	t	f	حمضي، باتشولي، زهري	كوكو مدموزيل، coco mademoiselle، شانيل، chanel، نسائي، باتشولي، برتقال، ورد، فانيلا، فخم، كل المواسم	عطر نسائي أنيق للغاية يفوح بنضارة البرتقال والبرغموت وقلب أنثوي من الورد والياسمين وقاعدة دافئة وثابتة من الباتشولي والمسك.	DHB-0133.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
2b00c57b-169d-4e83-8445-8c167d1d6046	DHB-0145	لافيه-بل-ڤانيلا-dhb-0145-6db6b5	لافيه بل ڤانيلا	\N	Lancome La Vie Est Belle Vanille Nude	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:13:11.524	women	winter	t	/products/DHB-0145.webp	t	t	f	فانيلا، حلو، مسك	لافيه بل فانيلا، la vie est belle vanille nude، لانكوم، lancome، نسائي، فانيلا، مسك أبيض، ياسمين، صندل، ناعم، دافئ، شتوي	عطر نسائي دافئ وناعم للغاية يرتكز على نفحات فانيلا البوربون الغنية والمسك الأبيض مع قلب من الياسمين وقاعدة خشبية كريمية من خشب الصندل.	DHB-0145.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	DHB-0158	ماي-واي-dhb-0158-0886fc	ماي واي	\N	Giorgio Armani My Way	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:13:12.744	women	summer	t	/products/DHB-0158.webp	t	t	f	زهري، حمضي، فانيلا	ماي واي، my way، جورجيو ارماني، giorgio armani، نسائي، زهر البرتقال، مسك الروم، فانيلا، مسك، منعش، صيفي، كل المواسم	عطر نسائي عصري ومشرق يفتتح بنضارة البرغموت وزهر البرتقال مع قلب أنثوي فواح من مسك الروم والياسمين وقاعدة دافئة من الفانيلا والمسك الأبيض.	DHB-0158.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3c96be3f-cf06-4508-8a57-05b69cd36d4f	DHB-0165	نرسيسو-روج-dhb-0165-aaccf8	نرسيسو روج	\N	Narciso Rodriguez Narciso Rouge	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.87	2026-07-04 21:13:13.963	women	winter	t	/products/DHB-0165.webp	t	t	f	بودري، زهري، دافئ	نرسيسو روج، narciso rouge، نارسيسو رودريغز، narciso rodriguez، نسائي، سوسن، ورد، مسك، تونكا، أحمر، فخم، شتوي	عطر نسائي دافئ ومغرٍ يتميز بلون العاطفة الحمراء، يجمع بين نعومة السوسن البودري والورد الجوري مع قلب مسكي دافئ وقاعدة من التونكا وخشب الأرز.	DHB-0165.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
eaf4499d-bfc6-43c8-a27e-9ff3e293be31	DHB-0177	تويلي-dhb-0177-60d0d7	تويلي	\N	Hermès Twilly d'Hermès	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:13:15.184	women	both	t	/products/DHB-0177.webp	t	t	f	توابل، زهري، دافئ	تويلي، twilly dhermes، هيرمس، hermes، نسائي، زنجبيل، مسك الروم، صندل، فخم، كل المواسم	عطر نسائي أنيق وجريء يمزج بحيوية بين حرارة الزنجبيل وجاذبية مسك الروم وقاعدة كريمية دافئة من خشب الصندل.	DHB-0177.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	DHB-0183	انفكتوس-ليجند-dhb-0183-35feb6	انفكتوس ليجند	\N	Paco Rabanne Invictus Legend	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:13:16.404	men	summer	t	/products/DHB-0183.webp	t	t	f	بحري، توابل، دافئ	انفكتوس ليجند، invictus legend، باكو رابان، paco rabanne، رجالي، ملح البحر، جريب فروت، غار، عنبر، صيفي، منعش	عطر رجالي مائي حار يتميز بنفحات ملح البحر وجوز الهند المنعشة مع حرارة التوابل وقاعدة خشبية دافئة وثابتة من العنبر الأحمر.	DHB-0183.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ec873406-a5b2-4f2a-b007-522847f4fc86	DHB-0131	كنزو-فلور-dhb-0131-f6e38a	كنزو فلور	\N	Kenzo Flower by Kenzo	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.338	2026-07-04 21:13:18.843	women	winter	t	/products/DHB-0131.webp	t	t	f	بودري، زهري، فانيلا	كنزو فلور، flower by kenzo، كنزو، kenzo، نسائي، بودرة، ورد، بنفسج، فانيلا، مسك أبيض، ناعم، كل المواسم	عطر نسائي ناعم للغاية بطابع بودري فريد يمزج بين أزهار الورد البلغاري والبنفسج وحلاوة الفانيلا وقاعدة دافئة من المسك الأبيض.	DHB-0131.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
9175ac6c-b4ad-4ada-8062-9b1ccc096b17	DHB-0140	لابانتير-dhb-0140-1fda76	لابانتير	\N	Cartier La Panthere	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.36	2026-07-04 21:13:20.062	women	winter	t	/products/DHB-0140.webp	t	t	f	زهري، مسك، جلدي	لابانتير، la panthere، كارتير، cartier، نسائي، غاردينيا، مسك، فواكه مجففة، جلد, فخم، كل المواسم	عطر نسائي فاخر ومهيب يمزج بين حيوية الفواكه المجففة وجاذبية زهور الغاردينيا مع قاعدة دافئة من المسك والجلود الناعمة والباتشولي.	DHB-0140.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
28f85c3d-d6c8-42a7-9fa3-f946ac86218b	DHB-0151	ماي-بربري-dhb-0151-ec8cf9	ماي بربري	\N	Burberry My Burberry	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.572	2026-07-04 21:13:21.286	women	summer	t	/products/DHB-0151.webp	t	t	f	زهري، فواكه، منعش	ماي بربري، my burberry، بربري، burberry، نسائي، زهور، سفرجل، ورد، منعش، كل المواسم	عطر نسائي زهري أنيق يفوح بعبير أزهار البازلاء الحلوة والفريزيا مع نكهة السفرجل الذهبي المنعشة وقاعدة ترابية دافئة من الباتشولي والورد.	DHB-0151.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
531ebefb-9720-4d57-9031-13a9ae5d2666	DHB-0161	مون-جيرلان-dhb-0161-e38d95	مون جيرلان	\N	Guerlain Mon Guerlain	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:13:22.505	women	both	t	/products/DHB-0161.webp	t	t	f	فانيلا، أروماتك، زهري	مون جيرلان، mon guerlain، جيرلان، guerlain، نسائي، لافندر، فانيلا، ياسمين، سوسن، خشب الصندل، دافئ، كل المواسم	عطر نسائي دافئ وراقي للغاية يجمع بنعومة فريدة بين الخزامى (اللافندر) الفرنسي ونقاء الياسمين الهندي مع قاعدة غنية وكريمية من فانيلا تاهيتي وخشب الصندل.	DHB-0161.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	DHB-0169	يارا-dhb-0169-197c34	يارا	\N	Lattafa Yara	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.872	2026-07-04 21:13:23.966	women	both	t	/products/DHB-0169.webp	t	t	f	حلو، فواكه، فانيلا	يارا، yara، لطافة، lattafa، نسائي، حلو، فانيلا، فواكه استوائية، أوركيد، مسك، صيفي، مبهج، عطور شرقية	عطر نسائي شهير مفعم بالأنوثة يمزج بين حلاوة الفانيلا والنوتات الجورماند اللذيذة ونضارة الفواكه الاستوائية والأوركيد وقاعدة مسكية رقيقة.	DHB-0169.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
891f007b-b216-4b69-82ae-7bba793fa2d2	DHB-0181	انفكتوس-dhb-0181-11c7cb	انفكتوس	\N	Paco Rabanne Invictus	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:13:25.185	men	summer	t	/products/DHB-0181.webp	t	t	f	بحري، حمضي، خشبي	انفكتوس، invictus، باكو رابان، paco rabanne، رجالي، مائي، جريب فروت، غار، عنبر، صيفي، منعش	عطر رجالي منعش ومفعم بالحيوية يجسد القوة بمزيج من النوتات البحرية الباردة وقشر الجريب فروت مع قاعدة خشبية دافئة من العنبر.	DHB-0181.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
c9b4438b-d77e-4678-8ea5-0986c8de862e	DHB-0191	الوسام-dhb-0191-24e278	الوسام	\N	Rasasi Al Wisam Day	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.911	2026-07-04 21:13:26.403	men	both	t	/products/DHB-0191.webp	t	t	f	زهري، منعش، مسك	الوسام، al wisam day، الرصاصي، rasasi، رجالي، ورد، لافندر، خشب الصندل، مسك، منعش، كل المواسم، عطور شرقية	عطر رجالي شرقي عصري ومنعش يتميز بنفحات الورد واللافندر المشرقة مع قاعدة خشبية دافئة وثابتة من خشب الصندل والمسك الأبيض.	DHB-0191.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	DHB-0201	you-dhb-0201-eee3d1	You	\N	Giorgio Armani Stronger With You	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.937	2026-07-04 21:13:27.62	men	winter	t	/products/DHB-0201.webp	t	t	f	حلو، دافئ، توابل	سترونجر ويذ يو، stronger with you، جورجيو ارماني، giorgio armani، رجالي، كستناء، فانيلا، هيل، فلفل وردي، شتوي، فخم	عطر رجالي شرقي حسي يمزج بين حرارة الهيل والفلفل الوردي وحلاوة الكستناء المحمص مع قاعدة دافئة من الفانيلا والأخشاب الداكنة.	DHB-0201.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
72f5204b-71de-40c6-bab1-ed8d5307e9f4	DHB-0019	انسولنس-dhb-0019-ce9de8	انسولنس	\N	Guerlain Insolence Eau de Parfum	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.061	2026-07-04 21:10:29.583	women	both	t	/products/DHB-0019.webp	t	t	f	بودري، زهري، فواكه	انسولنس، insolence، جيرلان، guerlain، نسائي، بودري، بنفسج، توت، حلو، فخم، كل المواسم	عطر نسائي ساحر ومهيب يتميز بنفحات بودرية كثيفة من البنفسج والسوسن مع لمسة حلوة من التوت الأحمر.	DHB-0019.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
94bab4ad-8004-4231-a575-05d4778d1b31	DHB-0122	ديلان-بلو-dhb-0122-95e74b	ديلان بلو	\N	Versace Dylan Blue Pour Femme	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:13:30.07	women	summer	t	/products/DHB-0122.webp	t	t	f	فواكه، زهري، منعش	ديلان بلو، dylan blue pour femme، فيرزاتشي، versace، نسائي، تفاح، دراق، ياسمين، مسك، منعش، صيفي	عطر نسائي منعش ومشرق يمزج بين حلاوة التفاح الأخضر والدراق ونفحات الياسمين والورد مع قاعدة مسكية خشبية أنيقة.	DHB-0122.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
0d52c6a7-65d9-4b93-964f-72063f7ed24f	DHB-0138	ليبرا-إنتس-dhb-0138-4c84a8	ليبرا إنتس	\N	Yves Saint Laurent Libre Intense	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.36	2026-07-04 21:13:31.296	women	both	t	/products/DHB-0138.webp	t	t	f	حلو، فانيلا، دافئ	ليبرا انتس، libre intense، ايف سان لوران، yves saint laurent، ysl، نسائي، لافندر، زهر البرتقال، فانيلا، تونكا، شتوي، فخم	عطر نسائي شرقي مكثف ودافئ يعيد صياغة مفهوم الحرية بتركيز أعلى من الفانيلا والتونكا واللافندر مع عبير زهر البرتقال والأوركيد الساحر.	DHB-0138.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
f1a154df-b14e-4464-919a-227c2911ba71	DHB-0144	لافيه-بل-dhb-0144-2bcb3d	لافيه بل	\N	Lancome La Vie Est Belle	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:13:32.517	women	winter	t	/products/DHB-0144.webp	t	t	f	حلو، فواكه، باتشولي	لافيه بل، la vie est belle، لانكوم، lancome، نسائي، برالين، فانيلا، ياسمين، سوسن، باتشولي، حلو، شتوي	عطر نسائي حلو وشهير يفيض بالسعادة والجمال، يمزج بين حلاوة البرالين والفانيلا مع ثمار الكمثرى والتوت وقاعدة دافئة من الباتشولي.	DHB-0144.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	DHB-0157	مارلين-dhb-0157-5341ff	مارلين	\N	Marilyn by Marilyn Miglin	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:13:33.737	women	both	t	/products/DHB-0157.webp	t	t	f	فواكه، زهري، دافئ	مارلين، marilyn، مارلين ميجلين، marilyn miglin، نسائي، دراق، مشمش، زهور، مسك، عنبر، صندل، كلاسيكي	عطر نسائي كلاسيكي دافئ يمزج بنعومة بين حلاوة الدراق والمشمش وعبير الورد ومسك الروم مع قاعدة غنية وثابتة من العنبر والمسك وخشب الصندل.	DHB-0157.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
a46bce06-0dfc-4138-9fdd-54c90d303733	DHB-0170	نينا-باي-نينا-dhb-0170-902e9a	نينا باي نينا	\N	Nina Ricci Nina	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.873	2026-07-04 21:13:34.96	women	summer	t	/products/DHB-0170.webp	t	t	f	حلو، فواكه، حمضي	نينا باي نينا، nina ricci nina، نينا ريتشي، nina ricci، نسائي، تفاح أحمر، شوكولا، برالين، حمضيات، صيفي، منعش	عطر نسائي مبهج يتميز بنكهة التفاح والكراميل وحلوى البرالين مع انتعاش ليمون الكي والبرغموت وقاعدة مسكية خشبية ناعمة.	DHB-0170.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
92ddbf21-eeb8-4dbf-b375-67b791f6f189	DHB-0172	هوجو-بوس-dhb-0172-30197f	هوجو بوس	\N	Hugo Boss Hugo Woman	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.892	2026-07-04 21:13:36.179	women	summer	t	/products/DHB-0172.webp	t	t	f	فواكه، زهري، منعش	هوجو بوس، hugo woman، هوجو بوس، hugo boss، نسائي، تفاح، شمام، ياسمين، صندل، منعش، صيفي	عطر نسائي حيوي ومنعش يمزج بين حيوية فواكه الصيف كالتفاح الأخضر والشمام والدراق وباقة زهرية ناعمة مع قاعدة خشبية دافئة.	DHB-0172.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6fa838ee-ec16-4d7e-99ee-001963647cf0	DHB-0182	انفكتوس-انتس-dhb-0182-109c73	انفكتوس انتس	\N	Paco Rabanne Invictus Intense	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:13:37.398	men	winter	t	/products/DHB-0182.webp	t	t	f	شرقي، دافئ، توابل	انفكتوس انتس، invictus intense، باكو رابان، paco rabanne، رجالي، برتقال، فلفل أسود، عنبر، شتوي، فخم	عطر رجالي شرقي مكثف يمزج بين دفء العنبر وحرارة الفلفل الأسود مع عبير زهر البرتقال بطابع حسي وقوي ثابت.	DHB-0182.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3595cb72-9575-4b6b-93bd-fee286dacd22	DHB-0139	كارات-dhb-0139-b0cc4e	كارات	\N	Cartier Carat	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:19.36	2026-07-04 21:13:40.098	women	summer	t	/products/DHB-0139.webp	t	t	f	زهري، منعش، أخضر	كارات، carat، كارتير، cartier، نسائي، زهور، بنفسج، لوتس، ليلك، ناعم، صيفي، منعش	عطر نسائي ناعم ومشرق يجسد ألوان قوس قزح من خلال باقة سباعية من الأزهار كالبنفسج والزنبق والنرجس والياقوتية مع نوتات خضراء منعشة.	DHB-0139.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
13fa70e8-af8d-4dc6-9dc0-209dadc113ad	DHB-0149	ليدي-مليون-dhb-0149-257cdc	ليدي مليون	\N	Paco Rabanne Lady Million	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:22.571	2026-07-04 21:13:41.318	women	winter	t	/products/DHB-0149.webp	t	t	f	حلو، زهري، فواكه	ليدي مليون، lady million، باكو رابان، paco rabanne، نسائي، عسل، ياسمين، توت، برتقال، فخم، شتوي	عطر نسائي حسي وجذاب يجمع بين عسل النحل والكرز الأبيض وتوت العليق البري مع قلب متألق من أزهار الياسمين وزهر البرتقال وقاعدة دافئة من الباتشولي.	DHB-0149.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
29326dc6-bbce-4b7d-bdf7-14a183f91d29	DHB-0159	مون-باريس-dhb-0159-be0721	مون باريس	\N	Yves Saint Laurent Mon Paris	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:25.598	2026-07-04 21:13:42.538	women	both	t	/products/DHB-0159.webp	t	t	f	فواكه، حلو، باتشولي	مون باريس، mon paris، ايف سان لوران، yves saint laurent، ysl، نسائي، فراولة، توت، كمثرى، باتشولي، ياسمين، حلو، كل المواسم	عطر نسائي حسي ومثير يتميز بانفجار فاكهي حلو من الفراولة والتوت والكمثرى مع قلب من الياسمين والفاوانيا وقاعدة ترابية غنية من الباتشولي والمسك.	DHB-0159.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
d8f8529a-9239-4f99-a49c-1d88abc62488	DHB-0167	نرسيسو-فور-هير-بينك-dhb-0167-dc3f01	نرسيسو  فور هير بينك	\N	Narciso Rodriguez For Her EDP (Pink Bottle)	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:28.87	2026-07-04 21:13:43.767	women	both	t	/products/DHB-0167.webp	t	t	f	مسك، زهري، دافئ	نرسيسو فور هير بينك، narciso for her edp، نارسيسو رودريغز، narciso rodriguez، نسائي، ورد، دراق، مسك، عنبر، باتشولي، فخم	عطر نسائي فائق الأنوثة والجاذبية يمزج بنعومة بالغة بين عبير الورد الجوري وحلاوة الدراق وقلب مسكي حسي دافئ مع قاعدة من الباتشولي.	DHB-0167.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
93ece844-6dee-4add-bc57-7dec482e45ce	DHB-0178	روج-ترافلجار-dhb-0178-bb0bc9	روج  ترافلجار	\N	Dior Rouge Trafalgar	نسائي	نسائي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:31.893	2026-07-04 21:13:44.988	women	summer	t	/products/DHB-0178.webp	t	t	f	فواكه، زهري، منعش	روج ترافلجار، rouge trafalgar، ديور، dior، نسائي، فراولة، كرز، ياسمين، مسك، صيفي، منعش	عطر نسائي منعش ومبهج يفوح بعبير الفواكه الحمراء كالفراولة والكرز مع لمسة حمضيات وقاعدة مسكية خشبية رقيقة.	DHB-0178.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
21e86815-37ef-4bb1-9723-d07f96aec3f5	DHB-0190	اومو-dhb-0190-080e77	اومو	\N	Valentino Uomo	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.911	2026-07-04 21:13:46.209	men	winter	t	/products/DHB-0190.webp	t	t	f	حلو، جلدي، دافئ	فالنتينو اومو، valentino uomo، فالنتينو، valentino، رجالي، برغموت، بندق، شوكولاته، قهوة، جلود، شتوي، فخم	عطر رجالي شرقي شهي يمزج بين انتعاش البرغموت وحلاوة البندق والشوكولاته والقهوة المحمصة مع قاعدة كلاسيكية دافئة من الجلود والأخشاب.	DHB-0190.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b285c514-7aa1-43df-a7f1-2474eaf6ba5d	DHB-0200	عنبر-you-dhb-0200-940e7a	عنبر You	\N	Giorgio Armani Stronger With You Amber	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.937	2026-07-04 21:13:47.43	men	winter	t	/products/DHB-0200.webp	t	t	f	حلو، دافئ، فانيلا	عنبر يو، stronger with you amber، جورجيو ارماني، giorgio armani، رجالي، عنبر، لافندر، فانيلا، شتوي، دافئ، فخم	عطر رجالي شرقي فاخر ودافئ يجمع بين جاذبية العنبر السائل ونقاء اللافندر وقاعدة كريمية حلوة من فانيلا البوربون الغنية.	DHB-0200.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
33fd7ff8-058d-4dce-9fd1-73325df504b1	DHB-0211	بوس-بوتيلد-dhb-0211-cced80	بوس بوتيلد	\N	Hugo Boss Boss Bottled	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:13:48.65	men	winter	t	/products/DHB-0211.webp	t	t	f	حلو، توابل، خشبي	بوس بوتيلد، boss bottled، هوجو بوس، hugo boss، رجالي، تفاح، قرفة، قرنفل، صندل، فانيلا، كلاسيكي، كل المواسم	عطر رجالي كلاسيكي راقٍ ومميز يمزج بين حلاوة التفاح وحرارة القرفة والقرنفل مع قاعدة خشبية دافئة من الصندل والأرز والفانيلا.	DHB-0211.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	DHB-0185	الور-هوم-dhb-0185-ec1093	الور هوم	\N	Chanel Allure Homme	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:13:49.872	men	both	t	/products/DHB-0185.webp	t	t	f	حمضي، توابل، دافئ	الور هوم، allure homme، شانيل، chanel، رجالي، خوخ، زنجبيل، صندل، فانيلا، فخم، كل المواسم	عطر رجالي كلاسيكي راقٍ يمزج بين نضارة الحمضيات وحرارة الزنجبيل مع قلب زهري دافئ وقاعدة خشبية كريمية من الفانيلا والصندل.	DHB-0185.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
75c176cb-6188-420d-b64c-d60bce019552	DHB-0198	اكوا-دي-جيو-dhb-0198-4304a8	اكوا دي جيو	\N	Giorgio Armani Acqua Di Gio Men	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.937	2026-07-04 21:13:51.183	men	summer	t	/products/DHB-0198.webp	t	t	f	بحري، حمضي، منعش	اكوا دي جيو، acqua di gio، جورجيو ارماني، giorgio armani، رجالي، ليمون، نوتات بحرية، ياسمين، اكليل الجبل، صيفي، منعش	عطر رجالي صيفي أيقوني يجسد انتعاش البحر، يمزج بين النوتات البحرية المالحة وحموضة الليمون مع قلب من إكليل الجبل وقاعدة مسكية دافئة.	DHB-0198.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3b17c376-e2d2-494b-ae1c-e230803d688d	DHB-0208	بوس-انلمتيد-dhb-0208-5e2793	بوس انلمتيد	\N	Hugo Boss Boss Bottled Unlimited	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:13:52.406	men	summer	t	/products/DHB-0208.webp	t	t	f	منعش، فواكه، أخضر	بوس انلمتيد، boss bottled unlimited، هوجو بوس، hugo boss، رجالي، نعناع، أناناس، قرفة، مسك أبيض، صيفي، منعش	عطر رجالي منعش وحيوي يفوح بنضارة أوراق النعناع وحلاوة الأناناس الاستوائي مع قاعدة دافئة من المسك الأبيض وخشب الصندل.	DHB-0208.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	DHB-0214	بولو-اكسبلور-dhb-0214-771bfd	بولو اكسبلور	\N	Ralph Lauren Polo Explorer	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:13:53.628	men	winter	t	/products/DHB-0214.webp	t	t	f	خشبي، جلدي، دافئ	بولو اكسبلورر، polo explorer، بولو، polo، رالف لورين، ralph lauren، رجالي، ماندرين، كزبرة، جلود، صنوبر، خريف	عطر رجالي خشبي دافئ يتميز بنفحات الصنوبر والكزبرة وجوزة الطيب مع انتعاش الماندرين وقاعدة دافئة وثابتة من الجلود والباتشولي.	DHB-0214.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
775919b4-f2a5-4d06-8a03-b75f8f322d6a	DHB-0225	جيفنشي-باي-dhb-0225-a7bf86	جيفنشي باي	\N	Givenchy Pi	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.248	2026-07-04 21:13:54.848	men	winter	t	/products/DHB-0225.webp	t	t	f	حلو، فانيلا، دافئ	جيفنشي باي، givenchy pi، جيفنشي، givenchy، رجالي، فانيلا، لوز، تونكا، يوسفي، روزماري، شتوي، فخم	عطر رجالي شرقي فخم يرتكز على حلاوة الفانيلا واللوز المر الدافئة الممزوجة بنضارة اليوسفي وإكليل الجبل وقاعدة من التونكا والجاوي.	DHB-0225.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f716cb4e-a53b-4637-9305-15a4ae9cd578	DHB-0241	جوتشي-جلتي-dhb-0241-6891d9	جوتشي جلتي	\N	Gucci Guilty Pour Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.24	2026-07-04 21:13:56.311	men	summer	t	/products/DHB-0241.webp	t	t	f	حمضي، أروماتك، خشبي	جوتشي جلتي، gucci guilty pour homme، جوتشي، gucci، رجالي، لافندر، ليمون، زهر البرتقال، أرز، باتشولي، كل المواسم	عطر رجالي أنيق يفوح بنضارة ليمون أمالفي وعبير اللافندر وزهر البرتقال مع قاعدة خشبية دافئة وثابتة من خشب الأرز والباتشولي.	DHB-0241.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f0a75e56-d4da-429e-98b7-92d643d55138	DHB-0187	ايڤوريا-dhb-0187-7edc7c	ايڤوريا	\N	Calvin Klein Euphoria Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:13:57.534	men	winter	t	/products/DHB-0187.webp	t	t	f	توابل، خشبية، دافئة	ايفوريا رجالي، euphoria men، كالفن كلاين، calvin klein، رجالي، زنجبيل، فلفل، ريحان أسود، عنبر، جلود، خريف	عطر رجالي شرقي خشبي يمزج بين حرارة الزنجبيل والفلفل ونضارة الريحان الأسود مع قاعدة دافئة من العنبر والجلود الفاخرة.	DHB-0187.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
a93d4a47-dece-48ef-9306-57f56fa499d5	DHB-0199	توباكو-you-dhb-0199-b710fe	توباكو You	\N	Giorgio Armani Stronger With You Tobacco	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.937	2026-07-04 21:13:58.758	men	winter	t	/products/DHB-0199.webp	t	t	f	حلو، دافئ، توابل	توباكو يو، stronger with you tobacco، جورجيو ارماني، giorgio armani، رجالي، تبغ، كستناء، فانيلا، توابل، شتوي، فخم	عطر رجالي دافئ ومهيب يمزج بجرأة بين حلاوة الكستناء والفانيلا مع رائحة التبغ الغنية وحرارة التوابل الشرقية الفاخرة.	DHB-0199.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3f9b2867-b203-475b-85c5-e7faeb445d21	DHB-0210	بوس-اورانج-dhb-0210-32af02	بوس اورانج	\N	Hugo Boss Boss Orange for Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:13:59.977	men	winter	t	/products/DHB-0210.webp	t	t	f	حلو، دافئ، خشبي	بوس اورانج رجالي، boss orange for men، هوجو بوس، hugo boss، رجالي، تفاح، هيل، بخور، فانيلا، أخشاب، كل المواسم	عطر رجالي مبهج ودافئ يجمع بين حلاوة التفاح الأحمر ونضارة الكزبرة مع قلب من البخور وقاعدة دافئة من الفانيلا والأخشاب.	DHB-0210.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5deff441-fa44-45dd-b557-2bae4131ed87	DHB-0219	بولو-ريد-dhb-0219-46e1bb	بولو ريد	\N	Ralph Lauren Polo Red	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.228	2026-07-04 21:14:01.198	men	winter	t	/products/DHB-0219.webp	t	t	f	حمضي، توابل، دافئ	بولو ريد، polo red، بولو، polo، رالف لورين، ralph lauren، رجالي، توت بري، زعفران، قهوة، خشب الأحمر، شتوي	عطر رجالي حار وجريء يتميز بلون الجاذبية الحمراء، يجمع بين حلاوة التوت البري والليمون الإيطالي وحرارة الزعفران وقاعدة دافئة من القهوة والأخشاب.	DHB-0219.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b1f9839a-1f0d-454f-8bee-e7f62e3b3336	DHB-0228	برارا-هوم-dhb-0228-554047	برارا هوم	\N	Prada L'Homme	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.249	2026-07-04 21:14:02.419	men	both	t	/products/DHB-0228.webp	t	t	f	بودري، زهري، منعش	برادا هوم، prada lhomme، برادا، prada، رجالي، سوسن، نيرولي، بنفسج، عنبر، صابوني، نظافة، ناعم، كل المواسم	عطر رجالي أنيق يفيض بالنظافة والانتعاش، يرتكز على نعومة زهرة السوسن البودرية والنيرولي مع قاعدة دافئة من العنبر وخشب الصندل.	DHB-0228.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
080c200f-9f88-4fb3-9aeb-c460331b4fad	DHB-0237	تومي-بوي-dhb-0237-8e3b24	تومي بوي	\N	Tommy Hilfiger Tommy	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:03.64	men	summer	t	/products/DHB-0237.webp	t	t	f	منعش، حمضي، فواكه	تومي بوي، tommy boy، تومي هيلفيغر، tommy hilfiger، رجالي، نعناع، جريب فروت، تفاح، صيفي، منعش	عطر رجالي صيفي كلاسيكي مفعم بالانتعاش والحيوية، يمزج بين أوراق النعناع والجريب فروت وحلاوة التفاح وقاعدة دافئة من خشب القيقب والعنبر.	DHB-0237.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
d5184e03-f50a-4e0f-b448-3f7d6d1090e3	DHB-0188	ايڤوريا-انتس-dhb-0188-13c756	ايڤوريا انتس	\N	Calvin Klein Euphoria Men Intense	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:34.91	2026-07-04 21:14:04.862	men	winter	t	/products/DHB-0188.webp	t	t	f	شرقية، دافئة، توابل	ايفوريا انتس رجالي، euphoria men intense، كالفن كلاين، calvin klein، رجالي، زنجبيل، فلفل، مر، عود، عنبر، شتوي	عطر رجالي شرقي دافئ يتميز بتوليفة مكثفة تجمع بين توابل الزنجبيل والفلفل ونفحات الراتنجات الفاخرة كالمر واللبان مع العنبر والعود.	DHB-0188.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3b4062d1-5f9b-4db6-95a0-713bdc0379fd	DHB-0196	اونلي-ذا-بريڤ-dhb-0196-970d7c	اونلي ذا بريڤ	\N	Diesel Only The Brave	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.935	2026-07-04 21:14:06.083	men	winter	t	/products/DHB-0196.webp	t	t	f	جلدي، حمضي، دافئ	اونلي ذا بريف، only the brave، ديزل، diesel، رجالي، ليمون، ماندرين، بنفسج، جلود، عنبر، كل المواسم	عطر رجالي قوي وجريء يفتتح بانتعاش الليمون والماندرين وقلب من أوراق البنفسج وقاعدة دافئة وثابتة من الجلود والعنبر وخشب الأرز.	DHB-0196.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	DHB-0205	x-s-dhb-0205-429068	X.S	\N	Paco Rabanne XS for Men	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:07.303	men	summer	t	/products/DHB-0205.webp	t	t	f	أروماتك، منعش، خشبي	اكس اس، xs for men، باكو رابان، paco rabanne، رجالي، نعناع، اكليل الجبل، خشب الأرز، مسك، صيفي، منعش	عطر رجالي منعش كلاسيكي يجمع بين نضارة النعناع وإكليل الجبل والليمون مع باقة عشبية وقاعدة دافئة من خشب الأرز والمسك.	DHB-0205.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	DHB-0215	بلاك-اوركيد-dhb-0215-50b943	بلاك اوركيد	\N	Tom Ford Black Orchid	رجالي	مكس	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:14:08.523	men	winter	t	/products/DHB-0215.webp	t	t	f	شرقي، حلو، دافئ	بلاك اوركيد، black orchid، توم فورد، tom ford، مكس، رجالي، نسائي، شوكولاته، أوركيد، بخور، عنبر، باتشولي، فخم، عطور النيش	عطر شرقي فخم وغامض للجنسين، يمزج بين حلاوة الشوكولاته المكسيكية الداكنة ونقاء زهور الأوركيد السوداء مع البخور الباتشولي الدافئ.	DHB-0215.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
e946b50a-bb23-422f-901c-bc9834e0b9d8	DHB-0226	جيفنشي-بلاي-dhb-0226-9d5f7d	جيفنشي بلاي	\N	Givenchy Play for Him	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.248	2026-07-04 21:14:09.746	men	both	t	/products/DHB-0226.webp	t	t	f	حمضي، توابل، دافئ	جيفنشي بلاي، givenchy play for him، جيفنشي، givenchy، رجالي، جريب فروت، برغموت، فلفل أسود، قهوة، فتيفير، منعش	عطر رجالي حيوي وحديث يمزج بين حمضية الجريب فروت والبرغموت وحرارة الفلفل الأسود مع نوتات خشب الأميريس وقاعدة من نجيل الهند.	DHB-0226.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
1116477c-81da-486d-98a7-5e92c071c2e4	DHB-0235	212-vip-dhb-0235-df875d	212 VIP	\N	Carolina Herrera 212 VIP Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:10.968	men	winter	t	/products/DHB-0235.webp	t	t	f	منعش، توابل، دافئ	٢١٢ في اي بي، 212 vip men، كارولينا هريرا، carolina herrera، رجالي، باشون فروت، زنجبيل، نعناع، جلد، عنبر، فخم، شتوي	عطر رجالي حيوي وجذاب يفتتح بحيوية ثمار الباشون فروت والنعناع والزنجبيل مع قاعدة دافئة من الجلود والعنبر والأخشاب الداكنة.	DHB-0235.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
27e2641e-f3aa-472b-901c-fb9e6c121517	DHB-0193	اسمياكي-dhb-0193-a1dc67	اسمياكي	\N	Issey Miyake L'Eau d'Issey pour Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.935	2026-07-04 21:14:12.431	men	summer	t	/products/DHB-0193.webp	t	t	f	حمضي، منعش، خشبي	اسمياكي رجالي، leau dissey pour homme، ايسي مياكي، issey miyake، رجالي، يوزو، ليمون، جوزة الطيب، صندل، صيفي، منعش	عطر رجالي منعش ومشرق يتميز بنفحات ليمون اليوزو الياباني والبرغموت وجوزة الطيب مع قلب زهري مائي وقاعدة خشبية ناعمة من خشب الصندل.	DHB-0193.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
145289af-7463-4277-a429-6bf5c918586f	DHB-0204	اكسبلور-dhb-0204-2fb28c	اكسبلور	\N	Montblanc Explorer	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:13.657	men	summer	t	/products/DHB-0204.webp	t	t	f	حمضي، خشبية، دافئة	اكسبلورر، explorer، مونت بلانك، montblanc، رجالي، برغموت، فلفل وردي، فتيفير، أمبروكسان، جلود، كل المواسم	عطر رجالي عصري وراقٍ يفتتح ببرودة البرغموت والفلفل الوردي مع قلب ترابي من نجيل الهند وقاعدة دافئة من الأمبروكسان والجلود.	DHB-0204.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
c6ced70f-f594-42f5-a79a-2b9d055c7a5d	DHB-0220	بولو-بلو-dhb-0220-7ed4c0	بولو بلو	\N	Ralph Lauren Polo Blue	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.228	2026-07-04 21:14:14.88	men	both	t	/products/DHB-0220.webp	t	t	f	بحري، منعش، جلدي	بولو بلو، polo blue، بولو، polo، رالف لورين، ralph lauren، رجالي، خيار، شمام، ريحان، جلود، مسك، صيفي، منعش	عطر رجالي صيفي منعش يفوح ببرودة الخيار والشمام واليوسفي مع قلب من الريحان والميرمية وقاعدة دافئة من الجلد السويدي والمسك.	DHB-0220.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
4844ec82-0feb-4e33-95eb-f32cc0bba616	DHB-0230	باد-بوي-dhb-0230-725020	باد بوي	\N	Carolina Herrera Bad Boy	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.249	2026-07-04 21:14:16.102	men	winter	t	/products/DHB-0230.webp	t	t	f	توابل، دافئ، حلو	باد بوي، bad boy، كارولينا هريرا، carolina herrera، رجالي، فلفل أسود، كاكاو، تونكا، ميرمية، أخشاب، فخم، شتوي	عطر رجالي شرقي فخم يتميز بمزيج حار من الفلفل الأسود والأبيض ونضارة الميرمية مع قاعدة حلوة دافئة من الكاكاو وتونكا الأخشاب.	DHB-0230.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3f1fea43-0c89-4a0f-9c85-69a142b7de27	DHB-0233	212-vip-black-dhb-0233-06173d	212 VIP Black	\N	Carolina Herrera 212 VIP Black	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:17.324	men	winter	t	/products/DHB-0233.webp	t	t	f	أروماتك، حلو، دافئ	٢١٢ في اي بي بلاك، 212 vip black، كارولينا هريرا، carolina herrera، رجالي، شمر، لافندر، فانيلا سوداء، مسك، شتوي، فخم	عطر رجالي شرقي فخم وغامض يمزج بين حيوية نبات الأفسنتين واللافندر وقاعدة حلوة دافئة من الفانيلا السوداء والمسك الحسي.	DHB-0233.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3d99d65a-33df-4ebe-bc41-2ad546d6790c	DHB-0192	اراميس-ديڤن-dhb-0192-8900c5	اراميس ديڤن	\N	Aramis Devin	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.935	2026-07-04 21:14:18.543	men	winter	t	/products/DHB-0192.webp	t	t	f	أخضر، توابل، جلدي	اراميس ديفن، aramis devin، اراميس، aramis، رجالي، ريحان، صنوبر، قرفة، جلود، طحلب البلوط، كلاسيكي، شتوي	عطر رجالي كلاسيكي عتيق بطابع عشبي قوي يمزج بين نضارة أوراق الصنوبر والريحان وحرارة القرفة مع قاعدة دافئة من الجلود وطحلب البلوط.	DHB-0192.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
7041706b-03c9-4811-9e66-5f44df1e8c2d	DHB-0202	انتنسلي-you-dhb-0202-afc745	انتنسلي You	\N	Giorgio Armani Stronger With You Intensely	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:19.765	men	winter	t	/products/DHB-0202.webp	t	t	f	حلو، دافئ، فانيلا	يو انتنسلي، stronger with you intensely، جورجيو ارماني، giorgio armani، رجالي، كراميل، فانيلا، دارسين، قرفة، شتوي، فخم	عطر رجالي شرقي دافئ وشهي للغاية يتميز بنكهة التوفي والكراميل الذائب الممزوجة بحرارة القرفة والقاعدة الكريمية للفانيلا والتونكا.	DHB-0202.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
6059c523-1080-40f7-85a1-059e006f4086	DHB-0212	بلاتينيوم-dhb-0212-8583c5	بلاتينيوم	\N	Chanel Egoiste Platinum	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:14:20.985	men	summer	t	/products/DHB-0212.webp	t	t	f	منعش، زهري، خشبي	بلاتينيوم ايقويست، egoiste platinum، شانيل، chanel، رجالي، لافندر، اكليل الجبل، ميرمية، صندل، فتيفير، كلاسيكي، منعش	عطر رجالي كلاسيكي منعش وجذاب يمزج بين عبير اللافندر وإكليل الجبل ونضارة الميرمية مع قاعدة خشبية دافئة من الصندل ونجيل الهند.	DHB-0212.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	DHB-0224	بلو-ليبل-dhb-0224-948cdb	بلو ليبل	\N	Givenchy Pour Homme Blue Label	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.248	2026-07-04 21:14:22.206	men	summer	t	/products/DHB-0224.webp	t	t	f	حمضي، توابل، منعش	بلو ليبل، blue label، جيفنشي، givenchy، رجالي، جريب فروت، برغموت، هيل، فلفل، فتيفير، صيفي، منعش	عطر رجالي منعش ومشرق يمزج بين حمضية الجريب فروت والبرغموت وحرارة الفلفل والهيل مع قاعدة خشبية دافئة من نجيل الهند والأرز.	DHB-0224.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	DHB-0238	تشيك-dhb-0238-f526ed	تشيك	\N	Carolina Herrera Chic For Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:23.43	men	winter	t	/products/DHB-0238.webp	t	t	f	منعش، توابل، خشبي	تشيك رجالي، chic for men، كارولينا هريرا، carolina herrera، رجالي، بطيخ، هيل، دارسين، فلفل، صندل، منعش، كل المواسم	عطر رجالي منعش ومميز يمزج بين حيوية البطيخ الأحمر المنعش وحرارة الهيل والقرفة والفلفل الأسود مع قاعدة خشبية دافئة من الصندل والأرز.	DHB-0238.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
4be392bc-6e58-405d-b73f-b6cc1f74d1ef	DHB-0197	اتيرنتي-dhb-0197-9b9466	اتيرنتي	\N	Calvin Klein Eternity for Men	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.936	2026-07-04 21:14:24.652	men	summer	t	/products/DHB-0197.webp	t	t	f	منعش، حمضي، زهري	اتيرنتي رجالي، eternity for men، كالفن كلاين، calvin klein، رجالي، لافندر، ليمون، ريحان، صندل، منعش، صيفي	عطر رجالي منعش وكلاسيكي مميز يمزج بين عبير اللافندر والليمون ونضارة الريحان والميرمية مع قاعدة دافئة من خشب الصندل والمسك.	DHB-0197.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
7d0bdc52-ed96-4374-9774-ce78d2d2bca6	DHB-0207	بلاك-x-s-بيور-dhb-0207-c9df11	بلاك X.S بيور	\N	Paco Rabanne Pure XS for Him	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:25.874	men	winter	t	/products/DHB-0207.webp	t	t	f	حلو، دافئ، توابل	بلاك اكس اس بيور، pure xs for him، باكو رابان، paco rabanne، رجالي، زنجبيل، فانيلا، قرفة، عنبر، لوز، شتوي، فخم	عطر رجالي دافئ وحسي يمزج بين حرارة الزنجبيل وحلاوة الفانيلا والقرفة مع قاعدة دافئة وثابتة من الجلود والعنبر والمر.	DHB-0207.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
828cd953-6202-4314-8377-610c699ac17a	DHB-0221	بولغاري-اكوا-dhb-0221-d6f8e6	بولغاري اكوا	\N	Bvlgari Aqva Pour Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.228	2026-07-04 21:14:27.096	men	summer	t	/products/DHB-0221.webp	t	t	f	بحري، حمضي، منعش	بولغاري اكوا، aqva pour homme، بولغاري، bvlgari، رجالي، نوتات بحرية، يوسفي، لافندر، صنوبر، صيفي، منعش	عطر رجالي صيفي منعش وبارد يفوح بعبير اليوسفي وأوراق البرتقال المر وقلب مائي من الأعشاب البحرية واللافندر وقاعدة خشبية عنبرية.	DHB-0221.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
7ad64a45-a0d5-42f5-8fa8-4062a120de8c	DHB-0231	بنتلي-ازارو-dhb-0231-8647bf	بنتلي ازارو	\N	Bentley for Men Azure	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.249	2026-07-04 21:14:28.603	men	summer	t	/products/DHB-0231.webp	t	t	f	بحري، منعش، أروماتك	بنتلي ازارو، bentley azure، بنتلي، bentley، رجالي، أناناس، أوراق البنفسج، شاي، ميرمية، منعش، صيفي	عطر رجالي منعش يتميز بطابع مائي حيوي يمزج بين حلاوة الأناناس ونضارة أوراق البنفسج والشاي الأخضر وقاعدة خشبية ناعمة من الكشمير.	DHB-0231.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f77a3a8c-e1bd-4c84-9326-a1e3e7241100	DHB-0234	212-sexy-dhb-0234-c3b9d4	212 Sexy	\N	Carolina Herrera 212 Sexy Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:29.828	men	winter	t	/products/DHB-0234.webp	t	t	f	حلو، توابل، دافئ	٢١٢ سكاسي، 212 sexy men، كارولينا هريرا، carolina herrera، رجالي، هيل، فلفل، فانيلا، صندل، عنبر، فخم، شتوي	عطر رجالي حسي وجذاب يجمع بين دفء الهيل والفلفل وحلاوة الفانيلا والتونكا مع قاعدة خشبية كريمية من خشب الصندل والعنبر.	DHB-0234.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ffa94942-4222-4270-962e-40340b6abbc1	DHB-0195	ان-موشن-dhb-0195-e1ff0b	ان موشن	\N	Hugo Boss Boss in Motion	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.935	2026-07-04 21:14:31.051	men	both	t	/products/DHB-0195.webp	t	t	f	حمضي، توابل، منعش	ان موشن، boss in motion، هوجو بوس، hugo boss، رجالي، برتقال، ريحان، قرفة، فلفل وردي، صندل، صيفي، منعش	عطر رجالي منعش ومفعم بالطاقة الحركية يفوح بعبير البرتقال والريحان وحرارة القرفة والفلفل الوردي مع قاعدة دافئة من خشب الصندل والمسك.	DHB-0195.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
6881a4bf-bf22-4bac-b29a-55cf77c91e1d	DHB-0209	بوس-بوتيلد-نايت-dhb-0209-aacfae	بوس بوتيلد نايت	\N	Hugo Boss Boss Bottled Night	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:32.272	men	both	t	/products/DHB-0209.webp	t	t	f	خشبي، زهري، ناعم	بوس نايت، boss bottled night، هوجو بوس، hugo boss، رجالي، لافندر، بنفسج، أخشاب دافئة، مسك، شتوي، فخم	عطر رجالي غامض وجذاب للإطلالات المسائية، يمزج بين عبير الخزامى (اللافندر) والبنفسج وقاعدة دافئة من الأخشاب الثمينة والمسك.	DHB-0209.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
394f0f58-0cd2-4010-bc08-b18a16300fd1	DHB-0218	بولو-بلاك-dhb-0218-d5a49e	بولو بلاك	\N	Ralph Lauren Polo Black	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:14:33.493	men	both	t	/products/DHB-0218.webp	t	t	f	فواكه، دافئ، خشبي	بولو بلاك، polo black، بولو، polo، رالف لورين، ralph lauren، رجالي، مانجو، يوسفي، صندل، تونكا، شتوي، فخم	عطر رجالي فخم وجذاب يمزج بنعومة غير تقليدية بين عبير المانجو المثلجة واليوسفي المنعش وقاعدة دافئة من خشب الصندل والتونكا.	DHB-0218.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
8241db8f-cd01-4e71-a0df-4be5525223fe	DHB-0223	بربري-هيرو-dhb-0223-ad62e5	بربري هيرو	\N	Burberry Hero	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.248	2026-07-04 21:14:34.713	men	summer	t	/products/DHB-0223.webp	t	t	f	خشبي، توابل، منعش	بربري هيرو، burberry hero، بربري، burberry، رجالي، برغموت، عرعر، فلفل أسود، خشب الأرز، فخم، كل المواسم	عطر رجالي عصري أنيق يجمع بين نضارة البرغموت وثمار العرعر وحرارة الفلفل الأسود مع قاعدة خشبية قوية من خشب الأرز الثلاثي.	DHB-0223.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3cf8faa8-ab96-4785-887c-7c02fb5e34ae	DHB-0239	تيري-دي-هيرمس-dhb-0239-c8fdc8	تيري دي هيرمس	\N	Hermès Terre d'Hermès	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.24	2026-07-04 21:14:35.972	men	both	t	/products/DHB-0239.webp	t	t	f	حمضي، ترابي، خشبي	تيري دي هيرمس، terre dhermes، هيرمس، hermes، رجالي، برتقال، جريب فروت، صوان، فتيفير، أرز، فخم، كل المواسم	عطر رجالي ترابي فاخر ذو طابع معدني فريد، يفوح بنضارة البرتقال والجريب فروت مع حدة الفلفل الأسود وقاعدة خشبية دافئة من الأرز ونجيل الهند.	DHB-0239.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	DHB-0194	اوبن-dhb-0194-1db7f3	اوبن	\N	Roger & Gallet Open	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:37.935	2026-07-04 21:14:37.194	men	winter	t	/products/DHB-0194.webp	t	t	f	توابل، جلدي، دافئ	اوبن، open، روجيه جاليه، roger gallet، رجالي، ليمون، لافندر، زعتر، تبغ، فتيفير، كلاسيكي، شتوي	عطر رجالي كلاسيكي قوي يمزج بين انتعاش الليمون واللافندر ونفحات الزعتر والميرمية العشبية مع قاعدة دافئة من التبغ ونجيل الهند.	DHB-0194.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
52bead5d-2a56-47f3-991a-efa29d065eb9	DHB-0203	ابسولو-you-dhb-0203-73adc7	ابسولو You	\N	Giorgio Armani Stronger With You Absolutely	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:38.42	men	winter	t	/products/DHB-0203.webp	t	t	f	حلو، دافئ، شرقي	يو ابسولو، stronger with you absolutely، جورجيو ارماني، giorgio armani، رجالي، رم، كستناء، فانيلا، لافندر، شتوي، فخم	عطر رجالي شرقي دافئ يتميز بتوليفة ملكية تدمج بين نكهة الرم واللافندر وحلاوة الكستناء مع قاعدة غنية بمركب الفانيلا والباتشولي.	DHB-0203.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	DHB-0213	بلو-دي-شانيل-dhb-0213-401e18	بلو دي شانيل	\N	Chanel Bleu de Chanel	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:14:39.645	men	both	t	/products/DHB-0213.webp	t	t	f	حمضي، منعش، خشبي	بلو دي شانيل، bleu de chanel، شانيل، chanel، رجالي، جريب فروت، زنجبيل، نعناع، بخور، صندل، فخم، كل المواسم	عطر رجالي أيقوني فاخر يفتتح بنضارة الجريب فروت والنعناع والزنجبيل مع لمسة بخور غامضة وقاعدة دافئة من خشب الصندل والأرز.	DHB-0213.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
9dfc3a86-7728-4a26-9d12-e661f8bf97c5	DHB-0222	بولغاري-مان-بلاك-dhb-0222-551e94	بولغاري مان بلاك	\N	Bvlgari Man In Black	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.248	2026-07-04 21:14:40.869	men	winter	t	/products/DHB-0222.webp	t	t	f	توابل، دافئ، جلدي	بولغاري مان بلاك، man in black، بولغاري، bvlgari، رجالي، تبغ، جلود، رم، توابل، تونكا، شتوي، فخم	عطر رجالي شرقي فخم يتميز بتوليفة مكثفة تجمع بين نكهة الرم والتبغ وحرارة التوابل مع قلب من السوسن البودري وقاعدة جلدية دافئة وثابتة.	DHB-0222.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
826baa70-73c7-4b98-9be5-a081641317d9	DHB-0232	212-dhb-0232-10c840	212	\N	Carolina Herrera 212 Men	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:42.09	men	summer	t	/products/DHB-0232.webp	t	t	f	أخضر، منعش، مسك	٢١٢ رجالي، 212 men nyc، كارولينا هريرا، carolina herrera، رجالي، عشبي، جريب فروت، زنجبيل، غاردينيا، مسك، صيفي، منعش	عطر رجالي صيفي كلاسيكي يفيض بالنقاء والحيوية، يمزج بين النوتات العشبية الخضراء وحمضية الجريب فروت وحرارة الزنجبيل وقاعدة مسكية صندلية.	DHB-0232.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
aad91930-910d-46f4-82a5-e40f5d3cf0c9	DHB-0206	بلاك-x-s-لكزس-dhb-0206-7d657c	بلاك X.S لكزس	\N	Paco Rabanne Black XS L'Exces for Him	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:40.959	2026-07-04 21:14:43.311	men	summer	t	/products/DHB-0206.webp	t	t	f	حمضي، زهري، دافئ	بلاك اكس اس لكزس، black xs lexces، باكو رابان، paco rabanne، رجالي، ليمون، لافندر، نوتات بحرية، عنبر، باتشولي، منعش	عطر رجالي حسي ومنعش يتميز بافتتاحية حمضية من ليمون أمالفي واللافندر مع نوتات بحرية وقاعدة دافئة من الباتشولي والعنبر.	DHB-0206.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
76669643-f398-4d8c-950b-e87e91fcc5dc	DHB-0217	بولو-سبورت-dhb-0217-c38543	بولو سبورت	\N	Ralph Lauren Polo Sport	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:14:44.852	men	summer	t	/products/DHB-0217.webp	t	t	f	حمضي، منعش، أخضر	بولو سبورت، polo sport، بولو، polo، رالف لورين، ralph lauren، رجالي، نعناع، ليمون، لافندر، صندل، صيفي، منعش	عطر رجالي رياضي بارد ومنعش للغاية يفوح بنضارة النعناع والليمون والخزامى (اللافندر) مع أوراق النيرولي وقاعدة مسكية صندلية.	DHB-0217.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	DHB-0229	بلو-جينز-dhb-0229-f468da	بلو جينز	\N	Versace Blue Jeans	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.249	2026-07-04 21:14:46.072	men	summer	t	/products/DHB-0229.webp	t	t	f	حمضي، أروماتك، حلو	بلو جينز، blue jeans، فيرزاتشي، versace، رجالي، ليمون، يانسون، لافندر، فانيلا، صندل، كلاسيكي، كل المواسم	عطر رجالي كلاسيكي منعش يتميز بتوليفة غنية من الحمضيات واللافندر واليانسون مع قاعدة حلوة دافئة من الفانيلا وخشب الصندل والتونكا.	DHB-0229.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
39f1b89f-b571-4834-92b4-cf83698fd761	DHB-0236	نوار-اكستريم-dhb-0236-946b69	نوار اكستريم	\N	Tom Ford Noir Extreme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.239	2026-07-04 21:14:47.295	men	winter	t	/products/DHB-0236.webp	t	t	f	حلو، دافئ، توابل	نوار اكستريم، noir extreme، توم فورد، tom ford، رجالي، كولفي، هيل، زعفران، فانيلا، عنبر، فخم، شتوي	عطر رجالي شرقي فاخر بطابع شهي، يمزج بين حلاوة حلوى الكولفي الهندية والفانيلا وحرارة الهيل والزعفران مع قاعدة عنبرية خشبية غنية.	DHB-0236.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ec08e506-0d25-4292-933a-7e77d056197c	DHB-0020	انجل-نوڤا-dhb-0020-0ac062	انجل نوڤا	\N	Thierry Mugler Angel Nova	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.061	2026-07-04 21:10:42.186	women	both	t	/products/DHB-0020.webp	t	t	f	فواكه، زهري، حلو	انجل نوفا، angel nova، تيري موغلر، mugler، نسائي، توت، ورد، فواكه، حلو، منعش، كل المواسم	عطر نسائي حيوي ومغرٍ يفتتح بنفحات فاكهية حلوة من التوت الأحمر مع قلب من الورد وقاعدة خشبية دافئة.	DHB-0020.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c22e50c2-f975-4f6c-9c57-d85b7158fb4a	DHB-0227	بولغاري-تايجر-dhb-0227-e8d6a3	بولغاري تايجر	\N	Bvlgari Le Gemme Tygar	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:47.249	2026-07-04 21:14:49.768	men	summer	t	/products/DHB-0227.webp	t	t	f	حمضي، منعش، خشبي	بولغاري تايجر، tygar، بولغاري، bvlgari، رجالي، جريب فروت، زنجبيل، أمبروكسان، أخشاب، صيفي، منعش	عطر رجالي حمضي خشبي منعش للغاية يجمع بنقاء بين حيوية الجريب فروت وحرارة الزنجبيل مع قاعدة ترابية فاخرة من خشب الأرز والأمبروكسان.	DHB-0227.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
6c1bcd69-500d-4906-96b0-e95132ffe395	DHB-0240	جوتشي-باي-dhb-0240-829c07	جوتشي باي	\N	Gucci by Gucci Pour Homme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:50.24	2026-07-04 21:14:50.991	men	winter	t	/products/DHB-0240.webp	t	t	f	خشبي، جلدي, دافئ	جوتشي باي هوم، gucci by gucci pour homme، جوتشي، gucci، رجالي، سرو، بنفسج، تبغ، جلد، باتشولي، فخم، شتوي	عطر رجالي خشبي دافئ يفيض بالفخامة والرجولة، يمزج بين أوراق السرو والبنفسج ونفحات التبغ والجلود مع قاعدة ترابية غنية من الباتشولي والعنبر.	DHB-0240.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
038ba25e-adea-4aa2-9167-e955a0c2dbbc	DHB-0247	جيڤنشي-بلاي-dhb-0247-baca19	جيڤنشي بلاي	\N	Givenchy Play for Him	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.434	2026-07-04 21:14:52.212	men	both	t	/products/DHB-0247.webp	t	t	f	حمضي، توابل، دافئ	جيفنشي بلاي رجالي، givenchy play for him، جيفنشي، givenchy، رجالي، جريب فروت، فلفل أسود، قهوة، فتيفير، منعش	عطر رجالي حيوي وحديث يمزج بين حمضية الجريب فروت والبرغموت وحرارة الفلفل الأسود مع نوتات خشب الأميريس وقاعدة من نجيل الهند.	DHB-0247.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	DHB-0245	جكمو-dhb-0245-87a7ef	جكمو	\N	Jacomo de Jacomo	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.433	2026-07-04 21:14:53.459	men	winter	t	/products/DHB-0245.webp	t	t	f	توابل، جلدي، دافئ	جكمو، jacomo de jacomo، جاكومو، jacomo، رجالي، قرنفل، قرفة، جلد، طحلب البلوط، كلاسيكي، شتوي، فخم	عطر رجالي كلاسيكي حار يتميز بنفحات دافئة من القرنفل والقرفة وجوزة الطيب مع قاعدة رجولية قوية من الجلود وطحلب البلوط.	DHB-0245.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f35f005d-502a-47b6-b092-c568c4bf3f3b	DHB-0251	دنهل-بلاك-dhb-0251-0fae98	دنهل بلاك	\N	Alfred Dunhill Dunhill Black	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.435	2026-07-04 21:14:56.738	men	summer	t	/products/DHB-0251.webp	t	t	f	أخضر، جلدي، منعش	دنهل بلاك، dunhill black، دنهل، dunhill، رجالي، لافندر، قراص، جلود، أرز، منعش، كل المواسم	عطر رجالي عشبي أنيق يفتتح بعبير أوراق القراص الخضراء واللافندر مع قلب زهري ناعم وقاعدة دافئة من الجلد السويدي والأخشاب.	DHB-0251.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	DHB-0249	جنتل-مان-اونلي-انتنس-dhb-0249-2e4b08	جنتل مان اونلي انتنس	\N	Givenchy Gentlemen Only Intense	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.434	2026-07-04 21:14:57.962	men	winter	t	/products/DHB-0249.webp	t	t	f	جلدي، دافئ، توابل	جنتلمان اونلي انتنس، gentlemen only intense، جيفنشي، givenchy، رجالي، فلفل أسود، جلد، بخور، عنبر، تونكا، فخم، شتوي	عطر رجالي خشبي دافئ يتميز بتوليفة مكثفة تجمع بين فخامة الجلود والبخور وحرارة الفلفل الأسود مع قاعدة دافئة من العنبر والباتشولي والتونكا.	DHB-0249.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
83315f2e-fe15-4968-8917-05e6d7106235	DHB-0248	جنتل-مان-سوسيتي-dhb-0248-f18515	جنتل مان سوسيتي	\N	Givenchy Gentleman Society	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.434	2026-07-04 21:14:59.19	men	both	t	/products/DHB-0248.webp	t	t	f	خشبي، أروماتك، حلو	جنتلمان سوسيتي، gentleman society، جيفنشي، givenchy، رجالي، هيل، ميرمية، نرجس، فتيفير، فانيلا، فخم، كل المواسم	عطر رجالي خشبي فاخر يمزج بين نضارة الميرمية والهيل وقلب زهري من النرجس البري مع قاعدة دافئة من نجيل الهند والفانيلا وخشب الصندل.	DHB-0248.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
fb958e6e-1940-4631-9f05-f62028159987	DHB-0250	جوب-dhb-0250-050fea	جوب	\N	Joop! Homme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.435	2026-07-04 21:15:01.647	men	winter	t	/products/DHB-0250.webp	t	t	f	حلو، توابل، دافئ	جوب رجالي، joop homme، جوب، joop، رجالي، دارسين، قرفة، زهر البرتقال، فانيلا، عسل، شتوي، فخم، ثابت	عطر رجالي شرقي حلو يتميز بفوحانه القوي، يجمع بين حرارة القرفة ونضارة زهر البرتقال مع قاعدة دافئة وحلوة من الفانيلا والعسل والعنبر.	DHB-0250.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
9b38d053-84d0-4542-924b-51079e6d990c	DHB-0246	جنتل-مان-dhb-0246-2dde60	جنتل مان	\N	Givenchy Gentleman Eau de Parfum	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.433	2026-07-04 21:15:02.877	men	winter	t	/products/DHB-0246.webp	t	t	f	بودري، حلو، دافئ	جنتلمان جيفنشي، gentleman edp، جيفنشي، givenchy، رجالي، سوسن، فلفل أسود، فانيلا، باتشولي، فخم، شتوي	عطر رجالي شرقي فاخر يتميز بنعومة زهرة السوسن البودرية وحرارة الفلفل الأسود مع قاعدة دافئة من الفانيلا والباتشولي وبلسم تولو.	DHB-0246.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
7b85426f-e196-49f4-8354-d934e832a2ec	DHB-0242	جوتشي-جلتي-الكسير-dhb-0242-4ff032	جوتشي جلتي الكسير	\N	Gucci Guilty Elixir de Parfum pour Homme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.433	2026-07-04 21:15:04.101	men	winter	t	/products/DHB-0242.webp	t	t	f	زهري، حلو، دافئ	جوتشي جلتي الكسير، gucci guilty elixir pour homme، جوتشي، gucci، رجالي، زهر البرتقال، سوسن، فانيلا، جاوي، فخم، شتوي	عطر رجالي شرقي فخم ذو ثبات استثنائي، يجمع بين عبير زهر البرتقال ونعومة السوسن البودرية وحلاوة الفانيلا والجاوي الدافئة.	DHB-0242.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
32280cdb-f1a5-4c78-bdfe-0a63755583d4	DHB-0244	جاكوار-بلاك-dhb-0244-600292	جاكوار بلاك	\N	Jaguar Classic Black	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.433	2026-07-04 21:15:05.331	men	summer	t	/products/DHB-0244.webp	t	t	f	منعش، فواكه، خشبي	جاكوار بلاك، classic black، جاكوار، jaguar، رجالي، تفاح أخضر، شاي، هيل، مسك، منعش، كل المواسم	عطر رجالي منعش يتميز بتوليفة حيوية من التفاح الأخضر والشاي الأسود مع حرارة الهيل وقاعدة خشبية مسكية ناعمة وثابتة.	DHB-0244.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	DHB-0256	دارج-dhb-0256-47d733	دارج	\N	Rasasi Daarej pour Homme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:06.567	men	winter	t	/products/DHB-0256.webp	t	t	f	حلو، دافئ، توابل	دارج رجالي، daarej pour homme، الرصاصي، rasasi، رجالي، كمون، هيل، فانيلا، صندل، عطور شرقية، شتوي، فخم	عطر شرقي دافئ وشهير للغاية للرجال، يمزج بين توابل الكمون والهيل ونقاء الورد مع قاعدة حلوة وغنية من الفانيلا والتونكا وخشب الصندل.	DHB-0256.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
74771738-b03e-4746-a16e-a5577e605f98	DHB-0253	دنهل-ايكون-dhb-0253-376d41	دنهل ايكون	\N	Alfred Dunhill Icon	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:07.791	men	both	t	/products/DHB-0253.webp	t	t	f	حمضي، توابل، منعش	دنهل ايكون، dunhill icon، دنهل، dunhill، رجالي، نيرولي، فلفل أسود، هيل، فتيفير، عود، فخم، كل المواسم	عطر رجالي فخم يمزج بنقاء بين انتعاش النيرولي والبرغموت وحرارة الفلفل الأسود والهيل مع قاعدة خشبية راقية من نجيل الهند والعود والجلود.	DHB-0253.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
15553f08-c40c-4fd8-a166-4194e9075710	DHB-0261	ديزل-dhb-0261-4a7a7a	ديزل	\N	Diesel Fuel for Life Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:09.016	men	summer	t	/products/DHB-0261.webp	t	t	f	فواكه، أروماتك، توابل	ديزل رجالي، fuel for life homme، ديزل، diesel، رجالي، يانسون، لافندر، توت، جريب فروت، منعش، كل المواسم	عطر رجالي حيوي وجذاب يتميز بتوليفة غير تقليدية تدمج بين حرارة اليانسون وعبير اللافندر مع نكهة التوت الحلوة وقاعدة خشبية ناعمة.	DHB-0261.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
127f37c8-72be-40df-9ae2-8fd333586096	DHB-0271	ch-dhb-0271-64f1a1	CH	\N	Carolina Herrera CH Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.695	2026-07-04 21:15:11.467	men	winter	t	/products/DHB-0271.webp	t	t	f	جلدي، حلو، دافئ	سي اتش رجالي، ch men، كارولينا هريرا، carolina herrera، رجالي، جلد، سكر، زعفران، عشب، أخشاب، فخم، شتوي	عطر رجالي شرقي فخم يتميز بتوليفة فريدة تجمع بين حلاوة السكر وعبق الجلود الفاخرة والزعفران مع نضارة عشبية وقاعدة عنبرية دافئة.	DHB-0271.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
eb508b4d-7b80-40aa-8b8d-7190e7d534bc	DHB-0275	سوفاج-فورتي-dhb-0275-c7e4d5	سوفاج فورتي	\N	Dior Sauvage Eau Forte	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.691	2026-07-04 21:15:12.944	men	summer	t	/products/DHB-0275.webp	t	t	f	منعش، أروماتك، خشبي	سوفاج فورتي، sauvage eau forte، ديور، dior، رجالي، توابل باردة، لافندر، مسك، أخشاب، فخم، كل المواسم، اصدار جديد	عطر رجالي شرقي منعش ومبتكر يمثل القوة المائية، يمزج بين حيوية التوابل الباردة واللافندر الأبيض مع قاعدة خشبية مسكية دافئة وثابتة.	DHB-0275.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
131577eb-5549-4503-853c-f6aa2cc8fffb	DHB-0291	جوتشي-بلوم-انتس-dhb-0291-c485a6	جوتشي بلوم انتس	\N	Gucci Bloom Intense	رجالي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.726	2026-07-04 21:15:14.17	men	winter	t	/products/DHB-0291.webp	t	t	f	زهري، حلو، دافئ	جوتشي بلوم انتس، gucci bloom intense، جوتشي، gucci، نسائي، ياسمين، مسك الروم، جوز الهند، باتشولي، فخم، شتوي	عطر نسائي حسي ومكثف يتميز بعبير أزهار مسك الروم والياسمين مع دفء الباتشولي ولمسة كريمية ناعمة من جوز الهند.	DHB-0291.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
1bc47f29-3bd9-4148-9a23-03bb30709767	DHB-0292	نرسيسو-كريستال-dhb-0292-a4abd8	نرسيسو كريستال	\N	Narciso Rodriguez Narciso Eau de Parfum Cristal	رجالي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.946	2026-07-04 21:15:15.393	men	both	t	/products/DHB-0292.webp	t	t	f	زهري، مسك، ناعم	نارسيسو كريستال، narciso cristal، نارسيسو رودريغز، narciso rodriguez، نسائي، فريزيا، ورد، مسك، كشمير، ناعم، كل المواسم	عطر نسائي ناعم وراقٍ يتميز بالنقاء، يمزج بين عبير الفريزيا والورد الجوري وزهر البرتقال مع قلب مسكي دافئ وقاعدة مخملية من الكشمير.	DHB-0292.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	DHB-0303	كريد-وايت-dhb-0303-fc0aac	كريد وايت	\N	Creed Silver Mountain Water	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:15:16.619	men	summer	t	/products/DHB-0303.webp	t	t	f	بحري، منعش، مسك	كريد وايت، silver mountain water، كريد، creed، مكس، رجالي، نسائي، شاي أخضر، توت أسود، مسك، صيفي، منعش، عطور النيش	عطر أروماتك فاخر ومنعش للجنسين يجسد نقاء جبال الألب السويسرية، يمزج بين حيوية الشاي الأخضر والتوت الأسود وقاعدة مخملية من المسك والصندل.	DHB-0303.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
7517fe33-a6fa-4b33-aa17-9bd9c85297c9	DHB-0320	التراميل-dhb-0320-9907f9	التراميل	\N	Jean Paul Gaultier Ultra Male	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.2	2026-07-04 21:15:17.844	men	winter	t	/products/DHB-0320.webp	t	t	f	حلو، فواكه، دافئ	الترا ميل، ultra male، جان بول غوتييه، jean paul gaultier، jpg، رجالي، كمثرى، لافندر، قرفة، فانيلا سوداء، فخم، شتوي	عطر رجالي شرقي حلو وجذاب للغاية للإطلالات الحماسية، يمزج بين حلاوة الكمثرى واللافندر وحرارة القرفة وقاعدة دافئة وثابتة من الفانيلا السوداء.	DHB-0320.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
cb51dfe2-adb2-42d2-970a-abbc99990bfa	DHB-0327	هوجو-بوس-dhb-0327-ea0959	هوجو بوس	\N	Hugo Boss Hugo Man	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.224	2026-07-04 21:15:19.077	men	summer	t	/products/DHB-0327.webp	t	t	f	أخضر، منعش، أروماتك	هوجو الاخضر، hugo man 1995، هوجو بوس، hugo boss، رجالي، تفاح أخضر، نعناع، لافندر، صنوبر، أرز، منعش، كل المواسم	عطر رجالي كلاسيكي منعش للغاية بطابع عشبي أخضر، يفوح بنضارة التفاح الأخضر والنعناع واللافندر مع قاعدة خشبية دافئة من الصنوبر والأرز.	DHB-0327.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
fd1f56db-0a26-4e9e-8703-433044728b1c	DHB-0267	ذا-سنت-dhb-0267-e0fbf2	ذا سنت	\N	Hugo Boss Boss The Scent	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.693	2026-07-04 21:15:21.527	men	winter	t	/products/DHB-0267.webp	t	t	f	توابل، فواكه، جلدي	ذا سنت، boss the scent، هوجو بوس، hugo boss، رجالي، زنجبيل، فاكهة المانينكا، لافندر، جلد، فخم، شتوي	عطر رجالي شرقي حسي يتميز بنكهة فاكهة المانينكا الاستوائية وحرارة الزنجبيل مع عبير اللافندر وقاعدة دافئة من الجلود الناعمة والأخشاب.	DHB-0267.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
24f725b1-37dc-405d-94ab-21acf34aba16	DHB-0276	سبايس-بمب-dhb-0276-fd75d1	سبايس بمب	\N	Viktor & Rolf Spicebomb	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.692	2026-07-04 21:15:22.754	men	winter	t	/products/DHB-0276.webp	t	t	f	توابل، دافئ، جلدي	سبايس بومب، spicebomb، فيكتور اند رالف، viktor rolf، رجالي، فلفل وردي، قرفة، تبغ، جلد، زعفران، شتوي، فخم، حار	عطر رجالي شرقي حار يتميز بانفجار عطري من التوابل كالفلفل الوردي والزعفران والقرفة مع نفحات غنية من التنبك والجلود والأخشاب الدافئة.	DHB-0276.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
bca4baf7-e4dc-4dff-928b-f214ac8800fd	DHB-0289	اكوا-دي-جيو-الكسير-dhb-0289-744bd3	اكوا دي جيو الكسير	\N	Giorgio Armani Acqua Di Gio Profondo Elixir	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.725	2026-07-04 21:15:23.979	men	summer	t	/products/DHB-0289.webp	t	t	f	بحري، منعش، ترابي	اكوا دي جيو الكسير، acqua di gio profondo elixir، جورجيو ارماني، giorgio armani، رجالي، نوتات مائية، لافندر، باتشولي، صيفي، منعش، اصدار جديد	عطر رجالي صيفي منعش للغاية بتركيز مكثف، يمزج بين برودة النوتات البحرية المالحة وعبير اللافندر مع قاعدة ترابية دافئة من الباتشولي والراتنجات.	DHB-0289.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
fcbca1f7-980f-4753-adfe-6ccdbd450bdf	DHB-0296	فرزاتشي-ايروس-dhb-0296-a5bf9c	فرزاتشي ايروس	\N	Versace Eros Pour Homme	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.948	2026-07-04 21:15:25.204	men	both	t	/products/DHB-0296.webp	t	t	f	حلو، منعش، فانيلا	فرزاتشي ايروس رجالي، eros pour homme، فيرزاتشي، versace، رجالي، نعناع، تفاح أخضر، فانيلا، تونكا، منعش، فخم، كل المواسم	عطر رجالي حيوي وجذاب يتميز بفوحانه الرائع، يفتتح بنضارة أوراق النعناع والتفاح الأخضر مع قلب من التونكا وقاعدة غنية من الفانيلا والأرز.	DHB-0296.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	DHB-0306	كروم-ليجند-dhb-0306-924687	كروم ليجند	\N	Azzaro Chrome Legend	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:15:26.427	men	summer	t	/products/DHB-0306.webp	t	t	f	منعش، فواكه، أخضر	كروم ليجند، chrome legend، ازارو، azzaro، رجالي، تفاح أخضر، شاي، برتقال مر، مسك، منعش، صيفي	عطر رجالي صيفي منعش للغاية يجمع بنقاء بين حلاوة التفاح الأخضر المقرمش ونضارة الشاي والبرتقال المر وقاعدة خشبية مسكية ثابتة.	DHB-0306.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
a1cdcec6-1029-41e3-be91-786a73345bb6	DHB-0321	لي-ميل-الكسير-dhb-0321-1b12e3	لي ميل الكسير	\N	Jean Paul Gaultier Le Male Elixir	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.2	2026-07-04 21:15:27.651	men	winter	t	/products/DHB-0321.webp	t	t	f	حلو، دافئ، شرقي	لي ميل الكسير، le male elixir، جان بول غوتييه، jean paul gaultier، jpg، رجالي، لافندر، فانيلا، عسل، تبغ، تونكا، شتوي، فخم، اصدار جديد	عطر رجالي شرقي فخم بتركيز مكثف وثبات فائق، يمزج بين نقاء اللافندر والنعناع وحلاوة العسل الذائب والفانيلا مع قاعدة دافئة من التونكا والتبغ.	DHB-0321.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
2ad9b536-7460-4aa8-8489-2cc96d1a19a7	DHB-0331	وانتد-dhb-0331-e0a5d9	وانتد	\N	Azzaro Wanted	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.225	2026-07-04 21:15:29.12	men	both	t	/products/DHB-0331.webp	t	t	f	حمضي، توابل، حلو	وانتد رجالي، wanted azzaro، ازارو، azzaro، رجالي، ليمون، زنجبيل، هيل، تفاح، تونكا، منعش، كل المواسم	عطر رجالي منعش وجذاب يفتتح بنضارة الليمون والزنجبيل وحلاوة التفاح الأخضر مع قلب من الهيل وقاعدة دافئة من التونكا ونجيل الهند.	DHB-0331.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
74f06a46-bbc3-4df9-a35b-bdc354055041	DHB-0268	غبار-الذهب-dhb-0268-c00bed	غبار الذهب	\N	Abdul Khaliq Saeed Gobar Al Zahab	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.692	2026-07-04 21:15:31.576	men	winter	t	/products/DHB-0268.webp	t	t	f	شرقي، خشبي، توابل	غبار الذهب، gobar al zahab، عبد الخالق سعيد، abdul khaliq saeed، رجالي، عود، زعفران، ورد، عنبر، عطور شرقية، فخم	عطر شرقي كلاسيكي فاخر يفوح بعبق التراث العربي، يمزج بين فخامة دهن العود والزعفران الحار وقلب من الورد مع قاعدة دافئة من العنبر والباتشولي.	DHB-0268.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
9ffef6b9-15d8-4fd6-921e-c5862d9e7400	DHB-0281	فندي-مان-dhb-0281-afad00	فندي مان	\N	Fendi Uomo	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.695	2026-07-04 21:15:32.802	men	winter	t	/products/DHB-0281.webp	t	t	f	جلدي، توابل، دافئ	فندي مان، fendi uomo، فندي، fendi، رجالي، جلود، توابل، لافندر، صندل، كلاسيكي، شتوي	عطر رجالي كلاسيكي راقٍ يتميز بطابع جلدي دافئ، يمزج بين حرارة التوابل واللافندر مع قاعدة ترابية غنية من الجلود والباتشولي ونجيل الهند.	DHB-0281.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
a402f394-6b7b-4cb9-aa2e-9b633e57d39a	DHB-0285	ماريو-dhb-0285-ce824e	ماريو	\N	Dahab House Blend / Mario (Requires Clarification)	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.725	2026-07-04 21:15:34.025	men	both	t	/products/DHB-0285.webp	t	t	f	منعش، خشبي، مسك	ماريو دهب، mario dahab، دهب، dahab، رجالي، أخشاب، مسك، توابل، منعش، مراجعة	عطر رجالي مميز بطابع خاص، يحتاج إلى مراجعة مع العميل لتحديد تفاصيله ونوع المزيج العطري المطلوب بدقة.	DHB-0285.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
23c96d2c-f0bc-44c6-985d-ae133ff60463	DHB-0301	كارتير-دكلاريشن-dhb-0301-85edee	كارتير دكلاريشن	\N	Cartier Declaration	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.949	2026-07-04 21:15:35.259	men	both	t	/products/DHB-0301.webp	t	t	f	توابل، منعش، خشبي	كارتير دكلاريشن، declaration cartier، كارتير، cartier، رجالي، هيل، برتقال مر، زنجبيل، فتيفير، أرز، فخم، كل المواسم	عطر رجالي شرقي حار يتميز بنضارة البرتقال المر وحرارة الهيل والزنجبيل والكزبرة مع قاعدة خشبية فاخرة وثابتة من نجيل الهند والأرز.	DHB-0301.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
7fd8fd00-5741-458f-9b45-76abc54dd4a5	DHB-0305	كول-واتير-dhb-0305-87ac42	كول واتير	\N	Davidoff Cool Water for Men	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:15:36.486	men	summer	t	/products/DHB-0305.webp	t	t	f	بحري، منعش، أروماتك	كول ووتر، cool water pour homme، دافيدوف، davidoff، رجالي، مائي، نعناع، لافندر، صندل، صيفي، منعش	عطر رجالي صيفي منعش بطابع بحري أيقوني، يمزج بين برودة النوتات البحرية والنعناع واللافندر مع قاعدة خشبية دافئة من الصندل والأرز والمسك.	DHB-0305.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
e21c17a0-331b-4c9c-ad7f-db1e3242b916	DHB-0312	لانوت-دي-لاهوم-dhb-0312-3c35b3	لانوت دي لاهوم	\N	Yves Saint Laurent La Nuit de L'Homme	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.198	2026-07-04 21:15:37.708	men	both	t	/products/DHB-0312.webp	t	t	f	توابل، أروماتك، دافئ	لانوت دي لاهوم، la nuit de lhomme، ايف سان لوران، yves saint laurent، ysl، رجالي، هيل، لافندر، أرز، فتيفير، فخم، كل المواسم	عطر رجالي حسي وجذاب يفوح بحرارة الهيل وتوابل الكروية مع عبير الخزامى (اللافندر) وقاعدة خشبية راقية وثابتة من الأرز ونجيل الهند.	DHB-0312.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
56e35a49-ecda-4caa-b0fd-415b90d4da83	DHB-0326	هوجو-انرجايز-dhb-0326-4cf398	هوجو انرجايز	\N	Hugo Boss Hugo Energise	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.224	2026-07-04 21:15:38.933	men	summer	t	/products/DHB-0326.webp	t	t	f	حمضي، توابل، منعش	هوجو انرجايز، hugo energise، هوجو بوس، hugo boss، رجالي، حمضيات، فلفل وردي، نعناع، شمام، أخشاب، صيفي، منعش	عطر رجالي صيفي منعش بطابع حيوي يفوح بنضارة الحمضيات كالليمون والبرتقال وحرارة الفلفل الوردي والنعناع مع قاعدة خشبية دافئة.	DHB-0326.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
662ef73f-78a7-4f64-8994-df72da082c28	DHB-0269	زغبار-الفضة-dhb-0269-f2be16	زغبار الفضة	\N	Abdul Khaliq Saeed Gobar Al Feda	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.693	2026-07-04 21:15:41.388	men	summer	t	/products/DHB-0269.webp	t	t	f	مسك، منعش، خشبي	غبار الفضة، زغبار الفضة، gobar al feda، عبد الخالق سعيد، abdul khaliq saeed، رجالي، مسك أبيض، صندل، توابل، منعش، كل المواسم	عطر شرقي منعش يتميز بطابعه النظيف والراقي، يمزج بين نقاء المسك الأبيض ودفء خشب الصندل مع نفحات حمضية وتوابل منعشة وقاعدة خشبية.	DHB-0269.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
9a621758-3d3e-425a-bf5f-db3123a27f24	DHB-0273	سوفاج-بيرفيوم-dhb-0273-437197	سوفاج بيرفيوم	\N	Dior Sauvage Parfum	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.691	2026-07-04 21:15:42.615	men	both	t	/products/DHB-0273.webp	t	t	f	حمضي، دافئ، خشبي	سوفاج بيرفيوم، sauvage parfum، ديور، dior، رجالي، برغموت، صندل، لبان، فانيلا، فخم، كل المواسم	عطر رجالي شرقي فخم يتميز بتركيزه العالي ونبرته الدافئة، يجمع بين نضارة الماندرين والبرغموت وقاعدة كريمية غنية من خشب الصندل والفانيلا.	DHB-0273.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
842e3ac0-435e-4ffb-9070-79a13e1a63cb	DHB-0287	بورن-ان-روما-اكسترا-دوز-dhb-0287-892c42	بورن ان روما اكسترا دوز	\N	Valentino Uomo Born In Roma Intense	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.724	2026-07-04 21:15:43.838	men	winter	t	/products/DHB-0287.webp	t	t	f	حلو، دافئ، أروماتك	بورن ان روما اكسترا دوز، born in roma intense pour homme، فالنتينو، valentino، رجالي، لافندر، ميرمية، فانيلا، زنجبيل، فخم، شتوي	عطر رجالي شرقي دافئ يتميز بتركيزه المكثف، يمزج بين عبير اللافندر والميرمية وحرارة الزنجبيل مع قاعدة حلوة دافئة من الفانيلا.	DHB-0287.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b7473554-6287-40b5-90fa-9df6187953f3	DHB-0300	كارتير-باشا-dhb-0300-0ac67f	كارتير باشا	\N	Cartier Pasha de Cartier	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.948	2026-07-04 21:15:45.308	men	both	t	/products/DHB-0300.webp	t	t	f	أروماتك، توابل، خشبي	كارتير باشا، pasha de cartier، كارتير، cartier، رجالي، لافندر، نعناع، كروية، صندل، طحلب البلوط، كلاسيكي، فخم	عطر رجالي كلاسيكي فاخر يفوح بعبير الخزامى (اللافندر) والنعناع والكزبرة مع قلب من الكروية وقاعدة خشبية دافئة من خشب الصندل وطحلب البلوط.	DHB-0300.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	DHB-0304	كريد-افنتوس-dhb-0304-9b53e0	كريد افنتوس	\N	Creed Aventus	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:15:46.532	men	both	t	/products/DHB-0304.webp	t	t	f	فواكه، منعش، خشبي	كريد افينتوس، aventus creed، كريد، creed، رجالي، أناناس، خشب البتولا، مسك، صندل، فخم، كل المواسم	عطر رجالي فاخر ذو حضور أسطوري، يمزج بين حلاوة الأناناس الاستوائي والتفاح ونفحات خشب البتولا الدخانية مع قاعدة مسكية عنبرية ثابتة.	DHB-0304.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
306985d9-8ffb-4b62-9a71-cadf1d3ce599	DHB-0315	اسنشل-سبورت-dhb-0315-c72604	اسنشل سبورت	\N	Lacoste Essential Sport	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.198	2026-07-04 21:15:47.757	men	summer	t	/products/DHB-0315.webp	t	t	f	بحري، منعش، حمضي	اسنشال سبورت، essential sport lacoste، لاكوست، lacoste، رجالي، نوتات بحرية، جريب فروت، زنجبيل، مسك، صيفي، منعش	عطر رجالي رياضي بارد ومنعش للغاية، يمزج بين انتعاش النوتات البحرية وحموضة الجريب فروت وحرارة الزنجبيل وقاعدة مسكية ناعمة وثابتة.	DHB-0315.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b20c198a-2b2a-4650-9d3e-f3da6bb622bb	DHB-0329	ون-مليون-لكي-dhb-0329-4ebb7b	ون مليون لكي	\N	Paco Rabanne 1 Million Lucky	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.224	2026-07-04 21:15:48.977	men	winter	t	/products/DHB-0329.webp	t	t	f	حلو، فواكه، دافئ	ون مليون لكي، 1 million lucky، باكو رابان، paco rabanne، رجالي، عسل، بندق، برقوق، كشمير، أرز، فخم، شتوي	عطر رجالي شرقي شهي وجذاب للغاية، يمزج بين حلاوة العسل والبرقوق ونكهة البندق المحمص مع قاعدة خشبية مخملية من خشب الكشمير والأرز.	DHB-0329.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ca089290-93aa-4fd2-ab79-7b77e9c040cc	DHB-0270	ck-1-dhb-0270-aa2bf1	CK 1	\N	Calvin Klein CK One	رجالي	مكس	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.693	2026-07-04 21:15:51.46	men	summer	t	/products/DHB-0270.webp	t	t	f	حمضي، منعش، مسك	سي كي ون، ck one، كالفن كلاين، calvin klein، مكس، رجالي، نسائي، ليمون، نوتات خضراء، ياسمين، مسك، صيفي، منعش	عطر حمضي منعش للجنسين يجسد روح البساطة والانتعاش، يمزج بين حموضة الليمون والبرغموت والنوتات الخضراء مع قلب زهري رقيق وقاعدة مسكية باردة.	DHB-0270.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
342d937e-95f0-469b-9c44-db23c035fc8c	DHB-0277	سلفر-سنت-dhb-0277-a05813	سلفر سنت	\N	Jacques Bogart Silver Scent	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.693	2026-07-04 21:15:52.741	men	both	t	/products/DHB-0277.webp	t	t	f	حلو، أروماتك، فواكه	سلفر سنت، silver scent، جاك بوجارت، jacques bogart، رجالي، لافندر، زهر البرتقال، هيل، جوزة الطيب، حلو، ثابت	عطر رجالي شرقي حلو وشهير للغاية بقوته وثباته، يمزج بين عبير زهر البرتقال واللافندر وحلاوة ثمار الليتشي مع قاعدة دافئة من التونكا.	DHB-0277.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
af72522f-1085-4f94-ba11-206256972db1	DHB-0288	واي-انتس-dhb-0288-5f2486	واي انتس	\N	Y Eau de Parfum Intense Yves Saint Laurent	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.725	2026-07-04 21:15:53.969	men	summer	t	/products/DHB-0288.webp	t	t	f	حمضي، أروماتك، منعش	واي انتس، y edp intense، ايف سان لوران، yves saint laurent، ysl، رجالي، زنجبيل، لافندر، ميرمية، أرز، باتشولي، فخم، كل المواسم	عطر رجالي أروماتك مكثف يتميز بنضارة الزنجبيل والبرغموت وعبير ثمار العرعر واللافندر مع قاعدة خشبية دافئة وثابتة من الباتشولي والأرز.	DHB-0288.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f00ab0e4-7352-4724-a5b6-9dcce9714156	DHB-0295	اكوا-دي-جيو-بروفوندو-dhb-0295-9ef110	اكوا دي جيو بروفوندو	\N	Giorgio Armani Acqua Di Gio Profondo	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.947	2026-07-04 21:15:55.196	men	summer	t	/products/DHB-0295.webp	t	t	f	بحري، منعش، أروماتك	اكوا دي جيو بروفوندو، acqua di gio profondo، جورجيو ارماني، giorgio armani، رجالي، نوتات بحرية، يوسفي، اكليل الجبل، مسك، صيفي، منعش	عطر رجالي صيفي منعش للغاية بطابع بحري داكن، يمزج بين النوتات المائية المالحة وحمضية الماندرين مع قلب من إكليل الجبل وقاعدة مسكية.	DHB-0295.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5a7c4378-e660-48ea-8550-2f2faee9958b	DHB-0308	لايت-بلو-dhb-0308-2e10e8	لايت بلو	\N	Dolce & Gabbana Light Blue pour Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:15:56.418	men	summer	t	/products/DHB-0308.webp	t	t	f	حمضي، منعش، توابل	لايت بلو رجالي، light blue pour homme، دولتشي اند غابانا، dolce gabbana، رجالي، جريب فروت، عرعر، فلفل أسود، روزماري، صيفي، منعش	عطر رجالي صيفي منعش للغاية يفوح بنضارة الجريب فروت والبرغموت وثمار العرعر مع لمسة توابل من الفلفل الأسود وقاعدة خشبية خفيفة.	DHB-0308.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
95a6f8ff-c74f-4a93-8475-a16c901900f7	DHB-0317	لاكوست-تشانلج-dhb-0317-75b556	لاكوست تشانلج	\N	Lacoste Challenge	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.199	2026-07-04 21:15:57.643	men	summer	t	/products/DHB-0317.webp	t	t	f	حمضي، توابل، منعش	لاكوست تشالنج، challenge lacoste، لاكوست، lacoste، رجالي، ليمون، يوسفي، زنجبيل، لافندر، أخشاب، صيفي، منعش	عطر رجالي رياضي مشرق يفيض بالحيوية، يمزج بين حمضية الليمون واليوسفي وحرارة الزنجبيل مع قاعدة خشبية دافئة من خشب التيك والأبنوس.	DHB-0317.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
e4531865-1bac-491c-8bca-1f2e1ac0f045	DHB-0330	وانتد-باي-مايت-dhb-0330-5edf91	وانتد باي مايت	\N	Azzaro Wanted by Night	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.225	2026-07-04 21:15:58.868	men	winter	t	/products/DHB-0330.webp	t	t	f	توابل، دافئ، حلو	وانتد باي نايت، wanted by night، ازارو، azzaro، رجالي، قرفة، يوسفي، تبغ، جلد، بخور، أرز، شتوي، فخم	عطر رجالي شرقي فخم يتميز بطابع دافئ وجذاب للغاية، يمزج بين حرارة القرفة ونكهة اليوسفي مع نفحات التبغ والجلود والأرز والبخور.	DHB-0330.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
67338e16-a200-4937-a647-72f4a7218d40	DHB-0263	دولتشي-سبورت-dhb-0263-8b876d	دولتشي سبورت	\N	Dolce & Gabbana The One Sport	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.692	2026-07-04 21:16:01.562	men	summer	t	/products/DHB-0263.webp	t	t	f	بحري، منعش، أروماتك	دولتشي سبورت، the one sport، دولتشي اند غابانا، dolce gabbana، رجالي، نوتات مائية، اكليل الجبل، هيل، مسك، صيفي، منعش	عطر رجالي صيفي منعش للغاية بطابع مائي، يمزج بين البرودة المائية ونضارة إكليل الجبل والهيل وقاعدة مسكية خشبية خفيفة.	DHB-0263.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
135c0949-7a6a-4655-83bd-b5620476af5d	DHB-0272	سكاندل-dhb-0272-209869	سكاندل	\N	Jean Paul Gaultier Scandal Pour Homme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.69	2026-07-04 21:16:02.783	men	winter	t	/products/DHB-0272.webp	t	t	f	حلو، دافئ، أروماتك	سكاندال رجالي، scandal pour homme، جان بول غوتييه، jean paul gaultier، jpg، رجالي، كراميل، تونكا، ميرمية، يوسفي، شتوي، فخم	عطر رجالي شرقي دافئ وشهي للغاية، يمزج بين حلاوة الكراميل والتونكا ونضارة الميرمية واليوسفي مع قاعدة خشبية ترابية من نجيل الهند.	DHB-0272.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
d38eaac4-f66c-4e17-b50e-b26128346195	DHB-0283	كريد-فايكنج-dhb-0283-d22c3b	كريد فايكنج	\N	Creed Viking	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.723	2026-07-04 21:16:04.005	men	both	t	/products/DHB-0283.webp	t	t	f	توابل، منعش، خشبي	كريد فايكنج، viking creed، كريد، creed، رجالي، فلفل وردي، نعناع، قرفة، صندل، فتيفير، فخم، كل المواسم	عطر رجالي شرقي حار يتميز بنشاطه وقوته، يمزج بين حرارة الفلفل الوردي والقرنفل وانتعاش النعناع البارد مع قاعدة خشبية فاخرة من الصندل.	DHB-0283.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
db074475-2bdc-44a6-88cb-3f24570f0974	DHB-0297	فرزاتشي-مان-dhb-0297-a7f767	فرزاتشي مان	\N	Versace Man Eau Fraiche	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.948	2026-07-04 21:16:05.228	men	summer	t	/products/DHB-0297.webp	t	t	f	حمضي، منعش، بحري	فرزاتشي مان او فريش، versace man eau fraiche، فيرزاتشي، versace، رجالي، ليمون، كارامبولا، خشب الأرز، مائي، منعش، صيفي	عطر رجالي صيفي منعش للغاية يفوح بنضارة الليمون الأصفر وثمار الكارامبولا الاستوائية مع قلب من خشب الأرز وقاعدة مسكية مائية باردة.	DHB-0297.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
6e1bf9ce-9bae-4e23-acd2-50975712ed7c	DHB-0309	ليل-ملكي-dhb-0309-6d48de	ليل ملكي	\N	Dolce & Gabbana The One Royal Night	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:16:06.451	men	winter	t	/products/DHB-0309.webp	t	t	f	توابل، دافئ، خشبي	ليل ملكي، the one royal night، دولتشي اند غابانا، dolce gabbana، رجالي، هيل، ريحان، صندل، عنبر، فخم، شتوي	عطر رجالي شرقي فخم يجسد سحر الليالي الشرقية، يمزج بين حرارة الهيل وجوزة الطيب ونضارة الريحان مع قاعدة غنية وثابتة من العنبر والصندل.	DHB-0309.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
2a473ea8-80a8-4e61-b9d4-90934b86b7af	DHB-0313	لي-هوم-dhb-0313-f20c12	لي هوم	\N	Yves Saint Laurent L'Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.197	2026-07-04 21:16:07.675	men	summer	t	/products/DHB-0313.webp	t	t	f	منعش، توابل، حمضي	ال هوم ايف سان لوران، lhomme ysl، ايف سان لوران، yves saint laurent، ysl، رجالي، زنجبيل، حمضيات، أوراق البنفسج، أرز، منعش، كل المواسم	عطر رجالي أنيق ومنعش للإطلالات اليومية، يمزج بين نضارة الزنجبيل والحمضيات مع أوراق البنفسج وقاعدة خشبية كلاسيكية ناعمة من الأرز والأخشاب.	DHB-0313.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
6bbe7394-f4b2-422c-b3de-24d5d3c28710	DHB-0328	ون-مليون-dhb-0328-79742d	ون مليون	\N	Paco Rabanne 1 Million	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.224	2026-07-04 21:16:08.898	men	winter	t	/products/DHB-0328.webp	t	t	f	حلو، توابل، دافئ	ون مليون رجالي، 1 million، باكو رابان، paco rabanne، رجالي، يوسفي، نعناع، قرفة، جلد، عنبر، فخم، شتوي	عطر رجالي شرقي فخم وجذاب يمزج ببراعة بين نضارة الماندرين والنعناع وحرارة القرفة والتوابل مع قاعدة دافئة من الجلود والعنبر.	DHB-0328.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
3cb20ea9-d992-44b2-8df1-4966c40fa52f	DHB-0266	ذا-ون-dhb-0266-6ff7e6	ذا ون	\N	Dolce & Gabbana The One for Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.693	2026-07-04 21:16:11.345	men	winter	t	/products/DHB-0266.webp	t	t	f	توابل، دافئ، حلو	ذا ون رجالي، the one for men، دولتشي اند غابانا، dolce gabbana، رجالي، هيل، زنجبيل، تبغ، عنبر، صندل، فخم، شتوي	عطر رجالي دافئ وجذاب للإطلالات الراقية، يمزج بين حرارة الهيل والزنجبيل وقشر الجريب فروت مع قاعدة غنية وثابتة من العنبر والتبغ وخشب الأرز.	DHB-0266.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
699d15ea-c9f1-46ad-961e-caafd8417ec7	DHB-0279	سبلاندد-dhb-0279-38f1ca	سبلاندد	\N	Laura Mars Splendid	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.694	2026-07-04 21:16:12.568	men	summer	t	/products/DHB-0279.webp	t	t	f	أروماتك، منعش، خشبي	سبلاندد، splendid pour homme، لورا مارس، laura mars، لورد مارس، lord mars، رجالي، حمضيات، لافندر، مسك، أخشاب، منعش	عطر رجالي أروماتك منعش يتميز بتوليفة حيوية من الحمضيات واللافندر ونضارة الأعشاب مع قاعدة خشبية مسكية ناعمة ومناسبة للاستخدام اليومي.	DHB-0279.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	DHB-0284	ماي-سيلف-dhb-0284-9aac0a	ماي سيلف	\N	MYSLF Yves Saint Laurent	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.724	2026-07-04 21:16:13.79	men	summer	t	/products/DHB-0284.webp	t	t	f	زهري، حمضي، منعش	ماي سيلف، myslf ysl، ايف سان لوران، yves saint laurent، ysl، رجالي، برغموت، زهر البرتقال، أمبروكسان، فخم، كل المواسم، اصدار جديد	عطر رجالي عصري وأنيق يجمع بنعومة فريدة بين نضارة البرغموت الإيطالي وجاذبية زهر البرتقال مع قاعدة خشبية دافئة من الأمبروكسان والباتشولي.	DHB-0284.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	DHB-0299	فهرنهايت-dhb-0299-f3e27f	فهرنهايت	\N	Dior Fahrenheit	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.948	2026-07-04 21:16:15.015	men	winter	t	/products/DHB-0299.webp	t	t	f	جلدي، أروماتك، دافئ	فهرنهايت رجالي، fahrenheit edt، ديور، dior، رجالي، بنفسج، جلد، صندل، جوزة الطيب، كلاسيكي، شتوي، فخم	عطر رجالي كلاسيكي مهيب يتميز بنوتة الجلود البارزة وأوراق البنفسج وجوزة الطيب مع قاعدة خشبية دافئة وثابتة من الأرز ونجيل الهند والباتشولي.	DHB-0299.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
d241c3dc-53d9-49c0-9ba4-4f3021379bd6	DHB-0302	كوبرا-dhb-0302-c2b803	كوبرا	\N	Jeanne Arthes Cobra	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:16:16.238	men	winter	t	/products/DHB-0302.webp	t	t	f	شرقي، زهري، توابل	كوبرا القديم، cobra jeanne arthes، كوبرا، cobra، كويرا، رجالي، مسك الروم، توابل، صندل، فانيلا، كلاسيكي	عطر شرقي كلاسيكي مهيب يتميز بنفحات مسك الروم والياسمين مع مزيج حار من التوابل الدافئة وقاعدة غنية من خشب الصندل والفانيلا.	DHB-0302.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	DHB-0318	مستر-بربري-dhb-0318-107b76	مستر بربري	\N	Burberry Mr. Burberry	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.199	2026-07-04 21:16:17.705	men	both	t	/products/DHB-0318.webp	t	t	f	حمضي، أروماتك، خشبي	مستر بربري، mr burberry، بربري، burberry، بريري، رجالي، جريب فروت، هيل، خشب الأرز، فتيفير، فخم، كل المواسم	عطر رجالي عصري وراقٍ يجسد الأناقة البريطانية الكلاسيكية، يمزج بين حيوية الجريب فروت والهيل مع قاعدة خشبية دافئة من الأرز ونجيل الهند.	DHB-0318.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
e337df00-b9dd-4967-a845-0096a76ad289	DHB-0322	هيفين-dhb-0322-35879f	هيفين	\N	Chopard Heaven	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.222	2026-07-04 21:16:18.934	men	summer	t	/products/DHB-0322.webp	t	t	f	شرقي، أروماتك، منعش	هيفين القديم، heaven chopard، هيفين، heaven، رجالي، لافندر، ليمون، خشب الورد، عنبر، مسك، كلاسيكي، مقطوع	عطر رجالي كلاسيكي نادر يتميز بطابع أروماتك ناعم، يمزج بين الخزامى (اللافندر) والليمون وأخشاب الورد مع قاعدة دافئة من العنبر والمسك والتونكا.	DHB-0322.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
151ac1fd-8f54-4e59-b81f-2be2b1a664a4	DHB-0265	ديور-هوم-انتس-dhb-0265-3d711d	ديور هوم انتس	\N	Dior Homme Intense	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.692	2026-07-04 21:16:20.157	men	winter	t	/products/DHB-0265.webp	t	t	f	بودري، زهري، دافئ	ديور هوم انتس، dior homme intense، ديور، dior، رجالي، سوسن، لافندر، كمثرى، عنبر، مسك الروم، أرز، شتوي، فخم	عطر رجالي شرقي فخم للغاية ذو طابع بودري ساحر، يرتكز على فخامة زهرة السوسن واللافندر مع حلاوة الكمثرى وقاعدة دافئة من خشب الأرز والمسك.	DHB-0265.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
327c9e42-c70f-4142-b85b-e7b7fd58a32f	DHB-0280	شامبيون-دافيدوف-dhb-0280-278f61	شامبيون دافيدوف	\N	Davidoff Champion	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.695	2026-07-04 21:16:21.381	men	summer	t	/products/DHB-0280.webp	t	t	f	حمضي، منعش، خشبي	شامبيون دافيدوف، champion davidoff، دافيدوف، davidoff، رجالي، ليمون، ميرمية، أرز، طحلب البلوط، منعش، صيفي	عطر رجالي صيفي منعش بطابع رياضي، يمزج بين حمضية الليمون والبرغموت ونضارة الميرمية مع قاعدة خشبية دافئة من خشب الأرز وطحلب البلوط.	DHB-0280.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b3b64900-2aec-410f-81ce-c6472e1d0e3b	DHB-0286	ون-مليون-جولد-dhb-0286-c1687d	ون مليون جولد	\N	Paco Rabanne Million Gold for Him	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.724	2026-07-04 21:16:22.603	men	both	t	/products/DHB-0286.webp	t	t	f	حمضي، دافئ، خشبي	ون مليون جولد، million gold for him، باكو رابان، paco rabanne، رجالي، يوسفي، هيل، صندل، أرز، فخم، اصدار جديد	عطر رجالي شرقي خشبي فاخر يفوح بنضارة الماندرين والهيل الحار مع قاعدة خشبية دافئة وكريمية من خشب الصندل والأرز.	DHB-0286.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
1f102a6a-c86a-431b-8311-061a8e9f18a5	DHB-0293	ايڤوريا-ليكويد-جولد-dhb-0293-ab3b6d	ايڤوريا ليكويد جولد	\N	Calvin Klein Liquid Gold Euphoria Men	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.946	2026-07-04 21:16:23.826	men	winter	t	/products/DHB-0293.webp	t	t	f	خشبي، توابل، دافئ	ايفوريا ليكويد جولد، liquid gold euphoria men، كالفن كلاين، calvin klein، رجالي، فلفل أسود، زعفران، خشب الصندل، فخم، شتوي	عطر رجالي شرقي خشبي فاخر يتميز بتوليفة مكثفة، يمزج بين حرارة الفلفل الأسود والزعفران الثمين وقاعدة دافئة وثابتة من خشب الصندل.	DHB-0293.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
e328201a-b076-4887-9927-3ed32d89da3c	DHB-0311	ليجند-dhb-0311-9fd895	ليجند	\N	Montblanc Legend	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.927	2026-07-04 21:16:25.054	men	summer	t	/products/DHB-0311.webp	t	t	f	منعش، فواكه، خشبي	ليجند مونت بلانك، legend montblanc، مونت بلانك، montblanc، رجالي، لافندر، تفاح أحمر، أناناس، تونكا، صندل، منعش، كل المواسم	عطر رجالي عصري أنيق وذو طابع حيوي، يفتتح بعبير اللافندر وحلاوة التفاح الأحمر والأناناس مع قاعدة خشبية ناعمة من خشب الصندل والتونكا.	DHB-0311.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
19258c51-5210-4598-bb62-e829f84f09b0	DHB-0319	لي-ميل-dhb-0319-de5e6f	لي ميل	\N	Jean Paul Gaultier Le Male	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.199	2026-07-04 21:16:26.299	men	winter	t	/products/DHB-0319.webp	t	t	f	حلو، أروماتك، دافئ	لي ميل، le male، جان بول غوتييه، jean paul gaultier، jpg، رجالي، لافندر، نعناع، قرفة، فانيلا، صندل، فخم، شتوي	عطر رجالي كلاسيكي راقٍ ومشهور للغاية بتوليفته الغنية، يجمع بين برودة النعناع واللافندر وحرارة القرفة مع قاعدة دافئة من الفانيلا والأخشاب.	DHB-0319.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
877c698f-6385-4e69-a47b-0313fe652351	DHB-0323	هوت-ووتر-dhb-0323-73cc50	هوت ووتر	\N	Davidoff Hot Water	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.223	2026-07-04 21:16:27.525	men	winter	t	/products/DHB-0323.webp	t	t	f	توابل، دافئ، شرقي	هوت ووتر، hot water davidoff، دافيدوف، davidoff، رجالي، فلفل أحمر، ريحان أحمر، جاوي، باتشولي، دافئ، شتوي	عطر رجالي شرقي حار يتميز بلونه الأحمر الدافئ، يمزج بين حيوية الريحان الأحمر وحرارة الفلفل الحار والجاوي وقاعدة ترابية غنية من الباتشولي.	DHB-0323.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
20f4be9a-51ee-4756-9a64-79ded422babf	DHB-0262	ديور-هوم-سبورت-dhb-0262-e3a6a2	ديور هوم سبورت	\N	Dior Homme Sport	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.692	2026-07-04 21:16:28.748	men	summer	t	/products/DHB-0262.webp	t	t	f	حمضي، منعش، خشبي	ديور هوم سبورت، dior homme sport، ديور، dior، رجالي، ليمون، أمبر، ألديهيد، أخشاب، صيفي، منعش	عطر رجالي رياضي راقٍ يتميز بنضارة الليمون والبرغموت مع حيوية الألديهيدات وراتنج الإيليماني وقاعدة خشبية عنبرية دافئة وثابتة.	DHB-0262.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
8034090e-58ec-4514-8d62-82443952fc15	DHB-0278	سكلبشر-dhb-0278-92d78f	سكلبشر	\N	Nikos Sculpture pour Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.693	2026-07-04 21:16:30.031	men	summer	t	/products/DHB-0278.webp	t	t	f	حمضي، زهري، حلو	سكلبشر رجالي، sculpture pour homme، نيكوس، nikos، رجالي، زهر البرتقال، ليمون، ياسمين، تونكا، عنبر، صيفي، منعش	عطر رجالي صيفي منعش يمزج بجمال بين نضارة ليمون البحر المتوسط وعبير زهر البرتقال الرقيق وقاعدة دافئة وحلوة من التونكا والعنبر.	DHB-0278.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
e6088ba1-617f-4822-adf8-97b3d2768da4	DHB-0282	فوياج-dhb-0282-335028	فوياج	\N	Nautica Voyage	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.723	2026-07-04 21:16:31.27	men	summer	t	/products/DHB-0282.webp	t	t	f	بحري، منعش، أخضر	نوتيكا فوياج، nautica voyage، نوتيكا، nautica، رجالي، تفاح أخضر، أوراق خضراء، لوتس، مسك، صيفي، منعش	عطر رجالي صيفي منعش للغاية بطابع مائي، يفوح بعبير التفاح الأخضر والأوراق الخضراء المنعشة مع زهرة اللوتس وقاعدة مسكية خشبية باردة.	DHB-0282.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f3c0cd36-278f-41b9-a9ef-07385dc8bb45	DHB-0298	فهرنهايت32-dhb-0298-c137d8	فهرنهايت32	\N	Dior Fahrenheit 32	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.948	2026-07-04 21:16:32.511	men	both	t	/products/DHB-0298.webp	t	t	f	زهري، فانيلا، منعش	فهرنهايت 32، fahrenheit 32، ديور، dior، رجالي، زهر البرتقال، فانيلا، فتيفير، منعش، فخم، كل المواسم	عطر رجالي كلاسيكي فريد ومنعش يجمع بنقاء مذهل بين نضارة زهر البرتقال المغربي وحلاوة الفانيلا الدافئة مع لمسة ترابية من نجيل الهند.	DHB-0298.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
2f8c8b6e-15d2-4b93-921a-7a56783b1152	DHB-0307	كنزو-dhb-0307-f2536f	كنزو	\N	Kenzo pour Homme	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.926	2026-07-04 21:16:34.053	men	summer	t	/products/DHB-0307.webp	t	t	f	بحري، أروماتك، خشبي	كنزو هوم، kenzo pour homme، كنزو، kenzo، رجالي، مائي، صنوبر، خشب الصندل، طحلب البلوط، منعش، صيفي	عطر رجالي صيفي منعش بطابع بحري كلاسيكي، يمزج بين النوتات المائية وأوراق الصنوبر والريحان وقاعدة خشبية دافئة من الصندل وطحلب البلوط.	DHB-0307.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ec28cc53-46cd-4045-b86f-f6275b30ddb2	DHB-0314	لاكوست-اسنشل-dhb-0314-162770	لاكوست اسنشل	\N	Lacoste Essential	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.197	2026-07-04 21:16:35.286	men	summer	t	/products/DHB-0314.webp	t	t	f	أخضر، منعش، حمضي	لاكوست اسنشال، essential lacoste، لاكوست، lacoste، رجالي، ورق الطماطم، يوسفي، ورد، صندل، صيفي، منعش	عطر رجالي صيفي منعش للغاية ومميز بنوتة عشبية، يفوح بعبير أوراق الطماطم الخضراء والماندرين مع قلب وردي حار وقاعدة من خشب الصندل.	DHB-0314.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
0b92632c-950d-438d-bc32-27876a5e0583	DHB-0324	ون-مان-شو-dhb-0324-95ac8e	ون مان شو	\N	Jacques Bogart One Man Show	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.222	2026-07-04 21:16:36.52	men	winter	t	/products/DHB-0324.webp	t	t	f	أروماتك، جلدي، ترابي	ون مان شو، one man show، جاك بوجارت، jacques bogart، جاكوس، رجالي، صنوبر، ريحان، جلد، طحلب البلوط، كلاسيكي	عطر رجالي كلاسيكي قوي بطابع رجولي مكثف، يفوح بنفحات أوراق الصنوبر والريحان وحرارة التوابل مع قاعدة دافئة من الجلود وطحلب البلوط والأخشاب.	DHB-0324.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
0b47c2a7-881c-4371-a1b5-a4f61cf581da	DHB-0332	موست-وانتد-dhb-0332-52560d	موست وانتد	\N	Azzaro The Most Wanted	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:21.241	2026-07-04 21:16:37.782	men	winter	t	/products/DHB-0332.webp	t	t	f	حلو، دافئ، توابل	ذا موست وانتد، the most wanted azzaro، ازارو، azzaro، رجالي، هيل، توفي، أخشاب، فخم، شتوي، دافئ	عطر رجالي شرقي فخم يتميز بحضوره الدافئ والشهي، يجمع بين حلاوة التوفي الكريمة وحرارة الهيل وقاعدة دافئة وثابتة من الأخشاب العنبرية.	DHB-0332.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f5fee43d-13f3-43bb-8508-b08bda80dd2c	DHB-0003	بلاك-اوبيوم-dhb-0003-a86c83	بلاك اوبيوم	\N	Yves Saint Laurent Black Opium	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:36.152	2026-07-04 21:09:54.564	women	winter	t	/products/DHB-0003.webp	t	t	f	حلو، زهري، دافئ	بلاك اوبيوم، black opium، ysl، نسائي، حلو، شتوي، فخم، قهوة، فانيلا، دافئ	عطر نسائي دافئ وساحر يمزج بين فخامة حبوب القهوة وجاذبية الفانيلا الحلوة مع لمسة زهرية ناعمة.	DHB-0003.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
931cf7ac-5c5a-479a-8f5c-de4aeceb027a	DHB-0274	سوفاج-الكسير-dhb-0274-333abf	سوفاج الكسير	\N	Dior Sauvage Elixir	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:02.691	2026-07-04 21:16:40.263	men	both	t	/products/DHB-0274.webp	t	t	f	توابل، دافئ، أروماتك	سوفاج الكسير، sauvage elixir، ديور، dior، رجالي، دارسين، هيل، عرق سوس، لافندر، صندل، فخم، شتوي، حار	عطر رجالي حار وفخم للغاية ذو حضور مهيب، يمزج بين حرارة القرفة والهيل وجوزة الطيب مع عرق السوس واللافندر وقاعدة صندلية دافئة وثابتة.	DHB-0274.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
209d0031-641f-483a-9b3f-f5b81b56edb9	DHB-0290	مضاوي-جولد-dhb-0290-2c4937	مضاوي جولد	\N	Arabian Oud Madawi Gold Edition	عود	مكس	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:05.726	2026-07-04 21:16:41.512	oud	winter	t	/products/DHB-0290.webp	t	t	f	فواكه، حلو، دافئ	مضاوي جولد، madawi gold edition، العربية للعود، arabian oud، مكس، رجالي، نسائي، دراق، خوخ، ياسمين، مسك، عنبر، فخم، عطور شرقية	عطر شرقي فاخر للجنسين من العربية للعود، يمزج بجمال بين حلاوة الدراق والكمثرى والأناناس وقلب من الياسمين مع قاعدة غنية من المسك وخشب الصندل والعنبر.	DHB-0290.webp	228f3cb7-dc13-4e52-b54c-2ff4c4d57027
b24c1163-1aa1-48a2-939f-384c7fdb54b8	DHB-0294	ارماني-كود-بروفومو-dhb-0294-68b7d6	ارماني كود بروفومو	\N	Giorgio Armani Armani Code Profumo	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:08.946	2026-07-04 21:16:42.754	men	winter	t	/products/DHB-0294.webp	t	t	f	حلو، دافئ، توابل	ارماني كود بروفومو، armani code profumo، جورجيو ارماني، giorgio armani، رجالي، هيل، جوزة الطيب، جلد، تونكا، عنبر، فخم، شتوي	عطر رجالي شرقي فخم يتميز بحلاوة التونكا وجاذبية العنبر والجلود الممزوجة بحرارة الهيل وجوزة الطيب وزهر البرتقال بطابع دافئ وقوي.	DHB-0294.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
8697cd07-9cfc-4ad3-b66a-e726b205592b	DHB-0310	لابدوس-dhb-0310-7a1f13	لابدوس	\N	Ted Lapidus Lapidus pour Homme	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:11.927	2026-07-04 21:16:43.99	men	winter	t	/products/DHB-0310.webp	t	t	f	حلو، دافئ، توابل	لابدوس رجالي، lapidus pour homme، تيد لابدوس، ted lapidus، رجالي، عسل، أناناس، تبغ، بخور، كلاسيكي، شتوي	عطر رجالي كلاسيكي حار وقوي للغاية، يمزج بين حلاوة العسل والأناناس وعبير التبغ والبخور الدافئ مع قاعدة رجولية مكثفة من طحلب البلوط.	DHB-0310.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
8e7dbd83-b333-4569-8ec7-0bced577036a	DHB-0316	لاكوست-وايت-dhb-0316-2beae0	لاكوست وايت	\N	Lacoste L.12.12 Blanc	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:15.198	2026-07-04 21:16:45.226	men	both	t	/products/DHB-0316.webp	t	t	f	حمضي، زهري، جلدي	لاكوست وايت، lacoste blanc white، لاكوست، lacoste، رجالي، جريب فروت، روزماري، يلانغ، مسك الروم، جلد، صيفي، منعش	عطر رجالي صيفي منعش يفوح بعبير الجريب فروت وإكليل الجبل وقلب زهري أنيق من مسك الروم واليلانغ مع قاعدة دافئة من الجلد السويدي.	DHB-0316.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
23801d96-505a-4109-b5aa-aac795238315	DHB-0325	واي-dhb-0325-ddfafd	واي	\N	Yves Saint Laurent Y Eau de Parfum	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:50:18.223	2026-07-04 21:16:46.487	men	summer	t	/products/DHB-0325.webp	t	t	f	حمضي، أروماتك، منعش	عطر واي ايف سان لوران، y edp ysl، ايف سان لوران، yves saint laurent، ysl، رجالي، تفاح أخضر، زنجبيل، ميرمية، أرز، فخم، كل المواسم	عطر رجالي أروماتك منعش للغاية ومناسب لكل المناسبات، يمزج بين حيوية التفاح الأخضر والزنجبيل والميرمية وقاعدة خشبية عنبرية دافئة وثابتة.	DHB-0325.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
28e85aaa-f5c9-4348-b831-0a993734a059	DHB-0014	اورغنزا-dhb-0014-12ba28	اورغنزا	\N	Givenchy Organza	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:42.06	2026-07-04 21:11:39.387	women	winter	t	/products/DHB-0014.webp	t	t	f	زهري، شرقي، فانيلا	اورغنزا، organza، جيفنشي، givenchy، نسائي، زهري، كلاسيكي، فانيلا، شرقي، دافئ، كل المواسم	عطر نسائي كلاسيكي فاخر يمزج بنعومة فائقة بين عبير زهور الياسمين ومسك الروم وقاعدة دافئة من الفانيلا وجوزة الطيب.	DHB-0014.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
48d5299f-c979-4fc4-bc27-0043890a7b8d	DHB-0029	اسكادا-شيري-dhb-0029-e3df31	اسكادا شيري	\N	Escada Cherry in the Air	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:48:45.085	2026-07-04 21:11:51.872	women	both	t	/products/DHB-0029.webp	t	t	f	فواكه، حلو، دافئ	اسكادا شيري، cherry in the air، اسكادا، escada، نسائي، كرز، فواكه، حلو، مارشملو، صيفي، منعش	عطر نسائي منعش ولذيذ يفوح بعبير الكرز الأحمر الحامض وحلاوة المارشملو مع لمسة دافئة من خشب الصندل.	DHB-0029.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
6a1eaa1a-daee-4248-9aa9-0eed652bc343	DHB-0109	سكاندل-dhb-0109-46ce63	سكاندل	\N	Jean Paul Gaultier Scandal	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:12:03.239	women	winter	t	/products/DHB-0109.webp	t	t	f	حلو، باتشولي، زهري	سكاندل، scandal، جان بول غوتييه، jean paul gaultier، jpg، نسائي، عسل، باتشولي، برتقال، غاردينيا، حلو، شتوي	عطر نسائي حلو ومثير يتميز بنوتة عسل النحل والكراميل المكثف الممزوج بنضارة البرتقال الأحمر وقاعدة ترابية غنية من الباتشولي.	DHB-0109.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
5fe9c1d8-7480-425d-9933-a76dd1e61e0f	DHB-0107	سينما-dhb-0107-52c716	سينما	\N	Yves Saint Laurent Cinema	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:12:14.234	women	both	t	/products/DHB-0107.webp	t	t	f	حلو، زهري، فانيلا	سينما، cinema، ايف سان لوران، yves saint laurent، ysl، نسائي، فانيلا، ياسمين، لوز، حمضيات، فخم، شتوي	عطر نسائي كلاسيكي فاخر يجسد بريق النجمات بفضل مزيج زهور اللوز والياسمين مع كليمنتين منعش وقاعدة دافئة من الفانيلا والعنبر.	DHB-0107.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
884828eb-60d9-4423-bc31-a487113c38e7	DHB-0106	si-dhb-0106-f62bff	Si	\N	Giorgio Armani Sì	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:12:24.242	women	winter	t	/products/DHB-0106.webp	t	t	f	حلو، فواكه، باتشولي	سي، si، جورجيو ارماني، giorgio armani، نسائي، كاسيس، ورد، فانيلا، باتشولي، ناعم، كل المواسم	عطر نسائي أيقوني يجمع بين الأناقة والجاذبية، بفضل افتتاحيته من أوراق القرفة الصينية وقلبه النابض بالورد الجوري وقاعدة الباتشولي والفانيلا الدافئة.	DHB-0106.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
68d2a14a-45bb-47a3-b756-cd30710c6ff3	DHB-0102	صبايا-dhb-0102-a80fca	صبايا	\N	Al-Rehab Sabaya	نسائي	نسائي	صيفي			\N	\N	\N			t	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:12:34.049	women	summer	f	\N	f	f	f	زهري، حمضي، أخضر	صبايا، sabaya، الرحاب، al rehab، نسائي، ورد، حمضيات، منعش، أخضر، صيفي، عطور شرقية	عطر نسائي حيوي ومنعش يمزج بسلاسة بين عبير الورد الجوري ونضارة الحمضيات مع نوتات خضراء تمنحه طابعاً طبيعياً رقيقاً.	missing	235ba678-7bf9-4de8-b83a-104a6f711c34
68c6acba-e4a4-46a0-99cc-f3f1547d0acd	DHB-0111	ch-dhb-0111-eaf5c2	CH	\N	Carolina Herrera CH for Women	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.984	2026-07-04 21:12:45.289	women	both	t	/products/DHB-0111.webp	t	t	f	حلو، توابل، منعش	سي اتش، ch، كارولينا هريرا، carolina herrera، نسائي، شوكولا، قرفة، حمضيات، ياسمين، جلد، كل المواسم	عطر نسائي كلاسيكي راقٍ يمزج بين حمضيات البرغموت والليمون المنعشة وحلاوة الشوكولاته الفاخرة والقرفة مع لمسة جلدية دافئة.	DHB-0111.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
c70b7432-e4af-4b5f-b677-ff2fc03b5a34	DHB-0103	شانيل-5-dhb-0103-d0c7bf	شانيل 5	\N	Chanel No. 5	نسائي	نسائي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:12:55.333	women	both	t	/products/DHB-0103.webp	t	t	f	بودري، ألديهيد، زهري	شانيل 5، chanel no 5، شانيل، chanel، نسائي، ألديهيدات، زهور، بودري، ياسمين، صندل، فخم، كلاسيكي	عطر نسائي أيقوني كلاسيكي يتميز بتوليفة فريدة من الألديهيدات البراقة والزهور البيضاء البودرية مع قاعدة خشبية دافئة من خشب الصندل.	DHB-0103.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
b81ab7be-a94d-4d56-a26a-b09569353a37	DHB-0105	بلاك-si-dhb-0105-2ff35a	بلاك Si	\N	Giorgio Armani Sì Intense	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:09.983	2026-07-04 21:13:06.395	women	winter	t	/products/DHB-0105.webp	t	t	f	حلو، فواكه، باتشولي	بلاك سي، si intense، si black، جورجيو ارماني، giorgio armani، نسائي، توت أسود، باتشولي، ورد، فانيلا، شتوي، فخم	عطر نسائي شرقي فخم ومكثف يفوح بعبير غني من ثمار العليق والبرغموت مع قلب زهري دافئ وقاعدة عميقة من الباتشولي والفانيلا.	DHB-0105.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
89b49afd-1edc-47a0-a281-b7c66a7174d8	DHB-0118	دونا-dhb-0118-7d1096	دونا	\N	Valentino Donna	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:13:17.623	women	winter	t	/products/DHB-0118.webp	t	t	f	زهري، بودري، جلدي	دونا، donna، فالنتينو، valentino، نسائي، ورد، سوسن، بودرة، جلود، فانيلا، فخم، كل المواسم	عطر نسائي كلاسيكي فخم يجمع بين أناقة الورد الإيطالي والسوسن البودري مع قاعدة دافئة من الجلود الناعمة والباتشولي.	DHB-0118.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
e616f599-e026-469d-b89b-151d226f3e53	DHB-0113	سوبريم-بوكيه-dhb-0113-75d4e5	سوبريم بوكيه	\N	Yves Saint Laurent Supreme Bouquet	نسائي	مكس	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:13.296	2026-07-04 21:13:28.845	women	winter	t	/products/DHB-0113.webp	t	t	f	زهري، حلو، شرقي	سوبريم بوكيه، supreme bouquet، ايف سان لوران، yves saint laurent، ysl، مكس، رجالي، نسائي، مسك الروم، إيلنغ، عنبر، فخم، عطور النيش	عطر شرقي زهري فاخر ومثالي للجنسين، يحتفي بنقاء مسك الروم وأزهار الإيلنغ مع دفء العنبر والمسك بطابع راقٍ وجذاب.	DHB-0113.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
1a3778e5-2d5c-49ca-bc30-6971c142dd90	DHB-0125	كلوي-نيرسيس-dhb-0125-c552e3	كلوي نيرسيس	\N	Chloé Chloe Narcisse	نسائي	نسائي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:16.336	2026-07-04 21:13:38.616	women	winter	t	/products/DHB-0125.webp	t	t	f	زهري، حلو، توابل	كلوي نيرسيس، chloe narcisse، كلوي، chloe، نسائي، نرجس، دراق، مشمش، زهور، كلاسيكي، دافئ، شتوي	عطر نسائي كلاسيكي دافئ يتميز بنوتات زهور النرجس والقرنفل الغنية الممزوجة بحلاوة المشمش والدراق مع قاعدة خشبية دافئة وثابتة.	DHB-0125.webp	235ba678-7bf9-4de8-b83a-104a6f711c34
7c6d2688-bd20-4197-8a29-7dbb5985b236	DHB-0216	بورن-ان-روما-dhb-0216-c11326	بورن ان روما	\N	Valentino Uomo Born In Roma	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:44.227	2026-07-04 21:14:48.532	men	both	t	/products/DHB-0216.webp	t	t	f	خشبي، منعش، مالح	بينك روم، born in roma uomo، فالنتينو، valentino، رجالي، أوراق البنفسج، ملح البحر، زنجبيل، فتيفير، منعش، كل المواسم	عطر رجالي عصري وأنيق يجمع بين نضارة أوراق البنفسج وملح البحر المعدني وحرارة الزنجبيل وقاعدة خشبية دافئة من نجيل الهند.	DHB-0216.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
5e8816d8-42f1-4315-aced-83173f06eb1b	DHB-0243	كريد-بلاك-dhb-0243-293d48	كريد بلاك	\N	Creed Green Irish Tweed	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:53.433	2026-07-04 21:15:00.419	men	summer	t	/products/DHB-0243.webp	t	t	f	أخضر، منعش، خشبي	كريد بلاك، green irish tweed، كريد، creed، رجالي، ليمون، فيربينا، بنفسج، صندل، عنبر، صيفي، منعش	عطر رجالي كلاسيكي منعش يتميز بطابع عشبي أخضر، يفوح بعبير الفيربينا والليمون وأوراق البنفسج مع قاعدة خشبية فاخرة من خشب الصندل والعنبر.	DHB-0243.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
b7a6b456-f7db-4152-849b-b3ff6487805f	DHB-0255	دنهل-ديزاير-بلو-dhb-0255-2b7bd7	دنهل ديزاير بلو	\N	Alfred Dunhill Desire Blue	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:10.242	men	summer	t	/products/DHB-0255.webp	t	t	f	بحري، منعش، فواكه	دنهل ديزاير بلو، dunhill desire blue، دنهل، dunhill، رجالي، ليتشي، نوتات بحرية، لوتس، برتقال، منعش، صيفي	عطر رجالي صيفي منعش بطابع مائي يمزج بين حلاوة ثمار الليتشي الاستوائية والنوتات البحرية وزهرة اللوتس وقاعدة دافئة من التونكا والعنبر.	DHB-0255.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f8358322-e61b-4018-b2ec-4ed99c30ab20	DHB-0259	ڤرزاتشي-ايروس-dhb-0259-28cb04	ڤرزاتشي ايروس	\N	Versace Eros Pour Homme	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:20.3	men	both	t	/products/DHB-0259.webp	t	t	f	حلو، منعش، فانيلا	فرزاتشي ايروس رجالي، eros pour homme، فيرزاتشي، versace، رجالي، نعناع، تفاح أخضر، فانيلا، تونكا، منعش، فخم، كل المواسم	عطر رجالي حيوي وجذاب يتميز بفوحانه الرائع، يفتتح بنضارة أوراق النعناع والتفاح الأخضر مع قلب من التونكا وقاعدة غنية من الفانيلا والأرز.	DHB-0259.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
f91d7284-2e9b-4de7-8f49-003bcace14a7	DHB-0257	دراكار-dhb-0257-3721ef	دراكار	\N	Guy Laroche Drakkar Noir	رجالي	رجالي	كلا الفصلين			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:30.35	men	both	t	/products/DHB-0257.webp	t	t	f	أروماتك، أخضر، جلدي	دراكار نوار، drakkar noir، غي لاروش، guy laroche، رجالي، لافندر، اكليل الجبل، جلود، طحلب البلوط، كلاسيكي	عطر رجالي كلاسيكي عتيق ذو طابع رجولي بارز، يمزج بين الخزامى (اللافندر) وإكليل الجبل والريحان مع قاعدة دافئة من الجلود وطحلب البلوط والأخشاب.	DHB-0257.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	DHB-0258	ڤرزاتشي-ديلان-بلو-dhb-0258-f2eadb	ڤرزاتشي ديلان بلو	\N	Versace Pour Homme Dylan Blue	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:40.156	men	summer	t	/products/DHB-0258.webp	t	t	f	حمضي، بحري، منعش	ديلان بلو، dylan blue pour homme، فيرزاتشي، versace، رجالي، جريب فروت، نوتات مائية، أمبروكسان، بخور، منعش، كل المواسم	عطر رجالي عصري وجذاب يفوح بنضارة البرغموت والجريب فروت والنوتات المائية مع قلب من الأمبروكسان وقاعدة دافئة من البخور والتونكا والمسك.	DHB-0258.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
0fd5d982-5b25-445c-a0d9-2e085919bf83	DHB-0260	ڤرزاتشي-مان-dhb-0260-c056a3	ڤرزاتشي مان	\N	Versace Man Eau Fraiche	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:15:50.238	men	summer	t	/products/DHB-0260.webp	t	t	f	حمضي، منعش، بحري	فرزاتشي مان او فريش، versace man eau fraiche، فيرزاتشي، versace، رجالي., ليمون، كارامبولا، خشب الأرز، مائي، منعش، صيفي	عطر رجالي صيفي منعش للغاية يفوح بنضارة الليمون الأصفر وثمار الكارامبولا الاستوائية مع قلب من خشب الأرز وقاعدة مسكية مائية باردة.	DHB-0260.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
ce254908-2739-4993-89ec-7e9dc4379ee2	DHB-0252	دنهل-فريش-dhb-0252-926d43	دنهل فريش	\N	Alfred Dunhill Dunhill Fresh	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:16:00.094	men	summer	t	/products/DHB-0252.webp	t	t	f	أخضر، منعش، أروماتك	دنهل فريش، dunhill fresh، دنهل، dunhill، رجالي، عشبي، نعناع، ريحان، ميرمية، أخشاب، صيفي، منعش	عطر رجالي صيفي منعش للغاية بطابع عشبي نقي، يمزج بين نضارة أوراق النعناع والريحان والميرمية مع قاعدة خشبية ناعمة من الأرز والباتشولي.	DHB-0252.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
eb056ab6-5177-4883-88e7-ea202e37c92a	DHB-0254	دنهل-ديزاير-dhb-0254-07d479	دنهل ديزاير	\N	Alfred Dunhill Desire for a Man	رجالي	رجالي	شتوي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:56.422	2026-07-04 21:16:10.121	men	winter	t	/products/DHB-0254.webp	t	t	f	فواكه، حلو، دافئ	دنهل ديزاير الاحمر، dunhill desire red، دنهل، dunhill، رجالي، تفاح، ليمون، خشب التيك، فانيلا، باتشولي، فخم، شتوي	عطر رجالي شرقي فواح يتميز بحلاوة التفاح الأحمر الناضج والليمون المنعش مع قلب من خشب التيك وقاعدة دافئة من الفانيلا والباتشولي.	DHB-0254.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
81d4b029-3dec-4b52-87f2-ff106b930076	DHB-0264	دولتشي-k-dhb-0264-3c3d7b	دولتشي K	\N	K by Dolce & Gabbana	رجالي	رجالي	صيفي			\N	\N	\N			f	t	f	5	\N	\N	\N	\N	medium	f	\N	2026-07-04 15:49:59.692	2026-07-04 21:16:39.021	men	summer	t	/products/DHB-0264.webp	t	t	f	حمضي، أروماتك، خشبي	دولتشي كي، k by dolce gabbana، دولتشي اند غابانا، dolce gabbana، رجالي، برتقال أحمر، عرعر، فلفل حار، فتيفير، أرز، فخم، كل المواسم	عطر رجالي عصري أنيق يفتتح بحيوية البرتقال الأحمر وثمار العرعر مع حرارة الفلفل الحار وقاعدة خشبية ترابية من الأرز ونجيل الهند.	DHB-0264.webp	f97e0f51-736a-40c3-8b9f-a6b3039df682
\.


--
-- Data for Name: ProductAccord; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductAccord" (id, "productId", "position", name_ar, strength) FROM stdin;
d4a2e29f-5471-420f-bb2a-3a59fdf29062	f5fee43d-13f3-43bb-8508-b08bda80dd2c	1	فانيلا	95
64eb9746-f836-47b4-a778-b336400644c5	f5fee43d-13f3-43bb-8508-b08bda80dd2c	2	قهوة	85
1a3ebe5a-ed5a-4743-b303-fea30366acfa	f5fee43d-13f3-43bb-8508-b08bda80dd2c	3	حلو	80
33988fec-a8fe-4837-aa17-ab8555cff6eb	f5fee43d-13f3-43bb-8508-b08bda80dd2c	4	دافئ	75
aaa6446a-ead3-4fd4-976b-ee4311fdfcc2	f5fee43d-13f3-43bb-8508-b08bda80dd2c	5	زهري	70
1d97571e-eba7-4e66-9635-1437ac7ea8be	d5dbc3ff-685f-4366-a30b-867a527e8a15	1	زهري	90
c19f5bba-9fbd-4184-a15a-028225d1ef4c	0489881e-3909-4d95-9a70-56f03ca9d2b8	1	عود	95
c5df65ee-6cd2-4e52-a77d-d7a2adfe0e0d	d5dbc3ff-685f-4366-a30b-867a527e8a15	2	حلو	85
484b6b1d-38b7-4039-a28e-1814f40647d5	0489881e-3909-4d95-9a70-56f03ca9d2b8	2	شرقي	85
a8dca980-db6f-4010-a5aa-da88db88a042	d5dbc3ff-685f-4366-a30b-867a527e8a15	3	حمضي	80
80d9da10-84db-4dfe-8727-386ed9b61a3b	0489881e-3909-4d95-9a70-56f03ca9d2b8	3	عنبر	80
53d66778-81cd-4f22-95ef-e55501e2a83a	d5dbc3ff-685f-4366-a30b-867a527e8a15	4	فانيلا	75
3ad6a93b-95f8-468e-988a-84ed1d89bd44	0489881e-3909-4d95-9a70-56f03ca9d2b8	4	دافئ	75
fcc9031d-561d-45db-915a-aa8b000d4904	d5dbc3ff-685f-4366-a30b-867a527e8a15	5	دافئ	70
f6db2eb1-87df-4e71-a718-dad3bc90b656	0489881e-3909-4d95-9a70-56f03ca9d2b8	5	توابل	70
88a904e6-b5df-4f1d-beba-a19d9507ed8e	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	1	فواكه	90
cee402ca-95d7-4f24-8c44-1874d5251332	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	2	زهري	85
3b989ffb-e0be-43b5-bf61-e34bdc2eee8b	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	3	بحري	80
113b5de2-4c51-4ddd-bcc3-658ae9bbc798	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	4	أخضر	75
08de87e2-d4fd-47cc-903f-b55b32101ac4	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	5	ناعم	70
06d754e0-b9a4-4ff6-882c-6896cc5c0e09	767bc26f-f467-4b3f-9e70-f66c29c51718	1	زهري	90
c82b789f-5d6e-40ab-888d-6c99f01a865d	767bc26f-f467-4b3f-9e70-f66c29c51718	2	بودري	85
297befed-29d1-4ed9-bf4d-ecd6e3dfbb92	767bc26f-f467-4b3f-9e70-f66c29c51718	3	فواكه	80
1d9cf6cc-bd64-4035-be18-69d3f33d49cc	767bc26f-f467-4b3f-9e70-f66c29c51718	4	حمضي	75
a2a9b88b-73a6-4bf4-a5e4-61e3467bafb2	767bc26f-f467-4b3f-9e70-f66c29c51718	5	فانيلا	70
51ace2ba-e2b2-4455-8a63-9d513e54d350	c6d45800-9bae-46ef-8800-343114afa08a	1	منعش	95
962b840a-c6ae-423b-a9c0-87307c06d2af	c6d45800-9bae-46ef-8800-343114afa08a	2	حمضي	85
cd31e9d3-6a46-46f3-9858-8968bf034407	c6d45800-9bae-46ef-8800-343114afa08a	3	أروماتك	80
d42567d3-abca-4752-8c3e-4e02c62d2c1c	c6d45800-9bae-46ef-8800-343114afa08a	4	توابل	75
9ed641c6-f8fc-4b0c-8c35-41988243d30a	c6d45800-9bae-46ef-8800-343114afa08a	5	خشبي	70
ccfbffd7-71e7-4ea1-83b6-e273138fa4aa	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	1	زهري	90
8c3a7ff8-e1ab-4189-9c60-6ad9373a8445	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	2	أخضر	85
8506df07-20d4-4b6e-9669-a4e89c6e6bd6	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	3	منعش	80
1760d357-af38-4091-b3da-d2fedfc994b2	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	4	ناعم	75
44dcac7e-74cf-454b-a2b8-e2ba14adb315	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	5	مسك	70
e91a8ac6-cb24-4edf-b0a5-f1f08fe18ba9	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	1	فانيلا	95
e5f012ee-a2fa-40b4-825e-613b50f94b8e	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	2	زهري	85
b6d4ea11-4858-4e06-a114-e29261a8558e	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	3	حلو	80
fca85a89-b56b-4081-9a02-a436f3eaed90	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	4	دافئ	75
1d3b23d6-4133-4ba9-85bc-30c490534609	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	5	توابل	70
6157a9e5-2b69-455e-a7e3-bf1e26b8465b	d714c24f-a3cd-4109-b043-bb08f5cc0438	1	ياسمين	95
f4421fcb-f31e-484c-87ac-a861baf6bcd1	d714c24f-a3cd-4109-b043-bb08f5cc0438	2	عنبر	85
c2b91876-aaed-47ff-9964-5ba9ff031f21	d714c24f-a3cd-4109-b043-bb08f5cc0438	3	خشبي	80
890c3e69-0956-4f65-bcc6-96559483dc65	d714c24f-a3cd-4109-b043-bb08f5cc0438	4	دافئ	75
8308eef0-e791-4276-857f-352633cc5c3a	d714c24f-a3cd-4109-b043-bb08f5cc0438	5	زهري	70
3a01b6b6-9597-4fe3-be7b-79384b1dd853	b58cd811-68c3-46c6-b60e-c2cefb6b167c	1	فانيلا	90
d0cd9f7e-5d56-47bd-a05c-f4be457de454	b58cd811-68c3-46c6-b60e-c2cefb6b167c	2	حلو	85
2639a18d-c58f-447f-947e-8a9c3bee6c3b	b58cd811-68c3-46c6-b60e-c2cefb6b167c	3	منعش	80
059b5672-71f7-4bae-af1f-460a7079a141	b58cd811-68c3-46c6-b60e-c2cefb6b167c	4	ناعم	75
3007b0b2-3cd8-4778-b7b0-764677b9809f	b58cd811-68c3-46c6-b60e-c2cefb6b167c	5	زهري	70
5c980ad1-1920-4a6c-a5a6-e5fe941088e7	dd67cb78-da62-470d-8f29-c594b909f7a5	1	زهري	95
c02e8bfc-74bc-4898-bdb6-0674ffedb05e	dd67cb78-da62-470d-8f29-c594b909f7a5	2	فواكه	85
1cd9f244-c62e-42b3-a819-aa5a3c0f316c	dd67cb78-da62-470d-8f29-c594b909f7a5	3	مسك	80
f308e6de-4612-4966-aff0-b3f897af2c4c	dd67cb78-da62-470d-8f29-c594b909f7a5	4	عنبر	75
c5f0d13a-f05b-422b-95eb-0a75e57aba81	dd67cb78-da62-470d-8f29-c594b909f7a5	5	ناعم	70
6ef39838-c214-43d8-a41a-37413f10c65a	72f5204b-71de-40c6-bab1-ed8d5307e9f4	1	بودري	95
eb41ec4c-3165-45d3-992f-6d006b64e914	72f5204b-71de-40c6-bab1-ed8d5307e9f4	2	زهري	85
8528a247-2e28-471c-8dfd-c3ad7ed20ef6	72f5204b-71de-40c6-bab1-ed8d5307e9f4	3	ناعم	80
80b789c4-ac24-47b3-8d65-73143c9235c8	72f5204b-71de-40c6-bab1-ed8d5307e9f4	4	فواكه	75
2970d8e7-fae8-4b12-981b-63f5b1fcfb5b	72f5204b-71de-40c6-bab1-ed8d5307e9f4	5	حلو	70
68c43543-68eb-4704-9a33-18d1817dd5af	28e85aaa-f5c9-4348-b831-0a993734a059	1	زهري	95
e2dff018-2bbf-4b0c-9f04-b030a52adc23	28e85aaa-f5c9-4348-b831-0a993734a059	2	فانيلا	85
799c0282-3a14-4ae9-bbb9-44433b799aff	28e85aaa-f5c9-4348-b831-0a993734a059	3	شرقي	80
1d388274-0a20-416d-b2cf-3ac211fd5bc0	28e85aaa-f5c9-4348-b831-0a993734a059	4	توابل	75
03b08057-cfb7-4e6f-b4e1-bbe1259028bb	28e85aaa-f5c9-4348-b831-0a993734a059	5	دافئ	70
e9c7dd26-6f15-4f83-a4a2-e7f8c8078063	6db54e28-8ba7-420a-ba75-ebe7979f09d0	1	فواكه	90
fcb0f4ea-8b49-4381-9f93-3bbb162f29ff	6db54e28-8ba7-420a-ba75-ebe7979f09d0	2	حمضي	85
1f9c7577-9272-4fbc-8e65-a5460ef51e2c	6db54e28-8ba7-420a-ba75-ebe7979f09d0	3	زهري	80
49a77ed1-b788-4604-9df3-843572052fc0	6db54e28-8ba7-420a-ba75-ebe7979f09d0	4	منعش	75
a8345d56-b67e-490a-99ac-3c13f8b176f0	6db54e28-8ba7-420a-ba75-ebe7979f09d0	5	مسك	70
765c580b-e864-4d83-919e-d364054b9fba	01f8559c-9dd2-4dad-90b6-c306988299e5	1	فواكه	95
43d5faea-b12e-4ab4-98ea-49b9be206dad	01f8559c-9dd2-4dad-90b6-c306988299e5	2	حلو	85
41f6783c-8859-4e7c-bc1f-eabe23a089bb	01f8559c-9dd2-4dad-90b6-c306988299e5	3	زهري	80
7a6e0df2-7929-4986-959c-8ea642051253	01f8559c-9dd2-4dad-90b6-c306988299e5	4	ناعم	75
99d6f1a6-82bc-44b4-93c2-8f47ecffada4	01f8559c-9dd2-4dad-90b6-c306988299e5	5	مسك	70
ef3d4de0-9e46-4657-a59b-03009af059ff	7f1cb136-a5b1-4306-9704-62588862fbc2	1	حلو	95
94447fb3-9c7c-4118-a80b-64c2028f0c1a	7f1cb136-a5b1-4306-9704-62588862fbc2	2	بودري	85
713cd289-e1b9-42a7-83a1-7a4557554663	7f1cb136-a5b1-4306-9704-62588862fbc2	3	فانيلا	80
f6037cab-1b90-4da2-8d44-06bab508c04e	7f1cb136-a5b1-4306-9704-62588862fbc2	4	دافئ	75
67855a4e-af00-411f-91e5-dae684582e3d	7f1cb136-a5b1-4306-9704-62588862fbc2	5	مسك	70
bb400ea4-2574-4da2-98c8-58403840c5ef	6c1bcd69-500d-4906-96b0-e95132ffe395	1	خشبي	95
92393cbe-2dd9-4277-b267-4c63076e56fb	6c1bcd69-500d-4906-96b0-e95132ffe395	2	جلدي	85
1d82bedf-112d-4c21-8ebc-8f6982f4192a	6c1bcd69-500d-4906-96b0-e95132ffe395	3	دافئ	80
0ec2b169-6f3c-4524-8223-62f0c3fd5a65	6c1bcd69-500d-4906-96b0-e95132ffe395	4	زهري	75
a0342700-d402-41e9-8265-7f4bbc25d985	6c1bcd69-500d-4906-96b0-e95132ffe395	5	ناعم	70
b734467e-350b-4cba-a5e4-e075fdff4f19	f35f005d-502a-47b6-b092-c568c4bf3f3b	1	أخضر	90
0b8f91c6-3b69-4a3e-b53a-4492c9a38ee1	f35f005d-502a-47b6-b092-c568c4bf3f3b	2	جلدي	85
7a6d006b-d05d-4b1a-9dca-6726b5652efb	f35f005d-502a-47b6-b092-c568c4bf3f3b	3	أروماتك	80
7e47f210-9b13-4298-86c9-6430652be2f9	f35f005d-502a-47b6-b092-c568c4bf3f3b	4	خشبي	75
4e4067db-5c5b-4353-9d77-7ca92f54258a	f35f005d-502a-47b6-b092-c568c4bf3f3b	5	منعش	70
63627747-8bc9-47a4-9f2c-40020a93cb11	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	1	حلو	95
489f3c3a-3474-4409-acfe-23caf59cc146	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	2	توابل	85
c879f646-3b0f-4279-8b47-a5858e974179	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	3	دافئ	80
986994c2-8d18-4e53-9291-28c6c1bd832f	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	4	خشبي	75
80a42f2b-0ead-4a3f-8f42-f8afa84c69f1	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	5	ناعم	70
52434856-6424-4b6e-a61b-03b51f3b0c4f	74f06a46-bbc3-4df9-a35b-bdc354055041	1	شرقي	95
4b2020c7-a33b-4c82-b6dc-69c96cebb625	74f06a46-bbc3-4df9-a35b-bdc354055041	2	توابل	85
19638392-9222-49b0-967b-955b5d6d4927	74f06a46-bbc3-4df9-a35b-bdc354055041	3	زهري	80
c0091e15-13da-4afc-9f4d-aa4c3550a3ee	74f06a46-bbc3-4df9-a35b-bdc354055041	4	خشبي	75
829055cd-91ec-4b2e-a871-da1d1846ea91	74f06a46-bbc3-4df9-a35b-bdc354055041	5	دافئ	70
21b87a7c-b025-4dcd-93fb-c39c67f53efa	9a621758-3d3e-425a-bf5f-db3123a27f24	1	حمضي	90
ca3cbaad-6a72-416d-a2f3-184473a97cfc	9a621758-3d3e-425a-bf5f-db3123a27f24	2	خشبي	85
bd7c7343-7018-4a93-a380-c6a18d7ae141	9a621758-3d3e-425a-bf5f-db3123a27f24	3	دافئ	80
ba383414-ae9c-4859-866d-9a5f1d75e473	9a621758-3d3e-425a-bf5f-db3123a27f24	4	شرقي	75
f3ef4122-645b-44ed-98f9-9ff7b92c5d99	9a621758-3d3e-425a-bf5f-db3123a27f24	5	ناعم	70
43201eeb-caee-4a7c-9cd1-b2bca00e8a86	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	1	منعش	90
09a25331-0ebd-4525-b527-952b1c22cb55	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	2	خشبي	80
79c3f72a-2c5f-4818-aeaa-55ba8eafc8ea	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	3	مسك	80
83293da9-6e04-421d-aadb-d2458fb57bcd	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	4	توابل	70
1d5ef5f9-4b8a-4dab-ac0f-7fa65a4fb90c	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	5	زهري	70
4fb18a76-4b35-417c-afdf-f21ade43d38e	1f102a6a-c86a-431b-8311-061a8e9f18a5	1	خشبي	95
f6e93b8f-f2da-473e-a1df-9a7e2839884b	1f102a6a-c86a-431b-8311-061a8e9f18a5	2	توابل	85
91b02a66-ce0d-46cc-b43f-20c4ade707ee	1f102a6a-c86a-431b-8311-061a8e9f18a5	3	دافئ	80
1fb0ba84-bf07-4c38-8513-11bb40ac9327	1f102a6a-c86a-431b-8311-061a8e9f18a5	4	ناعم	75
b5dcd50e-f250-435c-8c48-e02adc7e9fbe	1f102a6a-c86a-431b-8311-061a8e9f18a5	5	ترابي	70
cbacea73-c60b-4886-b475-f9e02ceb6243	7fd8fd00-5741-458f-9b45-76abc54dd4a5	1	منعش	95
a607038a-ee59-4dc1-b417-89e821eb7ec8	7fd8fd00-5741-458f-9b45-76abc54dd4a5	2	بحري	90
8e62e3eb-0ed1-40b7-991a-21a278ad8de6	7fd8fd00-5741-458f-9b45-76abc54dd4a5	3	أروماتك	85
c013dd4c-f958-489b-911b-800e5feca425	7fd8fd00-5741-458f-9b45-76abc54dd4a5	4	خشبي	75
d34c238b-a843-4e0a-aad0-1ef1bdde80e9	7fd8fd00-5741-458f-9b45-76abc54dd4a5	5	مسك	70
68ac6299-71a9-4f4d-bd73-e1a730cdfab5	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	1	حمضي	90
04cce787-0a5b-4427-b54d-5fc4aebad3d5	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	2	خشبي	85
ce53158c-80e2-461d-bb63-aaf932c18104	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	3	أروماتك	80
0baf63f5-60cc-4b51-b1c9-0450e5d15392	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	4	توابل	75
a7a9d039-52d3-4793-8603-857fad2eb844	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	5	ناعم	70
78f65fd5-cd07-4196-b515-bc73760ae50e	877c698f-6385-4e69-a47b-0313fe652351	1	توابل	95
0e738325-92db-4ac3-9470-e213faaf0547	877c698f-6385-4e69-a47b-0313fe652351	2	دافئ	85
4afc6346-3e49-4a9c-8f0f-961a7f1529ca	877c698f-6385-4e69-a47b-0313fe652351	3	أروماتك	80
b8034e22-338a-44fd-acd4-2bd3b14ba0c7	877c698f-6385-4e69-a47b-0313fe652351	4	خشبي	75
e9a1633f-0aab-4b95-9f8c-1bdaae53d14d	877c698f-6385-4e69-a47b-0313fe652351	5	ناعم	70
ca387323-2362-49ab-97c1-54d941a433b6	ec08e506-0d25-4292-933a-7e77d056197c	1	فواكه	95
5b4ec2c7-ded2-4c75-8b3b-a3a82ea4b243	ec08e506-0d25-4292-933a-7e77d056197c	2	ورد	85
09815450-3712-4021-a9c8-e37a6d62abfd	ec08e506-0d25-4292-933a-7e77d056197c	3	حلو	80
a5fd048b-4fc1-4696-80d8-3dd635222685	ec08e506-0d25-4292-933a-7e77d056197c	4	خشبي	75
ac07326e-19fb-4e8e-8497-b4ea05943520	ec08e506-0d25-4292-933a-7e77d056197c	5	منعش	70
05e6a017-8b7a-47b7-bc2c-00ccf9ccc0d1	16d29daf-79b9-42fb-964c-b50553900528	1	حلو	95
18e1304a-dbee-4460-be89-306abf2eeb17	16d29daf-79b9-42fb-964c-b50553900528	2	فانيلا	85
68d0a11b-a70e-4703-b9f6-893eb9b96dba	16d29daf-79b9-42fb-964c-b50553900528	3	دافئ	80
4f09e918-74a8-4de6-81e9-da5da3ed356f	16d29daf-79b9-42fb-964c-b50553900528	4	شرقي	75
0483bc61-eab7-40a4-9f6a-6b3b28c2481a	16d29daf-79b9-42fb-964c-b50553900528	5	خشبي	70
deb204c3-db8d-40da-8ef2-8eb55f890c10	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	1	زهري	90
952eaf54-3376-4eae-bc97-82b5aff3131b	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	2	حلو	85
a9f2f7da-9068-46b8-970f-f80728dde930	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	3	دافئ	80
ba9605b7-833f-4597-bdcb-306fe6795fbe	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	4	فواكه	75
381e8942-6c13-4513-8e3a-134ffa969d95	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	5	قوي	70
4a675dbc-41ea-4fc6-9272-da020c53971b	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	1	منعش	95
04ef13d9-b665-443b-a36f-ee8047c2be41	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	2	توابل	85
f3fc1dca-6c7c-4ba4-a551-040b94cb0a39	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	3	حمضي	80
80b7f163-384e-4555-a120-1b67eccb7627	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	4	خشبي	75
4c34ebe5-90bc-47fc-9738-c2f6016ffb44	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	5	حلو	70
9ca7423a-eaa7-432f-9902-d2fdd83763e1	fb958e6e-1940-4631-9f05-f62028159987	1	حلو	95
14660e58-9fd2-4496-acd2-3b69a7126c20	fb958e6e-1940-4631-9f05-f62028159987	2	توابل	85
9754d4e1-adb1-42c9-90f9-aefc94a1f14c	fb958e6e-1940-4631-9f05-f62028159987	3	دافئ	80
303cd315-fd09-44c8-b90a-be1433ff5e6f	fb958e6e-1940-4631-9f05-f62028159987	4	زهري	75
fdfa9fde-c7c1-4336-b9b7-7b810b8f435a	fb958e6e-1940-4631-9f05-f62028159987	5	خشبي	70
ad2625ce-407d-4982-889d-962a105bc042	15553f08-c40c-4fd8-a166-4194e9075710	1	أروماتك	90
da7db721-0d4d-4906-9eb4-98ef88bd6bc1	15553f08-c40c-4fd8-a166-4194e9075710	2	فواكه	85
aa507d0d-2334-47ad-9b05-4c6b11d311b1	15553f08-c40c-4fd8-a166-4194e9075710	3	توابل	80
7a5136cc-3949-48e7-a2c1-2179994c80dc	15553f08-c40c-4fd8-a166-4194e9075710	4	حلو	75
14e16af9-e1b2-460e-b96d-f4121b3539be	15553f08-c40c-4fd8-a166-4194e9075710	5	خشبي	70
f494ac42-3d8b-49c9-b7e7-f2f889116659	20f4be9a-51ee-4756-9a64-79ded422babf	1	حمضي	95
af809905-a751-46b8-8b24-a80542ec2e62	20f4be9a-51ee-4756-9a64-79ded422babf	2	منعش	90
68eb2437-9846-42e0-99a8-18730e19f1a8	20f4be9a-51ee-4756-9a64-79ded422babf	3	خشبي	80
68ae15da-ca94-4bae-ae95-87db18a055bd	20f4be9a-51ee-4756-9a64-79ded422babf	4	توابل	75
9e9dd3c6-b49e-4d04-a37a-84346d5ee3d2	20f4be9a-51ee-4756-9a64-79ded422babf	5	دافئ	70
59b1adf1-e893-4877-882a-16e662d4bea8	8034090e-58ec-4514-8d62-82443952fc15	1	حمضي	95
6ffdff20-c125-4741-a256-4b1287da66bc	8034090e-58ec-4514-8d62-82443952fc15	2	زهري	85
78d539a0-87ff-48b5-9a74-97a088fa8d8c	8034090e-58ec-4514-8d62-82443952fc15	3	حلو	80
a05ae67a-a285-47a1-9cf9-b39704fd023d	8034090e-58ec-4514-8d62-82443952fc15	4	دافئ	75
b6fe100d-279d-4d7e-a519-9a591ae54982	8034090e-58ec-4514-8d62-82443952fc15	5	ناعم	70
b01eaff5-38d5-41c7-87be-a13400610a65	e6088ba1-617f-4822-adf8-97b3d2768da4	1	منعش	95
0465b183-b4e9-4c15-a118-2342f6625b95	e6088ba1-617f-4822-adf8-97b3d2768da4	2	بحري	90
e11592a7-c264-41e2-9b85-8dd0f83571c3	e6088ba1-617f-4822-adf8-97b3d2768da4	3	فواكه	85
a75613bc-d2c2-48c5-8640-3c915d3098b6	e6088ba1-617f-4822-adf8-97b3d2768da4	4	زهري	75
fb02fb19-17a4-473c-9894-95f07d42f749	e6088ba1-617f-4822-adf8-97b3d2768da4	5	أخضر	70
8bd17162-6558-4861-a6c5-669343ded94e	1bc47f29-3bd9-4148-9a23-03bb30709767	1	مسك	95
1fa6177f-eb78-4bec-84b6-d8381d2a4587	1bc47f29-3bd9-4148-9a23-03bb30709767	2	زهري	90
43d026ae-77c1-43a9-a956-6ea7b46a1ac8	1bc47f29-3bd9-4148-9a23-03bb30709767	3	ناعم	80
95d3f22c-f7f5-4359-8b5a-bad3582a2080	1bc47f29-3bd9-4148-9a23-03bb30709767	4	منعش	75
9a1514c2-345b-4b50-87b1-1902b1c29968	1bc47f29-3bd9-4148-9a23-03bb30709767	5	خشبي	70
e072150a-361e-4315-970e-2e19e2f766ad	2f8c8b6e-15d2-4b93-921a-7a56783b1152	1	منعش	95
2183dc5d-f23f-467d-b3df-eaa16a4b73f3	2f8c8b6e-15d2-4b93-921a-7a56783b1152	2	بحري	90
b1ed3bc7-9149-4ecf-8ca2-3366110d4a41	2f8c8b6e-15d2-4b93-921a-7a56783b1152	3	أروماتك	85
e1c04a31-8e50-4ff5-bb13-07e3f4f525d8	2f8c8b6e-15d2-4b93-921a-7a56783b1152	4	خشبي	75
f3c8196e-ebf3-4ab0-a706-11583a7ac82c	2f8c8b6e-15d2-4b93-921a-7a56783b1152	5	ترابي	70
49a416a8-91e7-41a7-82c9-2deae2e06ea9	ec28cc53-46cd-4045-b86f-f6275b30ddb2	1	أخضر	95
32d304a7-c24d-4ad3-84d4-7ed1aad3f30c	ec28cc53-46cd-4045-b86f-f6275b30ddb2	2	حمضي	85
be6bc6f5-b106-49ac-bafd-8c73ae790b79	ec28cc53-46cd-4045-b86f-f6275b30ddb2	3	منعش	80
ceaf215a-1bbd-455b-a764-e9be6c5d7365	ec28cc53-46cd-4045-b86f-f6275b30ddb2	4	توابل	75
1bba0757-81df-4759-b9d2-85fbab007801	ec28cc53-46cd-4045-b86f-f6275b30ddb2	5	خشبي	70
045b2369-7804-4212-b4ce-b5d66f95591a	0b92632c-950d-438d-bc32-27876a5e0583	1	أروماتك	95
a80652dc-234f-42d2-8188-f738931315f1	0b92632c-950d-438d-bc32-27876a5e0583	2	جلدي	85
16c60046-d3f8-4c39-b806-5c0bdd25b627	0b92632c-950d-438d-bc32-27876a5e0583	3	ترابي	80
ae26c423-30e5-43dc-bc29-38d41170e66c	0b92632c-950d-438d-bc32-27876a5e0583	4	توابل	75
159a4b49-2447-40aa-9045-5f8c9d7dd6d2	0b92632c-950d-438d-bc32-27876a5e0583	5	خشبي	70
2401dbce-0972-4fc0-8807-18994558cf5b	84e50a6c-c3e0-4114-9150-d6205212b7ca	1	فواكه	90
e91afd67-8008-4fef-99b0-5c002f61897a	84e50a6c-c3e0-4114-9150-d6205212b7ca	2	زهري	85
70b95332-46b7-45f8-a8c6-591628336b7b	84e50a6c-c3e0-4114-9150-d6205212b7ca	3	خشبي	80
9167f937-b455-42b3-af5e-7a5c53a2d4ea	84e50a6c-c3e0-4114-9150-d6205212b7ca	4	حلو	75
5e72c980-3440-440a-8054-fd411d571420	84e50a6c-c3e0-4114-9150-d6205212b7ca	5	عنبر	70
52eee1a4-40d1-4705-8f60-dfacde94f609	33b4dc2a-b042-4330-8113-fda43f07cd10	1	حلو	95
f18ba5b8-a826-4dea-aea6-494e23e2730e	33b4dc2a-b042-4330-8113-fda43f07cd10	2	فواكه	85
74f6600a-6ee8-4a3a-bf43-e2ab9f0b1c19	33b4dc2a-b042-4330-8113-fda43f07cd10	3	فانيلا	80
c9c68f5e-2ab9-469b-a297-5c7257c08a1a	33b4dc2a-b042-4330-8113-fda43f07cd10	4	ناعم	75
1814f9f1-1b89-4412-849e-9ea21bce5ae9	33b4dc2a-b042-4330-8113-fda43f07cd10	5	زهري	70
5cee2dc5-7db7-452b-894f-533ad0b752a1	1b719431-0f16-4095-b56e-c037998814aa	1	حلو	90
384c15aa-3ba6-4fb8-b4fb-13c4503b782f	1b719431-0f16-4095-b56e-c037998814aa	2	فواكه	85
d7d2c93b-507c-4a20-90a2-270209b57b68	1b719431-0f16-4095-b56e-c037998814aa	3	زهري	80
b6fe60af-1f07-460e-9ed1-141233c653d4	1b719431-0f16-4095-b56e-c037998814aa	4	دافئ	75
012bad1f-ad09-4591-90e2-c0305d394f01	1b719431-0f16-4095-b56e-c037998814aa	5	ناعم	70
4a885956-5a2d-4171-9f51-60ae4b6e1d41	39f1b89f-b571-4834-92b4-cf83698fd761	1	حلو	95
043d205f-b0bd-422d-ab0a-3f16fd800cfd	39f1b89f-b571-4834-92b4-cf83698fd761	2	توابل	85
ffa54f48-349f-47a0-a8a2-7774e55c4c8e	39f1b89f-b571-4834-92b4-cf83698fd761	3	دافئ	80
938bee85-1b59-4b53-8c9c-1a66d64260e3	39f1b89f-b571-4834-92b4-cf83698fd761	4	زهري	75
18a8e46f-4979-4966-839d-72ebf6a25d52	39f1b89f-b571-4834-92b4-cf83698fd761	5	خشبي	70
e031629b-7d2e-45c7-8f0b-23a5c68cf6b0	038ba25e-adea-4aa2-9167-e955a0c2dbbc	1	حمضي	95
a5c41c55-412c-4870-a7f5-dc1e34c910c7	038ba25e-adea-4aa2-9167-e955a0c2dbbc	2	توابل	85
f1cc3251-a1dc-4801-a3e5-999e5679f640	038ba25e-adea-4aa2-9167-e955a0c2dbbc	3	دافئ	80
1540874e-39b9-49a1-87a0-5504d48d3f19	038ba25e-adea-4aa2-9167-e955a0c2dbbc	4	خشبي	75
7b885b69-2db6-493b-91d4-af3d6482a089	038ba25e-adea-4aa2-9167-e955a0c2dbbc	5	ترابي	70
fa84c575-f2f4-4d2f-b5cf-ab850fa90b31	f8358322-e61b-4018-b2ec-4ed99c30ab20	1	منعش	95
4c27d225-1f8b-4cf0-9ec1-8d06b0aeaa23	f8358322-e61b-4018-b2ec-4ed99c30ab20	2	فواكه	85
f1816150-d8f7-4544-a7ff-41bef4f67e9e	f8358322-e61b-4018-b2ec-4ed99c30ab20	3	فانيلا	80
334c9966-e195-43ea-a16a-227b4e7808c8	f8358322-e61b-4018-b2ec-4ed99c30ab20	4	حلو	75
e875129c-55c2-4b5f-9166-e87d944ed128	f8358322-e61b-4018-b2ec-4ed99c30ab20	5	خشبي	70
2035c64e-7c28-49f9-8db0-7d64de0f1232	fd1f56db-0a26-4e9e-8703-433044728b1c	1	توابل	90
a3923241-3827-4861-98e2-4fb539048091	fd1f56db-0a26-4e9e-8703-433044728b1c	2	فواكه	85
ce558e09-8b48-4be9-88a4-a7eb6f92b4e9	fd1f56db-0a26-4e9e-8703-433044728b1c	3	جلدي	80
20af746c-d540-4bd1-a6e3-13039094c259	fd1f56db-0a26-4e9e-8703-433044728b1c	4	أروماتك	75
cbeabfda-3845-471e-99a3-5c86e50ae1cf	fd1f56db-0a26-4e9e-8703-433044728b1c	5	خشبي	70
0b7a4da6-b633-44cb-84e3-15a3da35ce7a	327c9e42-c70f-4142-b85b-e7b7fd58a32f	1	حمضي	95
72fe2bf2-f232-4d9c-b19b-47749698562b	327c9e42-c70f-4142-b85b-e7b7fd58a32f	2	أروماتك	85
b3eb7e95-932c-4c28-8302-de4064de9810	327c9e42-c70f-4142-b85b-e7b7fd58a32f	3	منعش	80
a36a1cea-d789-44d8-aaf3-36cee809bb83	327c9e42-c70f-4142-b85b-e7b7fd58a32f	4	خشبي	75
71bbecef-b4f8-4c06-a370-d6b25d96fb7f	327c9e42-c70f-4142-b85b-e7b7fd58a32f	5	ترابي	70
b3f5dd15-9940-4a90-8443-2699eb735656	af72522f-1085-4f94-ba11-206256972db1	1	أروماتك	95
55e9a385-a243-48e8-bad6-7e82ef0d2221	af72522f-1085-4f94-ba11-206256972db1	2	حمضي	85
27e69330-bd44-420b-b601-54ebec7063b0	af72522f-1085-4f94-ba11-206256972db1	3	منعش	80
78e37d36-f2c8-4d2b-93e4-7f6a6546ec66	af72522f-1085-4f94-ba11-206256972db1	4	خشبي	75
8391e8fe-0ad5-4149-afac-ad4ce6cbdbe8	af72522f-1085-4f94-ba11-206256972db1	5	ناعم	70
d223724e-51f5-4092-8cd8-f25ab1efbb74	f00ab0e4-7352-4724-a5b6-9dcce9714156	1	منعش	95
4283300b-1d99-4fb6-a8e2-ed3c09364de4	f00ab0e4-7352-4724-a5b6-9dcce9714156	2	بحري	90
4ea06a83-f93d-4d4b-b9bf-693cb4285b49	f00ab0e4-7352-4724-a5b6-9dcce9714156	3	حمضي	80
2574ec81-3357-4c45-a0a0-05638e69c3ff	f00ab0e4-7352-4724-a5b6-9dcce9714156	4	أروماتك	75
6b9f5c83-010c-421a-8618-e648fd4a87c2	f00ab0e4-7352-4724-a5b6-9dcce9714156	5	مسك	70
29e3b75d-e228-4661-9fc2-1f08b0fab034	5a7c4378-e660-48ea-8550-2f2faee9958b	1	حمضي	95
7da06670-feba-41ed-b535-e2c4626ae5ed	5a7c4378-e660-48ea-8550-2f2faee9958b	2	منعش	90
8a636565-2d2b-4a84-9163-236678ade23c	5a7c4378-e660-48ea-8550-2f2faee9958b	3	توابل	80
fa2ecd4e-8102-4d70-b795-2cda0b66d3e1	5a7c4378-e660-48ea-8550-2f2faee9958b	4	خشبي	75
df29e810-4696-4332-a3c5-0f93aa41ae4f	5a7c4378-e660-48ea-8550-2f2faee9958b	5	مسك	70
8f0683bf-431c-4f99-be5b-bf2a840944c3	95a6f8ff-c74f-4a93-8475-a16c901900f7	1	حمضي	95
7783a18d-9a4b-4021-9994-945a9d374c09	95a6f8ff-c74f-4a93-8475-a16c901900f7	2	توابل	85
83b0a4af-e079-4a70-9847-b93c55b2441f	95a6f8ff-c74f-4a93-8475-a16c901900f7	3	منعش	80
ed0f0c59-ad88-4df4-92f1-976515e81421	95a6f8ff-c74f-4a93-8475-a16c901900f7	4	أروماتك	75
ba82992f-2358-4de7-8e98-18a481fcb0f5	95a6f8ff-c74f-4a93-8475-a16c901900f7	5	خشبي	70
c61a9f51-bff1-45ee-8dc3-35556e548453	6bbe7394-f4b2-422c-b3de-24d5d3c28710	1	حلو	95
e3815be6-474d-4949-9b55-4162bc060df8	6bbe7394-f4b2-422c-b3de-24d5d3c28710	2	توابل	85
16a47b50-8c5b-4fc8-a602-5543207cf2f8	6bbe7394-f4b2-422c-b3de-24d5d3c28710	3	حمضي	80
8bb3e777-1a7c-4a63-8c7f-700df4654b27	6bbe7394-f4b2-422c-b3de-24d5d3c28710	4	جلدي	75
1038d8b6-1fc0-4360-9165-6a6d55aba3b0	6bbe7394-f4b2-422c-b3de-24d5d3c28710	5	خشبي	70
42efeb1c-a5a0-406a-863f-f8578096e645	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	1	فواكه	90
0de610a6-2e9b-4945-b4d7-f0af5e5b5128	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	2	زهري	85
e70d9b89-929c-4189-b4e9-13c015fdfb69	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	3	منعش	80
1178e3db-c852-4e04-8c58-8d25ca320132	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	4	مسك	75
cca27ca7-9fa3-497d-96c0-dea202990ba9	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	5	ناعم	70
f0676577-917a-449f-85c8-e79db6422ab4	0ece9262-5007-4fc7-959d-b6804cb359b9	1	حلو	95
9a4e5b84-3638-4274-8196-17d75eb617aa	0ece9262-5007-4fc7-959d-b6804cb359b9	2	فواكه	85
29b4246b-433f-4ae1-b5de-6c37f160498b	0ece9262-5007-4fc7-959d-b6804cb359b9	3	فانيلا	80
11043989-55ee-47df-a46d-2285395cba3b	0ece9262-5007-4fc7-959d-b6804cb359b9	4	دافئ	75
b8f353ee-8b2a-4b30-8eb0-ee5406c9acec	0ece9262-5007-4fc7-959d-b6804cb359b9	5	زهري	70
b7709829-b33f-49f5-8ce0-60142dd045a3	df36fd9b-d366-4c34-a5fa-1199df68bb26	1	ورد	95
9af8577c-4c9c-4c45-920c-cbe6791d9fde	df36fd9b-d366-4c34-a5fa-1199df68bb26	2	فواكه	85
6ddbbd4d-da5e-41d9-9173-abb615a6d965	df36fd9b-d366-4c34-a5fa-1199df68bb26	3	مسك	80
eecdd2cf-6353-4b00-a03a-a14b5a29c833	df36fd9b-d366-4c34-a5fa-1199df68bb26	4	ناعم	75
10ca44ce-eaf4-4c79-8a75-5e5c87b3c55c	df36fd9b-d366-4c34-a5fa-1199df68bb26	5	خشبي	70
9d30a4cd-58fb-4942-ab0e-64d347d4d9f1	080c200f-9f88-4fb3-9aeb-c460331b4fad	1	منعش	95
1751d472-c3d7-4508-9d3c-770fe462fa46	080c200f-9f88-4fb3-9aeb-c460331b4fad	2	حمضي	85
87a7c77c-51c4-4370-a0a7-d313838148d2	080c200f-9f88-4fb3-9aeb-c460331b4fad	3	فواكه	80
d7c06ae2-4a0b-4ac0-8a45-1a8e61a0a580	080c200f-9f88-4fb3-9aeb-c460331b4fad	4	أخضر	75
522bdabb-b751-40cb-90bc-11b0649f1965	080c200f-9f88-4fb3-9aeb-c460331b4fad	5	مسك	70
52c738ee-93df-4172-8d6c-b7ba272e4034	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	1	توابل	95
8391ed8a-c1b6-4787-bbe9-0fcba4623714	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	2	جلدي	85
9649c95c-3ba8-4784-90ca-c77adf3c77e9	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	3	دافئ	80
ef7a5197-ee7b-492e-a8c0-22c9568d96c9	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	4	ترابي	75
9c5a2767-61e2-4093-a4e5-ee7411a3e684	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	5	أروماتك	70
b2403326-0ff0-4ad0-b975-fa5c34d53fbb	0fd5d982-5b25-445c-a0d9-2e085919bf83	1	حمضي	95
8004f510-5bdd-429b-8073-2bdbc5ac7f35	0fd5d982-5b25-445c-a0d9-2e085919bf83	2	منعش	90
8bc16256-7d95-43ba-af26-7f3d0ef59922	0fd5d982-5b25-445c-a0d9-2e085919bf83	3	أروماتك	80
a6bb3d73-3d9b-4d20-84ed-b5c19beec911	0fd5d982-5b25-445c-a0d9-2e085919bf83	4	خشبي	75
803e9976-f164-4db9-b3ad-70e66eaafe6c	0fd5d982-5b25-445c-a0d9-2e085919bf83	5	مسك	70
048f8a50-bf2a-4e40-b69b-a7f7475f8032	ca089290-93aa-4fd2-ab79-7b77e9c040cc	1	حمضي	95
34e8c7d5-6f6b-4909-a9d4-7bb6ea7943eb	ca089290-93aa-4fd2-ab79-7b77e9c040cc	2	منعش	90
33bd0be3-b09b-4452-b9c4-c7e33c1c327d	ca089290-93aa-4fd2-ab79-7b77e9c040cc	3	مسك	80
85cd2482-7926-49f4-bfeb-722b63610bd7	ca089290-93aa-4fd2-ab79-7b77e9c040cc	4	زهري	75
81ff1efc-c519-479b-8cdc-8e585467a9a6	ca089290-93aa-4fd2-ab79-7b77e9c040cc	5	خشبي	70
fc2664f6-c4f9-46fd-b08b-ad2427b3ab8d	24f725b1-37dc-405d-94ab-21acf34aba16	1	توابل	95
d03f8e7e-e901-4e7a-87c3-2bbe37ea127c	24f725b1-37dc-405d-94ab-21acf34aba16	2	دافئ	85
88b5dcd3-8799-4d31-93e5-cd8e202b0845	24f725b1-37dc-405d-94ab-21acf34aba16	3	جلدي	80
2454e129-649a-42ab-868b-f16b94b11eb6	24f725b1-37dc-405d-94ab-21acf34aba16	4	حمضي	75
f3ee2845-983c-405b-81eb-3e661034a1c2	24f725b1-37dc-405d-94ab-21acf34aba16	5	خشبي	70
13974a1b-6e81-4372-bd1d-ec6c3c1504f5	209d0031-641f-483a-9b3f-f5b81b56edb9	1	فواكه	95
db90d88c-f739-418d-b848-0f46edaeed18	209d0031-641f-483a-9b3f-f5b81b56edb9	2	حلو	85
f266f3c1-e532-49ee-848c-4700f063aaee	209d0031-641f-483a-9b3f-f5b81b56edb9	3	دافئ	80
494657bd-3a87-4e2f-9d79-f8bf6dce81d0	209d0031-641f-483a-9b3f-f5b81b56edb9	4	مسك	75
9014d1c8-7544-48be-9aa7-b39c09077a65	209d0031-641f-483a-9b3f-f5b81b56edb9	5	خشبي	70
da6dc338-6a2c-4fe0-a04f-df8fd70766af	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	1	جلدي	95
608baabb-eb19-4f51-819d-efdfdf1b86cd	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	2	أروماتك	85
fbb72a35-6511-47cd-8f1f-8cdd6d425f47	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	3	دافئ	80
ffbec0b1-e697-425b-85dd-5f79febb5547	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	4	خشبي	75
dd5739dd-ba69-4f9b-b82b-776340d2cdfb	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	5	ترابي	70
1163f4dc-355a-4c96-b2ea-2cc70f9cdfd4	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	1	منعش	95
40ca7626-0a6a-4c89-9866-b93738772160	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	2	فواكه	85
b6cb170b-c275-489a-8103-aebda3fae832	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	3	أروماتك	80
3aeeb3a1-c4b0-4381-a885-ea2dcf9fb7bc	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	4	مسك	75
eb0e41ac-9cde-41b3-a76f-3cf969c2f050	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	5	خشبي	70
4d61f2be-1a31-48b2-8565-bdeced811af1	e21c17a0-331b-4c9c-ad7f-db1e3242b916	1	توابل	95
701be32f-ce3b-4572-8584-9fbbdadb92c0	e21c17a0-331b-4c9c-ad7f-db1e3242b916	2	أروماتك	85
e25bf3a9-4839-473d-b8f3-11754722806c	e21c17a0-331b-4c9c-ad7f-db1e3242b916	3	خشبي	80
35219b52-30c5-4ffe-be25-836cfbb18c09	e21c17a0-331b-4c9c-ad7f-db1e3242b916	4	حمضي	75
034eecbe-5872-41c1-8150-21c09c887d74	e21c17a0-331b-4c9c-ad7f-db1e3242b916	5	دافئ	70
31b86e2c-4003-4838-8161-1d26d35edd99	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	1	حمضي	95
9e07f863-3355-40b8-9942-d6f00a09d455	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	2	حلو	85
f1328d74-e0fd-4319-8db4-338b43880849	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	3	منعش	80
66dd7898-ab0a-48d2-99a0-9678d89df854	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	4	توابل	75
d099caaf-93e4-424a-a73b-b75cf4789cf8	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	5	خشبي	70
e64ff982-afd0-4831-b395-47c67c1dc5eb	bbbe0953-9dad-41a1-b246-0bbf527278d2	1	فانيلا	90
99d05054-3698-4ef1-98be-3e3c5e23ffda	bbbe0953-9dad-41a1-b246-0bbf527278d2	2	حلو	85
c55ccff1-430c-4868-94fb-57835a764840	bbbe0953-9dad-41a1-b246-0bbf527278d2	3	زهري	80
6503e6cb-167b-495e-b1c7-8fd410d1792f	bbbe0953-9dad-41a1-b246-0bbf527278d2	4	توابل	75
cb66353e-6b98-4f24-8057-ff74397666c1	bbbe0953-9dad-41a1-b246-0bbf527278d2	5	دافئ	70
c9e7beb3-7ce5-4969-adc9-4e7d86b5d4d7	73d4130e-1c54-4d63-8249-4f129c97cd90	1	فواكه	95
ab6bf03b-a817-4379-927c-06cc02ff453d	73d4130e-1c54-4d63-8249-4f129c97cd90	2	حلو	85
07a34a76-66d6-42eb-a131-936260762f90	73d4130e-1c54-4d63-8249-4f129c97cd90	3	حمضي	80
e9e43d93-c95b-4fc0-8f72-621be2f327ba	73d4130e-1c54-4d63-8249-4f129c97cd90	4	ناعم	75
3f416375-9ad9-41bb-95e2-9f37e45f0eb4	73d4130e-1c54-4d63-8249-4f129c97cd90	5	مسك	70
3a586f4c-0ea0-48b2-92fd-9c6411a10d9a	a05ed06e-e57e-48f3-8e26-a861760bd2fb	1	بودري	95
d926f56f-36b3-4e9f-baaf-95dbbfa4a625	a05ed06e-e57e-48f3-8e26-a861760bd2fb	2	ناعم	85
85cafb3c-d878-4916-985e-b278ca434dff	a05ed06e-e57e-48f3-8e26-a861760bd2fb	3	ورد	80
703d8eef-422c-487a-b8c7-620ca5552f08	a05ed06e-e57e-48f3-8e26-a861760bd2fb	4	مسك	75
4f8a23db-e6a5-4ac7-8681-315324636676	a05ed06e-e57e-48f3-8e26-a861760bd2fb	5	خشبي	70
b46642e5-53ae-45b7-a9e0-c3a70686e922	f716cb4e-a53b-4637-9305-15a4ae9cd578	1	أروماتك	95
3331fbdf-0e16-4bc2-8c51-8f136dd2bf7b	f716cb4e-a53b-4637-9305-15a4ae9cd578	2	حمضي	85
89fb5e7f-3c8a-4d4b-be42-bcb93711736a	f716cb4e-a53b-4637-9305-15a4ae9cd578	3	زهري	80
a595283b-d811-4acd-835f-c1f896d3a8dd	f716cb4e-a53b-4637-9305-15a4ae9cd578	4	خشبي	75
313e5085-eb47-4fcc-b32a-23b91a0f1370	f716cb4e-a53b-4637-9305-15a4ae9cd578	5	ناعم	70
4726f40a-e6b4-4ff8-bb87-f3cc6117f6db	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	1	دافئ	95
5e9be484-eb15-4611-92ec-e7c859ac347c	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	2	جلدي	85
4c0ce034-014f-4377-88e3-f21991bd7ae2	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	3	توابل	80
7f8c7cd0-7a7a-49fc-bded-dd9013a3b6ae	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	4	خشبي	75
ad699447-08c1-4350-85cc-508bd6d8a59f	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	5	حمضي	70
a8bf0ab0-442f-4201-9861-d39f62cf92cb	74771738-b03e-4746-a16e-a5577e605f98	1	حمضي	90
1f7a539a-efa6-4d2b-b6a2-ab86d479df7c	74771738-b03e-4746-a16e-a5577e605f98	2	توابل	85
6bc5119d-af06-4a04-a916-c530a9c16836	74771738-b03e-4746-a16e-a5577e605f98	3	منعش	80
96b15b19-0894-4134-b465-69c7fec2c605	74771738-b03e-4746-a16e-a5577e605f98	4	خشبي	75
ddcbb76c-a692-4717-8a2f-765c4d478fd8	74771738-b03e-4746-a16e-a5577e605f98	5	جلدي	70
3202b042-d6f5-4d1f-8bdc-8a52617aedc3	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	1	بودري	95
13512b1d-501c-4f27-a89d-0865e66f68e1	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	2	زهري	85
5de7a7f3-fc89-43f8-8127-0da47ce645cc	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	3	دافئ	80
7300b3c3-93fa-4d51-b04c-8cae348cf4c0	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	4	فواكه	75
314c070c-5de6-406e-8204-ad302f952ddb	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	5	خشبي	70
9ebd6a9e-6e9d-43ee-8927-937d9124cbe7	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	1	منعش	95
bedae034-2317-414d-91d8-5bd557cadc1a	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	2	أروماتك	85
b090dd1e-3d71-43b3-b5ea-2321d5ee2d5a	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	3	خشبي	80
24142523-b663-46f7-9aea-90f2cf26bbd2	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	4	مسك	75
28642cfe-ca09-41be-8197-8d438c38a195	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	5	ناعم	70
900f6246-cdd2-4eda-86ac-745fbfcd1a95	842e3ac0-435e-4ffb-9070-79a13e1a63cb	1	حلو	95
7c101dd4-2230-47a3-8484-3b1571a31705	842e3ac0-435e-4ffb-9070-79a13e1a63cb	2	أروماتك	85
65527f28-e249-4684-8269-2a991ff9649c	842e3ac0-435e-4ffb-9070-79a13e1a63cb	3	توابل	80
91390310-8e37-4196-a436-180c0cf25956	842e3ac0-435e-4ffb-9070-79a13e1a63cb	4	دافئ	75
98a729b1-2c9a-4e5d-81e8-8d77325028a3	842e3ac0-435e-4ffb-9070-79a13e1a63cb	5	خشبي	70
7f96e8b9-c582-4d84-acc8-9df3b8af6f7e	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	1	منعش	95
e4c37798-35ef-4bd0-ac7c-10efe58aa0a2	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	2	فواكه	85
363c94b0-7d6d-4082-9e76-a4b43bfcd14f	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	3	فانيلا	80
4ad2dd0e-3c9b-46e8-a47a-50acca3638f1	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	4	حلو	75
b1c1f2aa-9a12-4fa4-934c-97af367f5a35	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	5	خشبي	70
37a6e6fa-74c4-4712-a567-aafe395f0f9e	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	1	فواكه	95
0ac9e668-6803-4d3b-a966-8631858dd0e2	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	2	خشبي	85
e35355dd-6521-465d-99e2-2a98527e27e7	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	3	منعش	80
bf86baf3-7bd2-4598-8f20-d0c49edc864a	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	4	ترابي	75
8a98cf7a-ec51-4019-89d3-96a53915629f	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	5	مسك	70
01ba3d56-e3ce-4ed7-b102-ddac95385160	306985d9-8ffb-4b62-9a71-cadf1d3ce599	1	منعش	95
88673f76-639e-48b6-91e7-195fb2860929	306985d9-8ffb-4b62-9a71-cadf1d3ce599	2	بحري	90
8fc4a043-2e7e-4c9f-916d-5381fe37d60c	306985d9-8ffb-4b62-9a71-cadf1d3ce599	3	حمضي	85
bbd277ec-c502-4de5-a865-7865db93a63b	306985d9-8ffb-4b62-9a71-cadf1d3ce599	4	توابل	75
2c3003d4-2ca5-4202-9857-f65e4cdabc83	306985d9-8ffb-4b62-9a71-cadf1d3ce599	5	مسك	70
88558b1f-6733-4885-88d1-1244ed76c85a	23801d96-505a-4109-b5aa-aac795238315	1	حمضي	95
490c1fd2-8f9f-44ba-9ec6-7c58cb82f048	23801d96-505a-4109-b5aa-aac795238315	2	أروماتك	85
62a346be-2c9b-4e39-9808-139ce5082591	23801d96-505a-4109-b5aa-aac795238315	3	منعش	80
bbc73c6a-b3b3-478d-a99c-39f89b66f29e	23801d96-505a-4109-b5aa-aac795238315	4	خشبي	75
d01d80c3-15a9-4b8b-8b04-38e29f44c8e8	23801d96-505a-4109-b5aa-aac795238315	5	دافئ	70
472fd9b7-5ae3-4308-aa92-859bdd5332b0	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	1	فواكه	95
9c247cc1-11f3-4126-9daa-a44bcfb30f86	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	2	حمضي	85
d4a317c6-4a1f-4cc3-8520-1feae1c31e74	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	3	حلو	80
30a02c18-8194-44e0-97ec-8dbb7cfa4f08	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	4	زهري	75
a44e3bed-e3b4-4ffa-b9c3-5c3f202d21be	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	5	فانيلا	70
ae4cf919-6a97-40bb-b5d6-a13fecc7b816	75ac202c-2415-48cf-ab16-a80f2e043943	1	فواكه	95
defb92d1-d103-46aa-a14e-950fee4f416f	75ac202c-2415-48cf-ab16-a80f2e043943	2	حلو	85
b8fc135d-b787-4b5c-a27b-7f7d27b51008	75ac202c-2415-48cf-ab16-a80f2e043943	3	منعش	80
3855afc6-7bdf-4180-ae34-c3592d6c2737	75ac202c-2415-48cf-ab16-a80f2e043943	4	زهري	75
8a2b8d08-9435-479b-81fe-d6b0beba4361	75ac202c-2415-48cf-ab16-a80f2e043943	5	مسك	70
2acab677-9cab-4656-917e-88d5f0b5f9ad	8abad596-27ef-4643-8d66-4842a06760d6	1	ورد	95
d679da2a-0be7-4309-aa82-884eb81b7cf3	8abad596-27ef-4643-8d66-4842a06760d6	2	فواكه	85
8103ce8e-1798-412c-9ae4-149b569d0610	8abad596-27ef-4643-8d66-4842a06760d6	3	ناعم	80
8c4f936d-5762-48f3-bb1c-5b498b732c10	8abad596-27ef-4643-8d66-4842a06760d6	4	منعش	75
b6aba127-7777-4273-8657-7994e19cc8c1	8abad596-27ef-4643-8d66-4842a06760d6	5	مسك	70
fa5ae8a6-f754-4e3f-9d8e-b3efd53a7b1a	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	1	حمضي	95
09559e86-7971-42b7-81a8-700905282e6d	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	2	خشبي	85
32d91c39-a434-4e69-907e-48a0ce9f82db	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	3	ترابي	80
57060287-5d17-4bff-a681-ab6e11e2ce0e	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	4	توابل	75
5f1030ba-b86a-4950-ba21-7f7d9b07134b	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	5	ناعم	70
bd75ddc9-b7e8-4b6a-a68a-32695ff0b00b	32280cdb-f1a5-4c78-bdfe-0a63755583d4	1	منعش	95
fa778e43-c5a1-4010-88f9-aa45b2d0034b	32280cdb-f1a5-4c78-bdfe-0a63755583d4	2	فواكه	85
5efd5d41-b49c-4c3c-86ec-e4782ca86e84	32280cdb-f1a5-4c78-bdfe-0a63755583d4	3	توابل	80
0797cfa8-e7f0-4664-b835-35deb022aad2	32280cdb-f1a5-4c78-bdfe-0a63755583d4	4	خشبي	75
4dfd0ea8-483a-4acf-9250-72e95c6fe41b	32280cdb-f1a5-4c78-bdfe-0a63755583d4	5	مسك	70
cf9f536c-8a26-450f-9cb0-43b3237cc175	f91d7284-2e9b-4de7-8f49-003bcace14a7	1	أروماتك	95
d77b3694-5242-42a4-b827-9fde9e3125ac	f91d7284-2e9b-4de7-8f49-003bcace14a7	2	أخضر	85
21b83348-adf9-4118-9664-669bed5a7185	f91d7284-2e9b-4de7-8f49-003bcace14a7	3	ترابي	80
cfb31881-780c-4aa4-8e26-3317ce4c1482	f91d7284-2e9b-4de7-8f49-003bcace14a7	4	جلدي	75
6ff9b088-1229-4598-9e20-a484f7cef9bb	f91d7284-2e9b-4de7-8f49-003bcace14a7	5	خشبي	70
8ebb59b1-1e9f-42d3-9e99-fe493669b95c	662ef73f-78a7-4f64-8994-df72da082c28	1	مسك	95
d300f171-aa72-44f8-89c4-898142b362ca	662ef73f-78a7-4f64-8994-df72da082c28	2	خشبي	85
ef479c6f-48eb-46f3-a28f-87bc9a99f1a7	662ef73f-78a7-4f64-8994-df72da082c28	3	منعش	80
fbf80d13-f22e-4a05-9aa7-7067a5d6c64d	662ef73f-78a7-4f64-8994-df72da082c28	4	زهري	75
8aeb4c51-930d-4696-bd2e-a837d92e09b2	662ef73f-78a7-4f64-8994-df72da082c28	5	ناعم	70
a6c2671c-ceab-4c67-92ce-e5a9b81a7f1f	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	1	جلدي	95
345da099-9528-426b-aaab-1c3ab207392e	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	2	توابل	85
c5971da9-dec2-4a0b-8f2b-97c041286f3a	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	3	دافئ	80
5b99913e-60e9-44f6-9fc3-facb78faa6dc	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	4	خشبي	75
51b733db-8026-4e60-95f6-7a6d10054d1e	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	5	أروماتك	70
a6f9335b-6e98-4e41-85da-5aae0b188ef3	bca4baf7-e4dc-4dff-928b-f214ac8800fd	1	منعش	95
51705c2c-bfea-4be6-ad29-44394daacc43	bca4baf7-e4dc-4dff-928b-f214ac8800fd	2	بحري	90
074b0446-7e79-4054-936c-bb2c0618344d	bca4baf7-e4dc-4dff-928b-f214ac8800fd	3	ترابي	80
35d06951-79ce-4da5-814d-a0a6242a8b99	bca4baf7-e4dc-4dff-928b-f214ac8800fd	4	توابل	75
563baac5-9029-4ae5-86cd-a3945eeb0e1b	bca4baf7-e4dc-4dff-928b-f214ac8800fd	5	خشبي	70
531b059b-b5ac-4162-80cf-065d5a2782c8	b7473554-6287-40b5-90fa-9df6187953f3	1	أروماتك	95
d81a9348-fe0c-414e-bc72-a9e5c7d1e5ae	b7473554-6287-40b5-90fa-9df6187953f3	2	خشبي	85
ef4819f1-6079-4d8a-984d-c6ab24c94013	b7473554-6287-40b5-90fa-9df6187953f3	3	توابل	80
bd22d1da-fff0-4858-a53e-5eb416524bf8	b7473554-6287-40b5-90fa-9df6187953f3	4	ترابي	75
d65bf4b9-d530-4648-a5bc-45cd50f4baba	b7473554-6287-40b5-90fa-9df6187953f3	5	دافئ	70
0da90cc3-ddde-4628-a93b-cf578e65eff4	e328201a-b076-4887-9927-3ed32d89da3c	1	أروماتك	95
9358295e-1912-4e80-8531-c6d3cc2a472c	e328201a-b076-4887-9927-3ed32d89da3c	2	فواكه	85
b5b6a00a-e737-4ce7-9d55-c8accd3da3f9	e328201a-b076-4887-9927-3ed32d89da3c	3	منعش	80
f1b71734-3019-433d-8eeb-8b5aef747cd6	e328201a-b076-4887-9927-3ed32d89da3c	4	خشبي	75
37e003c3-875d-4f14-88ba-2fa8a019f33b	e328201a-b076-4887-9927-3ed32d89da3c	5	ناعم	70
6ff6b908-5151-4d50-8ae6-de3336313f42	8e7dbd83-b333-4569-8ec7-0bced577036a	1	حمضي	95
01efec0d-edf4-489b-98aa-baaeed39e094	8e7dbd83-b333-4569-8ec7-0bced577036a	2	منعش	85
09ed5ccf-387a-4c37-8aca-18d6d7a6e7e4	8e7dbd83-b333-4569-8ec7-0bced577036a	3	زهري	80
2e810e4e-57d1-4f1e-9944-61a0b400e015	8e7dbd83-b333-4569-8ec7-0bced577036a	4	جلدي	75
4262193a-b8f5-4b7f-a64f-415dfff34706	8e7dbd83-b333-4569-8ec7-0bced577036a	5	خشبي	70
43d2c9c8-1dc3-4ee1-a74f-59ec7c3fc306	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	1	حلو	95
08226a5e-a46f-4e51-ae84-030f728b079a	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	2	مكسرات	90
2cf4b500-6120-4885-9280-08e18f56b0b5	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	3	خشبي	80
9a00afd4-551c-4e25-af97-1073bcd32ef2	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	4	منعش	75
0727011c-7706-448f-9da8-5fb6922e32f8	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	5	ناعم	70
c6b5d9d5-3f7e-419b-801f-6d960c7872d7	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	1	زهري	95
5d2c600e-9216-40cc-b53e-e1bcd3ef077d	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	2	عسل	85
eda07f32-d310-4cb4-963f-66f1f5ce697c	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	3	حلو	80
94b41304-c79f-4574-901f-7d2de087597f	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	4	باتشولي	75
31e80593-62a1-473f-b32b-575c9884fb70	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	5	ناعم	70
a7baa1e5-41ca-4e2c-94d3-9131a4dd3979	bed6484b-64cf-4785-9323-3805baed49a1	1	ورد	95
4a3df996-dbed-44b2-8973-136fb0b2ed73	bed6484b-64cf-4785-9323-3805baed49a1	2	مسك	85
9959fb24-e56c-417f-b96b-a11e5bdd3b8d	bed6484b-64cf-4785-9323-3805baed49a1	3	زهري	80
761ffb25-c7df-453c-a704-93cc64ab6b3d	bed6484b-64cf-4785-9323-3805baed49a1	4	ناعم	75
ce2f7073-fc4d-4f42-a3f2-bdecc4bd3899	bed6484b-64cf-4785-9323-3805baed49a1	5	منعش	70
8c26732f-525e-4e10-99d6-d6080f71a9c9	d1b1746c-1ec4-4692-ae96-47e2aadee234	1	فواكه	90
a222ced8-da00-430b-8553-da95365bd387	d1b1746c-1ec4-4692-ae96-47e2aadee234	2	فانيلا	85
93cfb9a1-c9fa-4fd5-aa4f-87bcad94362e	d1b1746c-1ec4-4692-ae96-47e2aadee234	3	خشبي	80
60513bcb-51a5-4278-86ab-67e5446fac88	d1b1746c-1ec4-4692-ae96-47e2aadee234	4	دافئ	75
d3b30ae3-2247-429a-b42b-a35255f3a5c3	d1b1746c-1ec4-4692-ae96-47e2aadee234	5	توابل	70
52b6d6bb-c2d5-4e30-ac07-f70c4ac42b26	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	1	حلو	95
68e68e81-72d2-46a8-8649-397d98c2b041	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	2	توابل	85
0dba6874-098b-42c3-af77-e8cf7932052c	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	3	دافئ	80
7ee338fe-098c-459f-9ac4-5ea428c79503	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	4	خشبي	75
5aeae1df-8c9e-4115-bf4d-02aa88db9b87	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	5	حمضي	70
63ff95a9-5516-4d3c-8312-f2f37de34895	7b85426f-e196-49f4-8354-d934e832a2ec	1	زهري	95
fd48d14d-3e4f-4dd9-b6b2-eb32af382fda	7b85426f-e196-49f4-8354-d934e832a2ec	2	حلو	85
a8cab40e-ff67-4814-bc3c-42135fdf13ea	7b85426f-e196-49f4-8354-d934e832a2ec	3	دافئ	80
2c5676b1-8c0a-4308-92cb-40e5402b868b	7b85426f-e196-49f4-8354-d934e832a2ec	4	بودري	75
2602f832-44aa-4984-b89b-72e249e8d833	7b85426f-e196-49f4-8354-d934e832a2ec	5	توابل	70
7d110caa-4a7e-44cd-b29a-c12b9cf1d807	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	1	حمضي	95
b8e1bafe-65e2-42e1-b9c5-dcde8fbf776c	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	2	منعش	90
92e15dfe-a747-4b5e-903b-ef4f2f94362e	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	3	توابل	80
b009acff-c3bb-4dbd-a1da-3b7c2987b5e2	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	4	ترابي	75
e55d5a51-89c4-4183-b5fa-42dd1e888c31	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	5	مسك	70
41854a27-abeb-4e83-a8b9-494e687af9fb	127f37c8-72be-40df-9ae2-8fd333586096	1	جلدي	95
2f55d375-ac92-4944-a009-4a4f5ea1ff99	127f37c8-72be-40df-9ae2-8fd333586096	2	حلو	85
4772238b-0929-4a84-b12c-2a83780bb3bc	127f37c8-72be-40df-9ae2-8fd333586096	3	دافئ	80
77cec556-d1b5-473f-8ddb-c0630e0592bc	127f37c8-72be-40df-9ae2-8fd333586096	4	أروماتك	75
3a65bb17-0c25-4eed-8ef6-d9386d764845	127f37c8-72be-40df-9ae2-8fd333586096	5	خشبي	70
70cf28bd-e7ac-448b-aaee-1eb85d648c55	342d937e-95f0-469b-9c44-db23c035fc8c	1	حلو	95
14260226-0447-461c-9140-9137d7446c67	342d937e-95f0-469b-9c44-db23c035fc8c	2	زهري	85
e8ca5bbd-9a12-4d99-9481-05f24e1fa26b	342d937e-95f0-469b-9c44-db23c035fc8c	3	توابل	80
cbc530b4-5295-498e-862b-f01c4cce853a	342d937e-95f0-469b-9c44-db23c035fc8c	4	خشبي	75
ec359b94-0b14-425b-a5f2-47c6d8eb9d38	342d937e-95f0-469b-9c44-db23c035fc8c	5	ناعم	70
2fa00dcf-b5ec-4b2a-9536-365de51b7050	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	1	حمضي	95
2e12ef59-6c62-498d-a5b0-921462fb5ee8	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	2	زهري	90
8b9869ed-067b-4a2a-9b9f-00c81f9a0cd8	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	3	منعش	85
ec54489c-a8a2-4425-a91f-4cd276d17dab	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	4	خشبي	75
e599abdd-e518-41cd-aa2d-f5d44464bad6	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	5	ناعم	70
863a88e6-f509-4966-8fd5-c2f323a057d9	db074475-2bdc-44a6-88cb-3f24570f0974	1	حمضي	95
1e852043-246f-4468-a27c-5fbfc8bef5be	db074475-2bdc-44a6-88cb-3f24570f0974	2	منعش	90
c34a2957-142a-4728-a476-1136527ef29c	db074475-2bdc-44a6-88cb-3f24570f0974	3	أروماتك	80
7a39c2b8-d5fd-48e5-8fe8-5b953fa010b1	db074475-2bdc-44a6-88cb-3f24570f0974	4	خشبي	75
7ce3478e-ac18-4ab8-aef9-1a8863237715	db074475-2bdc-44a6-88cb-3f24570f0974	5	مسك	70
2638ca33-4ccc-41d5-86d5-4080d5f650fd	8697cd07-9cfc-4ad3-b66a-e726b205592b	1	حلو	95
16e0ed9a-5046-43ce-af2f-17094da2f16c	8697cd07-9cfc-4ad3-b66a-e726b205592b	2	دافئ	85
0c49b2cf-c25f-40a8-ab65-6598c3c32330	8697cd07-9cfc-4ad3-b66a-e726b205592b	3	ترابي	80
25531c1f-3f5d-4863-a382-d54420858f6e	8697cd07-9cfc-4ad3-b66a-e726b205592b	4	أروماتك	75
293cbfc5-0af5-453b-8d37-5d326815ce86	8697cd07-9cfc-4ad3-b66a-e726b205592b	5	خشبي	70
2673852c-e38e-43ca-a181-83a57f7869b0	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	1	حلو	95
4aa58a90-bab5-4b7b-b419-0e60f3815357	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	2	فواكه	90
8af8e427-0b0e-47e1-9888-f2fb59d072ba	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	3	أروماتك	85
ce12e31d-0e09-42b0-8f15-4395a34eff69	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	4	توابل	80
7769772b-ae0a-49c0-8bb3-326fe0168754	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	5	دافئ	75
81096b08-1ad3-488f-9ffb-602ed05c596d	cb51dfe2-adb2-42d2-970a-abbc99990bfa	1	أخضر	95
f8150dd5-ce32-4ee3-a84e-6a8ff1e18dd7	cb51dfe2-adb2-42d2-970a-abbc99990bfa	2	منعش	85
6df8c24b-d3bc-4ad8-a4fa-7f02396ef11d	cb51dfe2-adb2-42d2-970a-abbc99990bfa	3	أروماتك	80
db498f20-80e7-4999-80d2-1e1809a0b498	cb51dfe2-adb2-42d2-970a-abbc99990bfa	4	خشبي	75
63f1b010-5745-4e90-bda0-71cc0b4069b4	cb51dfe2-adb2-42d2-970a-abbc99990bfa	5	ناعم	70
6afc3108-ed37-4829-a641-7563d5fa9d7e	48d5299f-c979-4fc4-bc27-0043890a7b8d	1	فواكه	95
974c5167-0766-44f8-950a-e9ad8b73e58a	48d5299f-c979-4fc4-bc27-0043890a7b8d	2	حلو	90
46f3c82f-b570-43f2-9ac3-50736fbdca83	48d5299f-c979-4fc4-bc27-0043890a7b8d	3	ناعم	80
10b1f29f-a0d3-45ab-aec7-f1f31d4538c4	48d5299f-c979-4fc4-bc27-0043890a7b8d	4	منعش	75
577e6307-16c1-4df6-96ec-d6c4455a14c2	48d5299f-c979-4fc4-bc27-0043890a7b8d	5	خشبي	70
78518d17-da4a-448e-a89f-cb282c70f30d	ff170f46-3d00-4500-9eb4-c137ecf3a31c	1	حلو	95
98621182-685d-42ca-9be4-3d6149a07b37	ff170f46-3d00-4500-9eb4-c137ecf3a31c	2	زهري	85
38ff3bb2-e74b-41c2-a93a-6c94a7ef507b	ff170f46-3d00-4500-9eb4-c137ecf3a31c	3	خشبي	80
1cd8d76c-adde-4548-bf17-a47a0ad817dc	ff170f46-3d00-4500-9eb4-c137ecf3a31c	4	دافئ	75
112c3230-9380-4a1f-89be-3237f23db329	ff170f46-3d00-4500-9eb4-c137ecf3a31c	5	ناعم	70
0ed905f1-b7fa-43d8-a8a3-d14827ae905e	3f1fea43-0c89-4a0f-9c85-69a142b7de27	1	أروماتك	95
be75d44c-94ea-46ee-a667-69fa82c61447	3f1fea43-0c89-4a0f-9c85-69a142b7de27	2	حلو	85
edd63e2c-40c2-469a-8c21-e470e9418fc8	3f1fea43-0c89-4a0f-9c85-69a142b7de27	3	دافئ	80
a7ade4b5-d0b5-44cf-abc5-2b76868d5a55	3f1fea43-0c89-4a0f-9c85-69a142b7de27	4	مسك	75
56104508-3055-427d-ab29-d8c69a2d4d08	3f1fea43-0c89-4a0f-9c85-69a142b7de27	5	ناعم	70
00470aa1-0746-4b5d-ae24-498f637f8edc	9b38d053-84d0-4542-924b-51079e6d990c	1	بودري	95
aabad8e4-7fa3-4088-b25c-2ebc1bb296ce	9b38d053-84d0-4542-924b-51079e6d990c	2	حلو	85
12c6afdc-4c6d-4e24-b0f6-25942d3072ef	9b38d053-84d0-4542-924b-51079e6d990c	3	دافئ	80
c73a2664-a14c-4340-acfa-84e964b55ae6	9b38d053-84d0-4542-924b-51079e6d990c	4	توابل	75
a9b907e4-71c7-4501-b0d4-d0e6b622b2b2	9b38d053-84d0-4542-924b-51079e6d990c	5	باتشولي	70
8531ea24-88fb-47da-9d02-d7f9dbe24b1c	ce254908-2739-4993-89ec-7e9dc4379ee2	1	أخضر	95
23f142d6-6d44-4316-93f8-48840f542128	ce254908-2739-4993-89ec-7e9dc4379ee2	2	منعش	85
e8c950e6-394b-4d63-8e2a-78c15a0ad55c	ce254908-2739-4993-89ec-7e9dc4379ee2	3	أروماتك	80
f5807ba2-5da8-476a-b48f-dc1a2e6b2404	ce254908-2739-4993-89ec-7e9dc4379ee2	4	زهري	75
388892a2-ca13-4557-b41c-09f9f74cba76	ce254908-2739-4993-89ec-7e9dc4379ee2	5	خشبي	70
5b9b5694-24b7-48cf-9adc-22b060963169	67338e16-a200-4937-a647-72f4a7218d40	1	منعش	95
743853c5-f275-4808-a0ac-a674c12ace89	67338e16-a200-4937-a647-72f4a7218d40	2	بحري	90
423a2234-e41b-4e9f-892d-9aa0932d5fed	67338e16-a200-4937-a647-72f4a7218d40	3	أروماتك	85
9f8cf100-af36-403e-af35-67234fc624bf	67338e16-a200-4937-a647-72f4a7218d40	4	توابل	80
ba716116-65c4-4eaa-9233-1d75f6ff86e0	67338e16-a200-4937-a647-72f4a7218d40	5	مسك	70
df5fb238-5fe5-42a1-aa57-c0912a0a32fd	699d15ea-c9f1-46ad-961e-caafd8417ec7	1	منعش	90
8f48a76e-7fb6-4240-8599-09755b1b5c4b	699d15ea-c9f1-46ad-961e-caafd8417ec7	2	حمضي	85
b4b1d1ba-b2f9-41b4-9bd6-0a74d0fcdbff	699d15ea-c9f1-46ad-961e-caafd8417ec7	3	أروماتك	80
d22459d6-c619-4fdf-9203-60a0ab9902ab	699d15ea-c9f1-46ad-961e-caafd8417ec7	4	خشبي	75
55f737fa-2726-472e-ae5f-a648da7db68a	699d15ea-c9f1-46ad-961e-caafd8417ec7	5	مسك	70
d9ab838c-5f61-450e-b0d9-d0da50796a54	b3b64900-2aec-410f-81ce-c6472e1d0e3b	1	حمضي	95
0fb3684d-69a0-4c9b-8621-8710ab7a29da	b3b64900-2aec-410f-81ce-c6472e1d0e3b	2	توابل	85
990fdb18-2a5c-4217-884a-771e92102a55	b3b64900-2aec-410f-81ce-c6472e1d0e3b	3	خشبي	80
5e5dd7f3-9bd1-42aa-ae2b-00cc798a6632	b3b64900-2aec-410f-81ce-c6472e1d0e3b	4	دافئ	75
0b361581-8f6f-4bb5-8622-cda75e58aca2	b3b64900-2aec-410f-81ce-c6472e1d0e3b	5	ناعم	70
d8378239-b095-4e1c-96b0-c959f71d1225	23c96d2c-f0bc-44c6-985d-ae133ff60463	1	توابل	95
a411a2dd-a3f4-4100-afa2-107a2b9afa78	23c96d2c-f0bc-44c6-985d-ae133ff60463	2	حمضي	85
b931bdef-d24a-45ed-8571-1ae0b0c4c563	23c96d2c-f0bc-44c6-985d-ae133ff60463	3	منعش	80
a8c28ca5-ce3c-48cf-9562-8c642c7d4080	23c96d2c-f0bc-44c6-985d-ae133ff60463	4	خشبي	75
7ad3dfab-c64c-4010-ac89-addec47c4f1c	23c96d2c-f0bc-44c6-985d-ae133ff60463	5	ترابي	70
6b304d97-23db-454f-a823-a08f1852b1b9	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	1	توابل	95
2aa20645-3fa0-4bcf-b965-cac9d6b2e272	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	2	دافئ	85
a7185880-32ef-42ef-b4df-70ef1a3c8921	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	3	خشبي	80
f2bad623-48f7-4a94-8782-fb62355daf47	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	4	أروماتك	75
07d6cee7-0d9e-4ab4-8591-a19c47f2f3af	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	5	ناعم	70
ba34bb29-2883-4d28-8330-10d7936757e5	2a473ea8-80a8-4e61-b9d4-90934b86b7af	1	توابل	95
6653f462-2449-43ad-9253-5f2edd0a8746	2a473ea8-80a8-4e61-b9d4-90934b86b7af	2	حمضي	85
58839161-3472-4077-b1f2-988091b9ce2a	2a473ea8-80a8-4e61-b9d4-90934b86b7af	3	منعش	80
6fa147f3-0b59-4a1e-b542-5e374b8191ac	2a473ea8-80a8-4e61-b9d4-90934b86b7af	4	خشبي	75
f7040d4a-cdad-4b39-9a1d-86edd751e10a	2a473ea8-80a8-4e61-b9d4-90934b86b7af	5	زهري	70
729e62ff-e7d0-4fd6-b5ce-c92736ff2abf	56e35a49-ecda-4caa-b0fd-415b90d4da83	1	حمضي	95
e28586eb-3a2d-406f-b3b3-331a7878c364	56e35a49-ecda-4caa-b0fd-415b90d4da83	2	توابل	85
3a248ed8-51e8-4726-9126-d7b94f2c4934	56e35a49-ecda-4caa-b0fd-415b90d4da83	3	منعش	80
7942a340-a2d2-42ff-9b75-9a604bb89d59	56e35a49-ecda-4caa-b0fd-415b90d4da83	4	أروماتك	75
4ab3c1fe-136e-41dc-8a24-fb3ab2047fdc	56e35a49-ecda-4caa-b0fd-415b90d4da83	5	خشبي	70
2ef79d05-c597-41c8-b757-54dc5bb005a2	856088c4-d455-4674-86d7-1abe92e243b6	1	فواكه	90
67188588-b4e0-4368-aad1-c6d5979d0bbc	856088c4-d455-4674-86d7-1abe92e243b6	2	زهري	85
d1e582cf-422f-44e0-a376-7a01a8accf0d	856088c4-d455-4674-86d7-1abe92e243b6	3	ناعم	80
610a900e-707f-43d9-9bc6-475e0d252a0b	856088c4-d455-4674-86d7-1abe92e243b6	4	مسك	75
90395eef-3fae-4bac-8dcc-5939f9bd2f7f	856088c4-d455-4674-86d7-1abe92e243b6	5	حلو	70
420d83f9-f0b2-4a85-b15d-5020a47a842b	3c88b567-7ac2-44c7-8726-fa4902c0650b	1	زهري	95
14da417b-03ce-4ae7-bd1a-c06663e6c257	3c88b567-7ac2-44c7-8726-fa4902c0650b	2	بودري	85
f03e29db-4a09-49af-ab23-cd2cd2b2e6c6	3c88b567-7ac2-44c7-8726-fa4902c0650b	3	مسك	80
89b2da4a-9fb4-43b2-874b-3f766100477f	3c88b567-7ac2-44c7-8726-fa4902c0650b	4	ناعم	75
92f10433-87bf-4711-8beb-7fd6a5d6fcd6	3c88b567-7ac2-44c7-8726-fa4902c0650b	5	فواكه	70
263fa87c-3b48-4132-bd60-53cb2700535b	826baa70-73c7-4b98-9be5-a081641317d9	1	أخضر	95
a14b4fc7-6835-4322-9d68-81fabe7ca312	826baa70-73c7-4b98-9be5-a081641317d9	2	منعش	85
6a8f2b1e-5457-4f66-ac6c-7c5adba860fa	826baa70-73c7-4b98-9be5-a081641317d9	3	مسك	80
49e97814-5d92-4a9d-98c7-a21e1f6ddbc7	826baa70-73c7-4b98-9be5-a081641317d9	4	أروماتك	75
e6217082-8977-4272-b052-9e4b9239f1d8	826baa70-73c7-4b98-9be5-a081641317d9	5	خشبي	70
49069e9b-8e32-4f4d-9ab8-1609335a4b72	5e8816d8-42f1-4315-aced-83173f06eb1b	1	أخضر	95
d1de5613-ff89-4280-a5d3-4597eaa11b4e	5e8816d8-42f1-4315-aced-83173f06eb1b	2	منعش	90
dc088768-0308-41ad-be5f-f0893bb09331	5e8816d8-42f1-4315-aced-83173f06eb1b	3	خشبي	80
f60a1a33-03f4-43a3-93dc-fad9db0da4a7	5e8816d8-42f1-4315-aced-83173f06eb1b	4	ترابي	75
36be9ff3-b9ed-4a31-a6e5-e8bf556cc545	5e8816d8-42f1-4315-aced-83173f06eb1b	5	زهري	70
7f8a6db6-d983-47bc-9702-0d117673c3e1	eb056ab6-5177-4883-88e7-ea202e37c92a	1	فواكه	95
f1113ecf-63c0-4d35-be85-d4f3fabe599c	eb056ab6-5177-4883-88e7-ea202e37c92a	2	حلو	85
b78ca8ae-c669-409e-9b8a-adf1be909704	eb056ab6-5177-4883-88e7-ea202e37c92a	3	حمضي	80
ec10f0d5-39a5-413e-b74d-96b26754fbe8	eb056ab6-5177-4883-88e7-ea202e37c92a	4	خشبي	75
4fb417a4-6203-46ad-b19a-7e18fa77c5ce	eb056ab6-5177-4883-88e7-ea202e37c92a	5	ناعم	70
f198b9a8-5360-45b3-ad91-4759cf65dc0f	3cb20ea9-d992-44b2-8df1-4966c40fa52f	1	دافئ	95
e523b36a-f101-467c-95d9-422ceee73427	3cb20ea9-d992-44b2-8df1-4966c40fa52f	2	توابل	85
5c097147-a2e8-4eb4-8e26-ec66bf4429ae	3cb20ea9-d992-44b2-8df1-4966c40fa52f	3	حلو	80
e8c675c0-aa98-446b-8288-507cdaca40c8	3cb20ea9-d992-44b2-8df1-4966c40fa52f	4	حمضي	75
c4aaeb76-f59a-48f5-90e9-8d109b2cc4d8	3cb20ea9-d992-44b2-8df1-4966c40fa52f	5	خشبي	70
aa489f28-c0bf-4fec-a897-26b5a76da031	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	1	توابل	95
e50cfbb7-04dc-406a-8bae-da0550e1ef75	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	2	أروماتك	85
717b7a7a-691f-48bd-993a-cb1f6bfeddad	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	3	دافئ	80
319c7512-705b-4d3e-be06-d9dda6177a36	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	4	خشبي	75
b1bd50d2-5112-4ead-85f3-e8f75f3b8a42	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	5	حمضي	70
c527942b-83f3-42f2-ba8b-d6b7b72ee935	d38eaac4-f66c-4e17-b50e-b26128346195	1	توابل	95
872539d9-14a7-4a34-ad70-e9d95628f411	d38eaac4-f66c-4e17-b50e-b26128346195	2	منعش	90
31bba342-46c5-4a17-91d4-d1987177dd95	d38eaac4-f66c-4e17-b50e-b26128346195	3	خشبي	80
9c75ed75-abf4-450e-8bb1-3e5a4a88155e	d38eaac4-f66c-4e17-b50e-b26128346195	4	أروماتك	75
808dbacc-2042-4757-8351-7ef39d83c5a9	d38eaac4-f66c-4e17-b50e-b26128346195	5	دافئ	70
148b02cd-167b-451b-b1c7-952528ff988e	b24c1163-1aa1-48a2-939f-384c7fdb54b8	1	حلو	95
70889bd8-c182-4716-a58d-bf582dff143f	b24c1163-1aa1-48a2-939f-384c7fdb54b8	2	دافئ	85
1d51d3da-4050-43cc-a181-a4e5d5b7ce0a	b24c1163-1aa1-48a2-939f-384c7fdb54b8	3	توابل	80
e630a92c-3a54-4a9e-9d91-3e6c8b09161a	b24c1163-1aa1-48a2-939f-384c7fdb54b8	4	أروماتك	75
3ef28d47-08c0-4fc0-8232-34e16ab1ee42	b24c1163-1aa1-48a2-939f-384c7fdb54b8	5	حمضي	70
62ccc0ad-c77e-4990-aa8d-796f2c60e76a	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	1	زهري	95
c0a3a3c3-78c7-4815-8414-0d3e8c50f31b	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	2	توابل	85
d347a413-6201-4d95-9106-96212599cb1a	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	3	شرقي	80
425f2bf0-6bba-4558-80d8-51ee451a596e	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	4	حمضي	75
cba1f5c5-72bb-4adf-b369-0fd510224b50	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	5	مسك	70
9e6a0658-e9a5-4d9c-b201-65efafc2c7ab	19258c51-5210-4598-bb62-e829f84f09b0	1	حلو	95
0d66da80-54ce-46d9-aebe-8887866cc406	19258c51-5210-4598-bb62-e829f84f09b0	2	أروماتك	85
b1da2901-e5a3-4cd8-88ef-4fda867e9bd5	19258c51-5210-4598-bb62-e829f84f09b0	3	توابل	80
225489eb-1246-4e6f-9733-a0026d30f0c3	19258c51-5210-4598-bb62-e829f84f09b0	4	دافئ	75
fc442ffd-6afa-4abd-953b-385ad4dae611	19258c51-5210-4598-bb62-e829f84f09b0	5	خشبي	70
c03acba9-cf81-424a-b203-d1776c8fdfc6	e4531865-1bac-491c-8bca-1f2e1ac0f045	1	توابل	95
c9087eff-7395-47b2-baa1-baf06ae01371	e4531865-1bac-491c-8bca-1f2e1ac0f045	2	حلو	85
b1a8c507-1813-463a-a4d2-c4fee58813b7	e4531865-1bac-491c-8bca-1f2e1ac0f045	3	دافئ	80
0dd801db-0d2f-431d-8857-df657ed0a2c2	e4531865-1bac-491c-8bca-1f2e1ac0f045	4	خشبي	75
f3025ef6-534e-4299-89c6-e4d750afc60a	e4531865-1bac-491c-8bca-1f2e1ac0f045	5	جلدي	70
84f97836-36d6-4233-aaf5-491ced3dae33	f1a00606-4504-41f9-9b85-2a04a7f765a6	1	زهري	95
483fa2d0-2deb-4858-9c1d-7c082913d5bc	f1a00606-4504-41f9-9b85-2a04a7f765a6	2	مسك	85
467fb26e-fb12-405b-bad8-8bbc9fdfcd44	f1a00606-4504-41f9-9b85-2a04a7f765a6	3	فواكه	80
8c35c1f3-96a2-45a3-b54b-390764178c1d	f1a00606-4504-41f9-9b85-2a04a7f765a6	4	ناعم	75
025808fe-0f1c-4578-a5ff-e91a75b4b5ee	f1a00606-4504-41f9-9b85-2a04a7f765a6	5	منعش	70
7fce34a7-6959-4c41-8384-a59b20c7d41f	b40bad66-7413-4610-b365-72dffcc94600	1	زهري	95
78de7a6d-ab13-46b1-bdf0-fe988f7b474c	b40bad66-7413-4610-b365-72dffcc94600	2	حلو	85
023d6d3d-02d6-495c-9b75-87b50a66aa22	b40bad66-7413-4610-b365-72dffcc94600	3	عنبر	80
8a2767cb-62b5-4e4d-a888-246adaee625e	b40bad66-7413-4610-b365-72dffcc94600	4	حمضي	75
12c20a39-fedc-4b7b-8970-29ac99c5596c	b40bad66-7413-4610-b365-72dffcc94600	5	مسك	70
ef3399cf-e53b-493c-bca0-4b9289e51608	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	1	زهري	95
93f37a37-5e13-4904-93c9-465ff4fbb2a5	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	2	فواكه	85
42a205d1-3529-4c63-8114-11e669fb01b1	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	3	منعش	80
114db7d3-4bf7-4d34-8168-6386d71cb73e	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	4	ناعم	75
e7776d16-0df3-4444-8a63-dad38aca1620	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	5	مسك	70
14b92be5-1db6-4357-ac0e-d7d1f8ef9752	0657e2e2-2d86-4106-b336-efd532d98fb4	1	حلو	90
7e7fb5d8-8c9d-435c-be6d-61196d4843b0	0657e2e2-2d86-4106-b336-efd532d98fb4	2	فواكه	85
6965155f-1d58-47f3-981c-8b5cb9555b3a	0657e2e2-2d86-4106-b336-efd532d98fb4	3	توابل	80
45670e28-ab9d-4a31-9643-78ac8056f83a	0657e2e2-2d86-4106-b336-efd532d98fb4	4	دافئ	75
42a21a04-0f56-4f37-b889-78e41cf8e262	0657e2e2-2d86-4106-b336-efd532d98fb4	5	باتشولي	70
810ad081-bb31-41b0-921d-a3c7947fe6c4	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	1	حلو	95
4c0f910d-5aa4-445a-a4fa-aa9dedc90053	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	2	فواكه	85
c05bf81a-f490-4b89-a8f5-41c4fa5adfd6	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	3	زهري	80
677609f8-5ab2-44d6-bf7e-faee29cff487	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	4	ناعم	75
2bb07647-f7dc-465b-b580-be5623f0833f	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	5	عنبر	70
13749b55-c794-4f1b-811e-699199a9637a	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	1	فواكه	95
404c2ae7-7e15-48ac-ab3c-a9d53eceb364	6210563a-b9ec-4047-b1d8-1da33e9662f2	1	فواكه	95
68c2018b-a980-48ff-8a3b-f40f56d462e8	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	2	زهري	85
fbc51cbc-90e3-4058-8152-ebc27a571d1e	6210563a-b9ec-4047-b1d8-1da33e9662f2	2	فانيلا	85
45f8be55-9535-4281-9850-f116006bdee4	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	3	حلو	80
18053d61-a909-452c-98de-cb407ed62c45	6210563a-b9ec-4047-b1d8-1da33e9662f2	3	قهوة	80
5f34cb9d-fe49-4304-b180-583b6f6d1ae4	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	4	منعش	75
beb0b270-c16a-40d2-8912-21ac55ff81a3	6210563a-b9ec-4047-b1d8-1da33e9662f2	4	حلو	75
110cdb73-029a-4434-b4f9-7e6b66eded6e	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	5	خشبي	70
7736b5b1-e453-4662-8ad3-5d5cde0f9a85	6210563a-b9ec-4047-b1d8-1da33e9662f2	5	دافئ	70
5cf59d83-996e-4060-9274-c4aa5d6c185e	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	1	حلو	95
899499a7-d68f-4642-b44c-5a28744637c2	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	2	فانيلا	85
01e87149-62ac-4694-9155-2ba074fe7534	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	3	فواكه	80
b6643bc2-8ae7-438b-8ef3-3197143b1781	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	4	دافئ	75
ab64ae0b-8fbe-4ef7-bdd4-76d6603b8fe1	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	5	بودري	70
675c418c-443c-4d9b-8800-740340807a8f	c0221751-2228-456b-a326-b8d40f23c6c7	1	زهري	95
151ffde1-6319-4a51-8225-4aadc27330ba	c0221751-2228-456b-a326-b8d40f23c6c7	2	فواكه	85
0ac39097-d21d-483f-b43f-31936452c3b5	c0221751-2228-456b-a326-b8d40f23c6c7	3	منعش	80
dc0235f5-bee9-47d4-b1d6-6b35eaab5423	c0221751-2228-456b-a326-b8d40f23c6c7	4	ناعم	75
4072be17-46e2-4673-a9b7-45c0b13de60e	c0221751-2228-456b-a326-b8d40f23c6c7	5	مسك	70
28ae5f04-3c38-4914-97d5-2f07d8df9b3e	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	1	زهري	95
0e0da6d7-d143-45cf-9572-2b988e57e9ad	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	2	أخضر	85
4a3a5577-bac5-435d-b123-841e7e8a82db	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	3	مسك	80
216395a7-a88f-4fa0-9497-8de8e52c230c	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	4	ناعم	75
bd1da999-d0d1-4e74-bb24-1577f65c3a2d	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	5	خشبي	70
b7a193b6-4bcf-458d-84aa-66c850d93979	996405d5-6f23-4ccc-a387-9d7f6fba68e8	1	فانيلا	95
33353321-7282-42de-a94a-98165dc346d9	996405d5-6f23-4ccc-a387-9d7f6fba68e8	2	قهوة	85
522ddfbb-1c3f-4f38-800b-8c5c7110b9bd	996405d5-6f23-4ccc-a387-9d7f6fba68e8	3	حلو	80
6b6d8a12-e17d-4673-b2e2-1785a72c053a	996405d5-6f23-4ccc-a387-9d7f6fba68e8	4	دافئ	75
c1b033c1-1726-426e-9ead-92716db0bbf4	996405d5-6f23-4ccc-a387-9d7f6fba68e8	5	زهري	70
92bb4109-35e9-4b0a-a55b-772bae13d220	c8e98770-b2d9-4add-88b3-57af59796384	1	منعش	95
d3f5bbb5-8ecd-401b-8dd6-e3bb4c58ed0e	c8e98770-b2d9-4add-88b3-57af59796384	2	فواكه	85
07d6b9b4-d496-4a96-916e-39cf4c10934c	c8e98770-b2d9-4add-88b3-57af59796384	3	زهري	80
636da9e0-85cc-4cef-aad1-a6e45ea65001	c8e98770-b2d9-4add-88b3-57af59796384	4	ناعم	75
a8e8e0b6-d1c1-4a39-b3a4-bce604b759bf	c8e98770-b2d9-4add-88b3-57af59796384	5	أخضر	70
87570fdc-fc05-4f08-a806-855619cf63d9	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	1	فواكه	90
2e038d2a-9e66-4705-b6bd-68a94e34079c	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	2	دافئ	85
470aa393-42d9-4bf9-b3d5-29d9c477b4ca	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	3	خشبي	80
9695bc0e-74b3-4583-9b3f-e3fbc9bd283b	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	4	ناعم	75
6443d404-0700-48e8-b11c-1e4b2ab39ae1	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	5	مسك	70
8933f7e0-02f6-4613-bca5-8c126dbbe1bc	74a0a41c-a5ca-4967-98d0-333b7ec343b9	1	حلو	95
f396de96-66ee-4cf7-804a-c9338413da36	74a0a41c-a5ca-4967-98d0-333b7ec343b9	2	فانيلا	85
bdb57120-a44a-447b-bfca-954614f4d86c	74a0a41c-a5ca-4967-98d0-333b7ec343b9	3	حمضي	80
6e661ba4-0d4c-4b8b-90d0-af9ca66c3656	74a0a41c-a5ca-4967-98d0-333b7ec343b9	4	دافئ	75
e78b94b9-0d2f-45c9-ba24-789d2a2bbd99	74a0a41c-a5ca-4967-98d0-333b7ec343b9	5	زهري	70
6475f173-8668-48b3-9ad4-10bc7d394ce9	39b3ece3-13cf-4797-9c65-45fe96c50d8a	1	زهري	95
5ea325a3-acba-4086-ad11-6a2cf19e395b	39b3ece3-13cf-4797-9c65-45fe96c50d8a	2	حمضي	85
6b1bf685-8616-483a-9656-60371a51b72c	39b3ece3-13cf-4797-9c65-45fe96c50d8a	3	مسك	80
c1983147-5e7c-41f9-bd00-022738a3c74b	39b3ece3-13cf-4797-9c65-45fe96c50d8a	4	منعش	75
cc43bbe1-c951-4046-a40c-3b6c0e6d3889	39b3ece3-13cf-4797-9c65-45fe96c50d8a	5	خشبي	70
66da433d-491c-4d99-bc80-15e5bd9b4743	d9f8b7eb-47a6-489f-95f6-237cf032065d	1	فانيلا	90
6fb96cf3-2952-482c-874c-9a88cf25161e	d9f8b7eb-47a6-489f-95f6-237cf032065d	2	بودري	85
b0297ce9-2bc6-40cd-a777-9c94c664f407	d9f8b7eb-47a6-489f-95f6-237cf032065d	3	زهري	80
388e1c66-8980-4d6d-8d4a-0b9fa9bf0927	d9f8b7eb-47a6-489f-95f6-237cf032065d	4	ناعم	75
d1ef0f53-5bc8-4681-8fef-fbb0048d4d82	d9f8b7eb-47a6-489f-95f6-237cf032065d	5	حمضي	70
4d3eb7af-1115-4d40-955f-420c4788013d	c5e324d5-ca7a-465e-936f-69e4a46381bd	1	فواكه	90
7d3d06e1-2260-4dec-8268-bd37802402cd	c5e324d5-ca7a-465e-936f-69e4a46381bd	2	حلو	85
136ce5b5-8f7d-4e48-833f-b318ac6e6a92	c5e324d5-ca7a-465e-936f-69e4a46381bd	3	زهري	80
0218c160-3be1-43c5-9131-7e6f927d70ee	c5e324d5-ca7a-465e-936f-69e4a46381bd	4	ناعم	75
863cbe39-8804-4fa5-a4a5-fb80fa18def1	c5e324d5-ca7a-465e-936f-69e4a46381bd	5	دافئ	70
cf4dc7cf-7268-448d-9df7-f179a4f7dcce	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	1	منعش	95
deed7b74-2ff2-40de-a927-01ca1a44eaa1	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	2	زهري	85
a6412ec7-d91d-4a37-9d47-873d6c38c286	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	3	خشبي	80
06e90227-1075-4280-a673-f9d0603548f5	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	4	أخضر	75
a11b6322-ceb2-43df-8561-3633f772f6a4	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	5	ناعم	70
b2ff1c40-8652-46da-a90f-23911c4b9250	b81ab7be-a94d-4d56-a26a-b09569353a37	1	فواكه	95
335c2efd-9366-4ec7-a78f-c75a4aae5e0e	b81ab7be-a94d-4d56-a26a-b09569353a37	2	باتشولي	85
1fb3d927-3e5c-4824-accd-e833bf99224b	b81ab7be-a94d-4d56-a26a-b09569353a37	3	زهري	80
b5fdd5c6-a557-452f-ac4a-784719fb6f35	b81ab7be-a94d-4d56-a26a-b09569353a37	4	حلو	75
3be4de74-240c-456e-9b52-67b1806dacef	b81ab7be-a94d-4d56-a26a-b09569353a37	5	دافئ	70
c192c87d-2fae-4c4f-99a1-c0f3e7fd9229	d5e13d3f-4976-4654-9ee1-4b7481113f8a	1	زهري	90
ef8f06d5-19f0-4147-9c8e-8bf7db3576e8	d5e13d3f-4976-4654-9ee1-4b7481113f8a	2	حمضي	85
26f31dee-bdb2-441a-bd31-671d589548a5	d5e13d3f-4976-4654-9ee1-4b7481113f8a	3	فانيلا	80
023d855e-a7aa-489a-95e4-abd83718bffb	d5e13d3f-4976-4654-9ee1-4b7481113f8a	4	ناعم	75
f1d3ac95-c947-4219-bd03-867ae4a4244c	d5e13d3f-4976-4654-9ee1-4b7481113f8a	5	دافئ	70
d6f26269-1f67-4478-89ba-d43c64fe34b8	94bab4ad-8004-4231-a575-05d4778d1b31	1	فواكه	95
567ba293-3a19-4c85-9cf6-b5281a50cbaa	94bab4ad-8004-4231-a575-05d4778d1b31	2	زهري	85
38d0ad61-bf74-41a0-95aa-c694f176b676	94bab4ad-8004-4231-a575-05d4778d1b31	3	منعش	80
31cddf05-20b0-4b89-8f9d-39fc4966fad6	94bab4ad-8004-4231-a575-05d4778d1b31	4	مسك	75
e2f52910-9b51-4e63-989b-66d8b75dd475	94bab4ad-8004-4231-a575-05d4778d1b31	5	ناعم	70
8e9e774f-3c5b-45c7-a32f-992e9346a04d	29161948-28d9-496c-b580-4db234dcfd49	1	باتشولي	95
8acf510b-c998-4f0b-903b-ded24eb68ff1	29161948-28d9-496c-b580-4db234dcfd49	2	حمضي	85
dd9f2b88-8a96-46a8-8f3f-93c267dd9c4a	29161948-28d9-496c-b580-4db234dcfd49	3	زهري	80
5715e415-e5c6-42f3-94e9-6cda5a7b231c	29161948-28d9-496c-b580-4db234dcfd49	4	حلو	75
48ad130b-86fd-46d9-a7c7-ee52198fc81d	29161948-28d9-496c-b580-4db234dcfd49	5	مسك	70
19660ba1-d86d-434d-81f1-19ba7f1c61b9	4fe0dc57-7dbc-4219-b34d-e17eef96168a	1	توابل	95
3698039e-0b74-477b-96bf-087e03314738	4fe0dc57-7dbc-4219-b34d-e17eef96168a	2	حمضي	85
a4392eb8-a429-4707-bac7-08944a458a27	4fe0dc57-7dbc-4219-b34d-e17eef96168a	3	زهري	80
f217b311-da89-488a-8f8e-6f2eb445904d	4fe0dc57-7dbc-4219-b34d-e17eef96168a	4	دافئ	75
3818709b-7b52-42bd-883a-70d8f89937ad	4fe0dc57-7dbc-4219-b34d-e17eef96168a	5	ناعم	70
c188213a-6c22-4389-badd-8cc1ec3ec590	64a976f5-a78e-4dcd-88bd-7412386b16a7	1	زهري	95
5069bf0e-106f-46ca-92d3-11ff39804aa2	64a976f5-a78e-4dcd-88bd-7412386b16a7	2	حلو	85
e78fa820-47db-48eb-a5c9-c9b76b7dc5e8	64a976f5-a78e-4dcd-88bd-7412386b16a7	3	فواكه	80
4ccf4539-1fd2-4259-99f4-3a8258e69f45	64a976f5-a78e-4dcd-88bd-7412386b16a7	4	ناعم	75
7148b26d-63dd-473d-89e8-e13f91b47352	64a976f5-a78e-4dcd-88bd-7412386b16a7	5	مسك	70
4088ed8c-e166-42da-b2f9-678b9c4779c2	39591cde-e167-4fa1-b3cb-3a620edcfbe2	1	زهري	95
3cffb361-1c58-4418-86ff-8584a73acd54	39591cde-e167-4fa1-b3cb-3a620edcfbe2	2	مسك	85
c1bce516-041f-40b7-9100-e42c03b39641	39591cde-e167-4fa1-b3cb-3a620edcfbe2	3	منعش	80
615b5d73-dd5a-493c-b12b-25ce8bea0996	39591cde-e167-4fa1-b3cb-3a620edcfbe2	4	باتشولي	75
8e994709-23d1-4b6e-a27f-2e0601c95922	39591cde-e167-4fa1-b3cb-3a620edcfbe2	5	خشبي	70
c9416a64-76fa-43f7-9abc-3deb8c8e83d9	5334b375-acf6-426b-b62d-96cfd55e373a	1	فواكه	90
10e29f16-8e72-4cef-b71d-bf17529625f4	5334b375-acf6-426b-b62d-96cfd55e373a	2	زهري	85
f9de3e36-bc6e-4081-8a95-55f51120ebe9	5334b375-acf6-426b-b62d-96cfd55e373a	3	منعش	80
12cd3867-3042-4f95-be7d-e1a0d940e086	5334b375-acf6-426b-b62d-96cfd55e373a	4	ناعم	75
e1bd3d95-605d-4770-9daa-6e30aa3b92b9	5334b375-acf6-426b-b62d-96cfd55e373a	5	مسك	70
04085daa-87e8-4122-b0fb-6b16964d70ce	5ff2b307-6c42-4108-926a-6e6fa1fac47b	1	حلو	95
434ecfd9-cb7c-4a04-8c0a-cefb19e88158	5ff2b307-6c42-4108-926a-6e6fa1fac47b	2	فواكه	85
50eee9e8-e2b2-4d80-a1a7-10bb0594b04f	5ff2b307-6c42-4108-926a-6e6fa1fac47b	3	دافئ	80
8ed2d18e-8514-45bd-b23b-f3d50b91a198	5ff2b307-6c42-4108-926a-6e6fa1fac47b	4	شرقي	75
63c00d7b-b15d-48d6-a140-394099a3040c	5ff2b307-6c42-4108-926a-6e6fa1fac47b	5	مسك	70
04fef65c-63df-4559-8e20-016af64d74dc	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	1	بودري	95
4b43ee63-2aa9-421f-bd1b-7266408ae368	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	2	ناعم	85
96baf05c-fefc-4b03-a0f0-0c30e1cd80e1	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	3	مسك	80
7af69b17-6a16-4458-a9d8-2b690ea565ab	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	4	منعش	75
a209377a-f399-49ee-90aa-1647cb233e82	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	5	زهري	70
5f57bf35-5f70-4dff-9ca9-1292d01a0244	67285bc6-6382-4b7d-8173-2d857a4a1c13	1	زهري	95
e0885569-8ecc-4449-aba8-9968485aea4b	67285bc6-6382-4b7d-8173-2d857a4a1c13	2	فواكه	85
39f3730a-3487-4efb-b62c-5c49575fdffe	67285bc6-6382-4b7d-8173-2d857a4a1c13	3	منعش	80
9102122c-2576-49d0-a496-926ad9fbb6b5	67285bc6-6382-4b7d-8173-2d857a4a1c13	4	ناعم	75
88d6c37e-480f-491c-b9c4-ce999f73dde9	67285bc6-6382-4b7d-8173-2d857a4a1c13	5	مسك	70
45b10f8e-78d0-4bcb-8213-abcc8716fb7d	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	1	فواكه	95
ed548712-f05d-4239-8ff9-c37008b407d6	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	2	حلو	90
5c34e83d-6f0b-43f5-a41c-f5b5b7b58dd4	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	3	فانيلا	80
37485afe-bf0e-4489-9826-dd9b4a3c34a3	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	4	ناعم	75
338e82a4-6c67-44d5-adcc-96495446862a	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	5	خشبي	70
479cdc94-bf7c-4ee1-8492-2c711688413c	ff1b01c0-d0e9-4988-af57-57ef959974b4	1	فواكه	95
851852c7-ceed-4ca8-a2f3-fd57023d7e31	ff1b01c0-d0e9-4988-af57-57ef959974b4	2	منعش	85
661809c3-516c-4296-a68e-f00fc48509f8	ff1b01c0-d0e9-4988-af57-57ef959974b4	3	بحري	80
64ac32bc-de1b-4c2f-8a93-8c79568dd505	ff1b01c0-d0e9-4988-af57-57ef959974b4	4	ناعم	75
a92fc045-e83c-4a62-b691-8498bca5d4d1	ff1b01c0-d0e9-4988-af57-57ef959974b4	5	مسك	70
70494545-831b-46e6-97c0-e37d40e44ed0	d8defac8-a4f0-4335-a403-23d76a646acb	1	حلو	95
88f81547-604e-4233-a8bb-85a1c6df8396	d8defac8-a4f0-4335-a403-23d76a646acb	2	فواكه	85
07f3b0da-eb7a-4895-82fa-5ab5a6473837	d8defac8-a4f0-4335-a403-23d76a646acb	3	دافئ	80
8c76accb-9f3c-4ae0-a553-200582b454b4	d8defac8-a4f0-4335-a403-23d76a646acb	4	زهري	75
80971288-9982-4a6d-ab0d-03bd0c71305d	d8defac8-a4f0-4335-a403-23d76a646acb	5	باتشولي	70
4c551500-144d-46f8-8038-663440efa6dc	c2a9a595-7ec0-49f3-9016-9f1325ebd800	1	فانيلا	95
13466d40-0886-4275-af87-d8c56c3956b4	c2a9a595-7ec0-49f3-9016-9f1325ebd800	2	دافئ	85
67be132e-0781-4416-958d-194c1d71a2c4	c2a9a595-7ec0-49f3-9016-9f1325ebd800	3	زهري	80
6e7224f6-e2b9-4aff-b476-f03ac546cecb	c2a9a595-7ec0-49f3-9016-9f1325ebd800	4	ناعم	75
1f50a989-5783-4566-814e-de5f43b6cb27	c2a9a595-7ec0-49f3-9016-9f1325ebd800	5	حلو	70
c70ff7cf-41f3-47d9-9c92-70167953a6ab	3a63970f-150d-47d6-ada7-457c5eeac590	1	حمضي	95
fc2286e9-4025-4f61-83d9-3e8513a53775	3a63970f-150d-47d6-ada7-457c5eeac590	2	زهري	85
99f2d5a9-23ab-4ee4-89f4-8154dc43225c	3a63970f-150d-47d6-ada7-457c5eeac590	3	مسك	80
c7285923-7e33-4b71-b9fc-b37a0d831466	3a63970f-150d-47d6-ada7-457c5eeac590	4	منعش	75
84119cc8-9e87-42ad-bce3-4336ec06ad6b	3a63970f-150d-47d6-ada7-457c5eeac590	5	ناعم	70
8c0b0823-22c5-46a8-96a7-df07c08f4cc7	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	1	زهري	90
17ba1f68-0bad-4a79-99ca-f75f3413136b	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	2	مسك	85
a56dfb0c-b43e-4c72-950e-aa6bbc7efc59	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	3	فواكه	80
25d8857a-6a17-465b-8e73-a17af87e0479	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	4	جلدي	75
603ca9af-d554-4e2a-b99d-e21c568af779	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	5	دافئ	70
db73da2c-2ff1-49ff-8895-6875b53e613f	4b07031f-9a4b-46b9-b02d-6ee759270535	1	زهري	95
5f60bc5a-5c64-4485-aeea-3a491fbd3dea	4b07031f-9a4b-46b9-b02d-6ee759270535	2	حمضي	85
3fc82946-ee90-4240-a5db-beb8be0e1b51	4b07031f-9a4b-46b9-b02d-6ee759270535	3	منعش	80
343037c2-de15-4c02-9b28-53404c8f24b6	4b07031f-9a4b-46b9-b02d-6ee759270535	4	ناعم	75
95c40f9b-637f-4101-bc29-9a1f887ba329	4b07031f-9a4b-46b9-b02d-6ee759270535	5	مسك	70
9faabe57-b87f-4a3e-849c-ad8ac0f3c12b	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	1	حلو	95
dee2a821-3258-49e6-a258-35f95cc47f58	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	2	فواكه	85
29181f40-8fcb-4ef4-9c3f-8ce2415f9c8f	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	3	باتشولي	80
3b01348b-6dc5-4d8c-882a-5c4efe0bd275	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	4	زهري	75
32065b74-5c1b-43bd-97f3-618f03cecb8c	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	5	دافئ	70
cb306703-8bf3-427b-a31d-00014af65a5c	1904f302-353b-49a3-a3cf-a44a83900ef1	1	زهري	90
648814ce-863b-4d99-b6c0-add2ced89a2e	1904f302-353b-49a3-a3cf-a44a83900ef1	2	مسك	85
eba8d66a-4ea3-4c52-abaa-acdf84930426	1904f302-353b-49a3-a3cf-a44a83900ef1	3	دافئ	80
00fd9004-71c5-4349-8aef-02d5255ce861	1904f302-353b-49a3-a3cf-a44a83900ef1	4	فانيلا	75
bb9cbd24-12e5-455f-bfd1-075ca4ec9b76	1904f302-353b-49a3-a3cf-a44a83900ef1	5	خشبي	70
847c7128-44ce-467b-a0a6-87dd7d996d42	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	1	زهري	95
2585d34c-ab23-4743-ac6b-a7c906d926bc	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	2	توابل	85
d0b68c4d-a883-4af2-a612-91cb6f6435af	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	3	خشبي	80
82f2b340-f852-40d1-8b02-7dc198ffd9b1	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	4	منعش	75
d144dd4c-4ff9-42a8-ad34-81365bbb4210	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	5	ناعم	70
861e96c6-b7bd-4e5d-b7b6-17d597ad7f36	7feb7a06-6c47-4394-90ed-3210cf471c2a	1	حلو	95
94f20c3a-f3bb-4153-aad7-5d37f4c023d1	7feb7a06-6c47-4394-90ed-3210cf471c2a	2	توابل	85
591422c4-d747-4ab4-9b28-d691fefd9783	7feb7a06-6c47-4394-90ed-3210cf471c2a	3	فانيلا	80
c54d07ed-cc57-4107-9b51-e63580714b5c	7feb7a06-6c47-4394-90ed-3210cf471c2a	4	دافئ	75
201a59dd-95f9-4986-9863-2677ac2390d6	7feb7a06-6c47-4394-90ed-3210cf471c2a	5	مسك	70
033543b7-b207-4c3e-9b60-1e345280bdc8	6f311c30-c216-438a-b707-2e69ab4de5ce	1	فانيلا	95
37dd91eb-5d4a-4fa7-8843-8203b9891d71	6f311c30-c216-438a-b707-2e69ab4de5ce	2	حلو	85
6251dea4-86e1-4572-94d8-f85060f97f14	6f311c30-c216-438a-b707-2e69ab4de5ce	3	أروماتك	80
364a738e-86c8-48ed-bfaa-108be3aaf13c	6f311c30-c216-438a-b707-2e69ab4de5ce	4	دافئ	75
12db643f-5005-45f3-8116-82f3d3e110f4	6f311c30-c216-438a-b707-2e69ab4de5ce	5	ناعم	70
7949f1af-334b-477b-9309-a59320213be3	6192fe95-e612-45fd-820e-c6e7ec3ebe20	1	زهري	90
e2ce1c4e-6ae4-4746-a047-c709962a2abb	6192fe95-e612-45fd-820e-c6e7ec3ebe20	2	حلو	85
d848f4ef-875e-4d88-9e32-cf5999572fc2	6192fe95-e612-45fd-820e-c6e7ec3ebe20	3	فواكه	80
7922363f-3a91-4d86-aed8-12db830f5a95	6192fe95-e612-45fd-820e-c6e7ec3ebe20	4	ناعم	75
c97b2648-f13c-47ba-89ff-d486905323c6	6192fe95-e612-45fd-820e-c6e7ec3ebe20	5	باتشولي	70
f1e79c3d-2632-4a42-bfea-7c719e6019d2	f1f94b0e-2997-4c2b-b542-7dc1873f2223	1	عود	95
4df85a9c-57b9-44b4-8884-b6e68f2b2ed1	f1f94b0e-2997-4c2b-b542-7dc1873f2223	2	شرقي	85
179255f8-66cc-472b-aee0-ff8fd75f0286	f1f94b0e-2997-4c2b-b542-7dc1873f2223	3	جلدي	80
a61aae44-2688-4974-8cfa-e2443c8e5da2	f1f94b0e-2997-4c2b-b542-7dc1873f2223	4	دافئ	75
6780cdf0-0762-4228-aa42-f544e8a58f58	f1f94b0e-2997-4c2b-b542-7dc1873f2223	5	خشبي	70
a62d9aaf-39c8-4a01-b1c7-0dead184044d	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	1	حلو	90
36f5bb8e-66a9-4aab-b7b5-151693a0f116	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	2	شرقي	85
ec76d4cd-49d6-45fe-b7dd-7f310f429cc5	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	3	دافئ	80
95caf6d8-9006-4b0f-9624-f4ef06696069	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	4	خشبي	75
8ad0925e-4675-452b-848a-750ad55cb0ef	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	5	قوي	70
3be210b7-00d8-435e-bc79-48fa45711f00	68d2a14a-45bb-47a3-b756-cd30710c6ff3	1	زهري	90
b887992e-ef12-4669-9edb-6683c693d6dc	68d2a14a-45bb-47a3-b756-cd30710c6ff3	2	حمضي	85
9943f9e4-4d5f-42e8-baf8-e90a4411505e	68d2a14a-45bb-47a3-b756-cd30710c6ff3	3	أخضر	80
362c3a14-f105-47ea-a50b-78bde583871d	68d2a14a-45bb-47a3-b756-cd30710c6ff3	4	منعش	75
babe5677-84c3-4e4a-9ff4-56d974dce40a	68d2a14a-45bb-47a3-b756-cd30710c6ff3	5	ناعم	70
f173025b-db87-42bb-b37f-cc45a919f412	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	1	حلو	95
2cf4efca-b745-4c14-9008-f057a545777f	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	2	فواكه	90
f4fd6c83-c365-4c74-931f-3f8c4bb1b38b	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	3	زهري	80
67c8572e-5355-4792-8432-0cc66aeb1fdc	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	4	ناعم	75
a18cd1d7-9337-4e7f-a054-bc5d42970639	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	5	دافئ	70
b4a9f327-7c69-469f-b05c-84734648873d	5c23ac7f-336a-411c-b5bb-f436e407e8e3	1	زهري	95
c2498d78-02a4-421a-bc8c-caf6b0da1474	5c23ac7f-336a-411c-b5bb-f436e407e8e3	2	حلو	85
911ec232-99f8-4581-a1a8-c0a0d283a927	5c23ac7f-336a-411c-b5bb-f436e407e8e3	3	دافئ	80
81577fe6-972e-486e-b8af-fbc78a3d5815	5c23ac7f-336a-411c-b5bb-f436e407e8e3	4	خشبي	75
7d613a91-b2ae-4ab5-b8ea-8e5245152ac0	5c23ac7f-336a-411c-b5bb-f436e407e8e3	5	ناعم	70
db53933c-913c-4f16-9b9f-c16d215c7227	c6dbb337-65ba-4360-8e98-483939d0faf0	1	زهري	95
67f581bf-1d08-43a6-8334-2a6684860b72	c6dbb337-65ba-4360-8e98-483939d0faf0	2	حلو	85
3b4f91c1-1344-466c-aed4-94885e3ee797	c6dbb337-65ba-4360-8e98-483939d0faf0	3	دافئ	80
a519a93f-a776-412b-bebe-8069a84db136	c6dbb337-65ba-4360-8e98-483939d0faf0	4	فانيلا	75
9fb0bb68-046f-4770-bf9a-19a99b6000e8	c6dbb337-65ba-4360-8e98-483939d0faf0	5	ناعم	70
921865bb-0680-4447-8110-d429c2e4a109	3d9de990-655a-412f-a171-2e99c9ec7a98	1	حلو	90
6083a3a8-3d65-4e60-afb8-f451bb7ef55e	3d9de990-655a-412f-a171-2e99c9ec7a98	2	دافئ	85
a8b51108-18af-4c31-8b2e-66abe8952f03	3d9de990-655a-412f-a171-2e99c9ec7a98	3	زهري	80
7b879712-a584-46b6-9c39-f42043015658	3d9de990-655a-412f-a171-2e99c9ec7a98	4	توابل	75
3b12fc3f-42b9-4104-87df-784f3f5cfc1e	3d9de990-655a-412f-a171-2e99c9ec7a98	5	خشبي	70
c1749d0d-4c96-402f-a745-d7ee3dd01961	531ebefb-9720-4d57-9031-13a9ae5d2666	1	فانيلا	95
8caca705-52c3-4b5a-8d82-4c4ca87f67c1	531ebefb-9720-4d57-9031-13a9ae5d2666	2	أروماتك	85
e7815b4a-baae-4030-965d-73205dc30171	531ebefb-9720-4d57-9031-13a9ae5d2666	3	حلو	80
7933d178-7362-4c63-b4b3-dfaa5729d11e	531ebefb-9720-4d57-9031-13a9ae5d2666	4	زهري	75
472bd522-1d6d-41fe-b273-29a3fce7ade7	531ebefb-9720-4d57-9031-13a9ae5d2666	5	خشبي	70
5a95da8a-379d-46da-9fe2-946d04ef17cc	d8f8529a-9239-4f99-a49c-1d88abc62488	1	مسك	95
c0393897-2be2-499b-a433-7c27d13e7e15	d8f8529a-9239-4f99-a49c-1d88abc62488	2	زهري	85
21cea977-2b08-45a1-a4c4-065f4e1c009c	d8f8529a-9239-4f99-a49c-1d88abc62488	3	فواكه	80
d1c7e17f-d7cc-4624-9908-bcfb0eb629bf	d8f8529a-9239-4f99-a49c-1d88abc62488	4	دافئ	75
baa39fde-26d3-45a5-bdd9-fddfae10d3fb	d8f8529a-9239-4f99-a49c-1d88abc62488	5	باتشولي	70
ea6f4b9e-f7dc-4407-a678-605d031f9517	93ece844-6dee-4add-bc57-7dec482e45ce	1	فواكه	95
0791e6aa-b345-4115-9c95-5b1e12040f57	93ece844-6dee-4add-bc57-7dec482e45ce	2	منعش	85
fcb0d984-d3e0-48ee-92bf-d3fb6e21e499	93ece844-6dee-4add-bc57-7dec482e45ce	3	زهري	80
49c3ce06-5201-459f-badd-129fda134493	93ece844-6dee-4add-bc57-7dec482e45ce	4	مسك	75
7b34edc7-2690-431a-aff7-c0ad4f097182	93ece844-6dee-4add-bc57-7dec482e45ce	5	ناعم	70
23119d89-5df3-471e-83b0-b759dd5a3493	b2ac3210-34a5-4e86-a628-0ea79aae160d	1	حلو	95
92f5fbd7-65b3-4c7b-85aa-ea788bd97616	b2ac3210-34a5-4e86-a628-0ea79aae160d	2	فواكه	85
d3e1a6f6-fde8-4b32-a365-073f9aca515a	b2ac3210-34a5-4e86-a628-0ea79aae160d	3	منعش	80
b058f19a-5c48-4215-9efc-27bce4f2e129	b2ac3210-34a5-4e86-a628-0ea79aae160d	4	ناعم	75
d3ec7b05-25ce-4786-8ef0-671f0c575d7e	b2ac3210-34a5-4e86-a628-0ea79aae160d	5	حمضي	70
ac79cccb-26b5-4bff-8cac-6244c878b1e5	8069c814-bcd5-4efd-bc8c-3b904c32fb05	1	فواكه	95
ef0c0a9a-de29-4bf9-b5e7-140f6d5d2de6	8069c814-bcd5-4efd-bc8c-3b904c32fb05	2	ورد	85
526ad24f-1c48-4481-b19f-6c5673423f28	8069c814-bcd5-4efd-bc8c-3b904c32fb05	3	حلو	80
6ae95c47-a9ba-40cf-b5bb-02f817e0c92d	8069c814-bcd5-4efd-bc8c-3b904c32fb05	4	دافئ	75
9ae29a79-babc-43a8-b8a8-e8a619b6d438	8069c814-bcd5-4efd-bc8c-3b904c32fb05	5	مسك	70
90c1d20a-a1f7-4dd2-9827-ad48e7b0db3d	41bad034-f7d7-48d2-a4fa-06afd3822985	1	زهري	95
b14a8779-b54c-4e35-a7fd-06c8b3c574f4	41bad034-f7d7-48d2-a4fa-06afd3822985	2	ناعم	85
89dd5117-5e3f-42e2-896d-1ae5ff828414	41bad034-f7d7-48d2-a4fa-06afd3822985	3	منعش	80
854807a3-a5ce-4bad-8a5a-62f56e39eb1e	41bad034-f7d7-48d2-a4fa-06afd3822985	4	أخضر	75
4b74a32d-8b31-4cf8-aeec-6d03e255319a	41bad034-f7d7-48d2-a4fa-06afd3822985	5	مسك	70
5fddc87a-f80a-464d-a9b5-793921d89323	145322fb-82ad-4c59-97f4-f83351d153f6	1	فواكه	90
7185d5bc-ceb4-4b47-adbb-11e014d05d5b	145322fb-82ad-4c59-97f4-f83351d153f6	2	فانيلا	85
72694ef8-f13a-42b2-8e91-949595737535	145322fb-82ad-4c59-97f4-f83351d153f6	3	دافئ	80
34ad215b-f2e7-4d4d-85a0-43e7fce9af2d	145322fb-82ad-4c59-97f4-f83351d153f6	4	زهري	75
a44b123e-bfc8-4af7-9249-7601abec032b	145322fb-82ad-4c59-97f4-f83351d153f6	5	عنبر	70
d3650cbf-dd53-4543-a4db-6d36b8a92936	41a4187a-0678-44a1-93ea-12faf3f859ff	1	فواكه	95
58a0fdfe-ded0-4e4c-8f0a-9c36a2419a15	41a4187a-0678-44a1-93ea-12faf3f859ff	2	منعش	85
70482c4c-072c-47b3-a70a-882458070c9a	41a4187a-0678-44a1-93ea-12faf3f859ff	3	زهري	80
b98ddede-601e-46d9-bcc7-0cfbf8c34c9f	41a4187a-0678-44a1-93ea-12faf3f859ff	4	ناعم	75
a1dfd20e-c423-4021-9d90-ef4c16f4aa1e	41a4187a-0678-44a1-93ea-12faf3f859ff	5	مسك	70
e9ffb551-bbff-4ba6-bae6-89db3f510c15	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	1	حلو	95
f10cce68-72f9-420a-9069-79732296b635	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	2	زهري	85
8a6dc8eb-782d-4af5-af8f-d81cba57cefa	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	3	دافئ	80
889b8a92-7081-4d21-8c11-ec4d69dac08d	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	4	حمضي	75
7424a4b5-454a-49da-a135-2ff5fbefe31f	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	5	ناعم	70
36aee16f-7501-4666-9236-be456c49ba4f	89b49afd-1edc-47a0-a281-b7c66a7174d8	1	زهري	95
b22821df-a382-493b-a20a-7c11b1970fc4	89b49afd-1edc-47a0-a281-b7c66a7174d8	2	بودري	85
d980e67b-0c57-4de4-92b1-8f704d8db90e	89b49afd-1edc-47a0-a281-b7c66a7174d8	3	جلدي	80
225e9447-b598-4673-8b33-c6c6ebd884e5	89b49afd-1edc-47a0-a281-b7c66a7174d8	4	فانيلا	75
3db5accd-897a-4e81-9061-adad9154d91b	89b49afd-1edc-47a0-a281-b7c66a7174d8	5	باتشولي	70
f12e7f81-359f-4150-b54b-1107d8bbffa9	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	1	منعش	90
2ebc5604-f0fd-4548-bee2-9c8a523b3f98	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	2	فواكه	85
bbcad5b7-6828-4ed9-92f5-935126ebec16	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	3	زهري	80
b4bca1e2-4452-42e0-b1b6-9dcbbeb4398a	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	4	أخضر	75
1236001a-e9e8-43fd-a4b7-832657393637	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	5	مسك	70
7fe0ab23-bd18-4960-990d-a9575afc5485	11f0346a-b5bc-4898-b80d-3036af83d7dd	1	حلو	95
56b9dd0d-50dc-4de7-ae28-e191e2799b7b	11f0346a-b5bc-4898-b80d-3036af83d7dd	2	دافئ	85
2400646c-8f90-4e65-aad8-e04847b0fe71	11f0346a-b5bc-4898-b80d-3036af83d7dd	3	زهري	80
ce530da7-338b-49af-aa9a-a86146c3d4c4	11f0346a-b5bc-4898-b80d-3036af83d7dd	4	ناعم	75
452fe2f7-d78f-4f0e-ae30-ac7298099a61	11f0346a-b5bc-4898-b80d-3036af83d7dd	5	مسك	70
b8c3eb83-36e5-467f-a025-1f4eda235fcb	3de69211-944c-4d70-a176-6144b2d5d8b5	1	فواكه	90
bd5dd09d-8181-4ce8-8053-c389dd9de15e	3de69211-944c-4d70-a176-6144b2d5d8b5	2	زهري	85
b6ce01a3-6021-495e-940b-18ce652d0c5a	3de69211-944c-4d70-a176-6144b2d5d8b5	3	حلو	80
d0eb3597-7f2b-484c-bf7c-9ef2cb3d5af8	3de69211-944c-4d70-a176-6144b2d5d8b5	4	ناعم	75
8e01230a-c698-44ce-82e3-2d5d0b13d5cc	3de69211-944c-4d70-a176-6144b2d5d8b5	5	مسك	70
15dfa4a9-208a-4acd-8bde-9c3100c82e76	d2c53ac9-0886-43a5-845d-4b799b6ea413	1	زهري	90
64a90f17-9549-4ce0-9acf-b7594b7c85ab	d2c53ac9-0886-43a5-845d-4b799b6ea413	2	توابل	85
592b91af-bf97-4193-9f6b-2d91839c261a	d2c53ac9-0886-43a5-845d-4b799b6ea413	3	فواكه	80
a14c5d77-5937-47b0-afc2-6e13a7d0edf5	d2c53ac9-0886-43a5-845d-4b799b6ea413	4	منعش	75
c2fd6b43-2aec-49fc-a79a-77acfe1aab75	d2c53ac9-0886-43a5-845d-4b799b6ea413	5	مسك	70
e7e7dce6-7dc1-4419-97f8-9d88dfdd84a3	a99e49e0-69e2-4a60-95d2-537c71c8430b	1	مسك	95
aa73602f-224c-490b-957c-b1a2af54ef02	a99e49e0-69e2-4a60-95d2-537c71c8430b	2	زهري	85
f0019e2e-3d4f-4800-95e9-58eb12cb6670	a99e49e0-69e2-4a60-95d2-537c71c8430b	3	باتشولي	80
b09ccd71-09a9-4a3e-bba8-aa0396748065	a99e49e0-69e2-4a60-95d2-537c71c8430b	4	دافئ	75
c02ab35c-7da2-4179-bb45-163af225eeff	a99e49e0-69e2-4a60-95d2-537c71c8430b	5	ناعم	70
bf9ab2de-a5eb-40a3-b378-4d04263f9407	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	1	فواكه	95
8ef84ac0-5103-4af9-b117-0af08c7ab8a7	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	2	توابل	85
949df418-94d0-47e1-abd6-84aed1db4172	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	3	زهري	80
2efd81c8-03fb-4c37-93ea-5b660454e27b	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	4	دافئ	75
e0385cd9-d45a-4e21-8f24-ea2813aba4a6	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	5	مسك	70
4299b128-ba9c-4cd1-ae78-20d72f3d4e84	69da95bf-6e1a-486b-b0c5-7d3fed07e012	1	فواكه	95
28505bb1-ceea-4078-93e9-1036f81ed207	69da95bf-6e1a-486b-b0c5-7d3fed07e012	2	زهري	85
55bce35c-d471-49e0-a3ea-162aa4bd28f2	69da95bf-6e1a-486b-b0c5-7d3fed07e012	3	منعش	80
f6ff0181-535a-4717-b735-efa8cdb1a620	69da95bf-6e1a-486b-b0c5-7d3fed07e012	4	حمضي	75
5d29156c-fb9f-43a0-8e7a-d961affe0923	69da95bf-6e1a-486b-b0c5-7d3fed07e012	5	ناعم	70
fdb68b2e-1eba-4fe5-9536-b9ecf3f7c7ea	c5c96781-0c85-4e34-aba6-f68cd878276e	1	فواكه	95
1a195899-eddb-4071-a42d-0c6270d607af	c5c96781-0c85-4e34-aba6-f68cd878276e	2	زهري	85
c4450eb6-8ac4-44ff-9d3f-3bbe46aecf66	c5c96781-0c85-4e34-aba6-f68cd878276e	3	منعش	80
9c56ce51-9099-4040-883e-dee6318d0c0f	c5c96781-0c85-4e34-aba6-f68cd878276e	4	ناعم	75
dee8e06b-a483-4924-94dd-4e69a2bb3566	c5c96781-0c85-4e34-aba6-f68cd878276e	5	مسك	70
8a307d6c-d831-41ee-a31d-1459129c4ca6	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	1	حلو	95
7ad96843-a4b5-4ff6-a72a-58a892ff7567	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	2	فواكه	85
22b24bc2-51e2-489b-be9c-f558d4be4385	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	3	زهري	80
f76b36c0-2566-47e1-921e-e70e7986531b	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	4	دافئ	75
a6b20198-1c1b-42d7-9677-f7f789aa06ee	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	5	ناعم	70
055d82c8-101e-4dc0-a6b3-2eaecfc54363	ede67ea9-e0e5-4e77-8841-b0504adc7f91	1	حلو	95
233bb06c-3dbf-4330-8a39-bdab95701356	ede67ea9-e0e5-4e77-8841-b0504adc7f91	2	فانيلا	85
878f0c9f-5f99-4b5e-83ca-bcdba75476a9	ede67ea9-e0e5-4e77-8841-b0504adc7f91	3	فواكه	80
07d30e5d-1dab-496e-b7fd-3aa264765155	ede67ea9-e0e5-4e77-8841-b0504adc7f91	4	دافئ	75
c883a35f-c9e1-46f5-aef2-baa5e87496eb	ede67ea9-e0e5-4e77-8841-b0504adc7f91	5	زهري	70
fec35a41-0d40-4281-8121-44696aa496d7	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	1	زهري	95
c0411378-faaa-489f-a5e3-ffb881b4a2d5	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	2	ناعم	85
9f92e7a3-d8b3-48f2-a51a-2464f6613d4e	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	3	خشبي	80
24909bb2-8beb-4c31-ac58-7c85794a2755	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	4	منعش	75
f73b8a66-24cd-4c87-82a3-2cac79b7b509	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	5	دافئ	70
b19614a4-73c6-456e-af88-e7317a9b818c	f0893160-9afd-4796-a6ae-f7eb69e3539a	1	زهري	95
72996ad6-1a85-436a-9996-16094a312acb	f0893160-9afd-4796-a6ae-f7eb69e3539a	2	فواكه	85
256f304a-38cd-4a1b-82ba-3f487807914f	f0893160-9afd-4796-a6ae-f7eb69e3539a	3	حلو	80
52c18e2f-c358-45ce-bec2-8a16de21e4e8	f0893160-9afd-4796-a6ae-f7eb69e3539a	4	ناعم	75
63dd8968-9446-497c-9a3b-4af94c9cd024	f0893160-9afd-4796-a6ae-f7eb69e3539a	5	دافئ	70
5e21e2d7-3e60-453f-98e3-8e89578ef518	dbcd7aa8-c953-40fc-9397-cd6e82970408	1	زهري	95
a1de08b2-06e7-44a0-98f0-3540ef4888b4	dbcd7aa8-c953-40fc-9397-cd6e82970408	2	حمضي	85
ec71e9d2-7224-4adf-a7a5-dfb17a40fc48	dbcd7aa8-c953-40fc-9397-cd6e82970408	3	منعش	80
00313836-a920-4990-a230-759d6378f3e9	dbcd7aa8-c953-40fc-9397-cd6e82970408	4	ناعم	75
2532bfe9-325f-4c4d-889b-244f85145496	dbcd7aa8-c953-40fc-9397-cd6e82970408	5	خشبي	70
ae265efd-ede1-429f-b0f8-2c86099c8ee0	3dc58dd7-9617-4636-9d21-20b318a02125	1	حلو	95
cee6dab3-aaa2-4e62-aeb0-90fb7a60c9ea	3dc58dd7-9617-4636-9d21-20b318a02125	2	فانيلا	85
dd1ef3ee-1e9a-4903-a0b2-bef551d7d66c	3dc58dd7-9617-4636-9d21-20b318a02125	3	فواكه	80
fe0888f0-b819-4e1b-8ef1-463e2a724914	3dc58dd7-9617-4636-9d21-20b318a02125	4	زهري	75
736e4e9c-e0bc-4ed0-849b-e509e9d773c3	3dc58dd7-9617-4636-9d21-20b318a02125	5	دافئ	70
c99ebe45-3b44-47ab-9367-95974a8c5a71	c50b0594-d1a2-4571-99c1-3ae820c80c97	1	زهري	90
3119d8c8-8146-4375-8ff6-6c1a5951a439	c50b0594-d1a2-4571-99c1-3ae820c80c97	2	أروماتك	85
51e63abe-8135-4943-8256-b48ac12d58ea	c50b0594-d1a2-4571-99c1-3ae820c80c97	3	حمضي	80
9b63c84e-23df-4ad8-98bf-31da90c5f4a0	c50b0594-d1a2-4571-99c1-3ae820c80c97	4	فانيلا	75
a7caf10a-3869-44ac-a45d-fbcd318f2b6b	c50b0594-d1a2-4571-99c1-3ae820c80c97	5	مسك	70
e9445b9c-606b-4ee4-adfb-ed71445f666b	a51f935a-1c25-4c97-a1b0-f3a48f84110d	1	فانيلا	95
93bf5db4-a77c-4bc4-bb1e-fb61d13d966e	a51f935a-1c25-4c97-a1b0-f3a48f84110d	2	حلو	85
0aab881b-f1de-4c8c-9bc0-0c2d2d6f503d	a51f935a-1c25-4c97-a1b0-f3a48f84110d	3	دافئ	80
35712ae2-635e-4da3-b4b3-1b3b71a5a897	a51f935a-1c25-4c97-a1b0-f3a48f84110d	4	ناعم	75
ca40e5e6-ecb8-4a47-89ca-3ff96f581191	a51f935a-1c25-4c97-a1b0-f3a48f84110d	5	خشبي	70
3bc65ab0-52b0-46b3-824f-f3c6b8f8d329	29326dc6-bbce-4b7d-bdf7-14a183f91d29	1	فواكه	95
40016463-c6fd-4526-bffe-3ec9d0cbd8ca	29326dc6-bbce-4b7d-bdf7-14a183f91d29	2	حلو	85
e4cf023d-bb27-4097-8b53-c58e0b06f57f	29326dc6-bbce-4b7d-bdf7-14a183f91d29	3	باتشولي	80
e6272671-3fb4-42e9-8fb8-914a6d5aaaf8	29326dc6-bbce-4b7d-bdf7-14a183f91d29	4	زهري	75
84e63bff-c751-4204-ad35-bb0a3300b11f	29326dc6-bbce-4b7d-bdf7-14a183f91d29	5	مسك	70
a2d28a70-34b0-4ca0-8941-9d7d0a2f70eb	a46bce06-0dfc-4138-9fdd-54c90d303733	1	حلو	95
29275c6e-3568-4e50-ab70-801151d9b203	a46bce06-0dfc-4138-9fdd-54c90d303733	2	فواكه	85
cb9eb9f0-0008-49ef-9ced-43938ce31ad3	a46bce06-0dfc-4138-9fdd-54c90d303733	3	حمضي	80
a561f83c-575a-4699-a199-066b3b8c9629	a46bce06-0dfc-4138-9fdd-54c90d303733	4	زهري	75
c2ddebae-e9f6-4068-962a-c3f7eb087e21	a46bce06-0dfc-4138-9fdd-54c90d303733	5	مسك	70
b78580e8-82e0-4c55-ad42-7ff08eb33176	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	1	زهري	95
7654ec3a-34bb-415a-b300-f604770ee596	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	2	حلو	85
b487246d-eb38-456d-a2e0-099b7e834e73	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	3	منعش	80
b7f9842c-88da-4806-ad27-36791c73a809	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	4	باتشولي	75
3cd91705-5856-4994-8e14-1bde1cbac6cb	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	5	جوز هند	70
687e1d5a-31f4-45b3-8f8b-faf2e0ed1333	8905257e-c381-4912-a966-00223625f3e4	1	زهري	95
3702fafe-71a4-4906-b479-5749045efe88	8905257e-c381-4912-a966-00223625f3e4	2	مسك	85
68b0d937-b7fa-48b1-acc1-363988e6dd2f	8905257e-c381-4912-a966-00223625f3e4	3	حمضي	80
60b88bbb-a344-4924-a73a-52a18825a815	8905257e-c381-4912-a966-00223625f3e4	4	ناعم	75
169767eb-7cae-4360-a26b-571e7274df66	8905257e-c381-4912-a966-00223625f3e4	5	خشبي	70
f7a35d52-e9bf-4bda-8144-f073c8ecb1eb	5b2f01bb-00bd-4a50-a834-3460898a017b	1	منعش	95
629c4541-4575-45a9-a1c7-816b2222b1d8	5b2f01bb-00bd-4a50-a834-3460898a017b	2	حمضي	85
7ed77660-eb8b-4952-92e0-90cf60a89618	5b2f01bb-00bd-4a50-a834-3460898a017b	3	زهري	80
f17a5386-0fef-466c-b230-78a766c112f9	5b2f01bb-00bd-4a50-a834-3460898a017b	4	أخضر	75
fe7587da-9365-48bf-993a-185f1e8ef33b	5b2f01bb-00bd-4a50-a834-3460898a017b	5	ناعم	70
cefee20b-0206-47db-9f7e-bd782de14023	280ca217-97f0-454a-a18e-0d952e3f0b1d	1	حلو	95
e740d68d-b27b-4f64-813e-5795cd05ec44	280ca217-97f0-454a-a18e-0d952e3f0b1d	2	كاكاو	85
dc61a776-004d-4f5d-8469-9f0549e9a214	280ca217-97f0-454a-a18e-0d952e3f0b1d	3	زهري	80
1aa2ee20-f13c-4bca-8b41-5ae222ea1dbc	280ca217-97f0-454a-a18e-0d952e3f0b1d	4	دافئ	75
31377ec2-ed1f-47c1-a92e-697696341507	280ca217-97f0-454a-a18e-0d952e3f0b1d	5	توابل	70
b1dbc0f9-c5e8-4e67-893c-ebbd6d140b6f	bab6c3d5-c460-43f7-a660-6d6b8747318b	1	فواكه	95
16dfa32d-29ce-46c7-a973-171981a00bee	bab6c3d5-c460-43f7-a660-6d6b8747318b	2	حلو	85
2bab7128-48ae-4d50-8ce2-65274c7380aa	bab6c3d5-c460-43f7-a660-6d6b8747318b	3	مسك	80
fa085a7d-13ae-473b-96ab-ccc6655b5c68	bab6c3d5-c460-43f7-a660-6d6b8747318b	4	ناعم	75
6422a096-f77c-42cb-b448-74fef390b323	bab6c3d5-c460-43f7-a660-6d6b8747318b	5	خشبي	70
ed396295-4503-4388-b3e6-2ce2df6b0169	96218f01-4d39-4de3-a748-6dd625db4252	1	زهري	90
3dd958f1-d03e-4aaa-822e-79d45dc7c82c	96218f01-4d39-4de3-a748-6dd625db4252	2	فواكه	85
aacb2b72-1611-40a9-88f7-975fde49d479	96218f01-4d39-4de3-a748-6dd625db4252	3	منعش	80
2f0c0a3f-cb3c-42fd-9424-dce76ba1bf37	96218f01-4d39-4de3-a748-6dd625db4252	4	ناعم	75
0f677f7e-920e-466a-bc6d-0d66bba6c601	96218f01-4d39-4de3-a748-6dd625db4252	5	مسك	70
321b4d77-8fc0-4b31-b81e-865c16427f58	884828eb-60d9-4423-bc31-a487113c38e7	1	فواكه	90
6cf24f76-78d2-4ada-a6a0-8b6dc0c54779	884828eb-60d9-4423-bc31-a487113c38e7	2	باتشولي	85
bb4567c5-9f33-4fe2-8948-03df923631a1	884828eb-60d9-4423-bc31-a487113c38e7	3	حلو	80
eb8627ea-a5c2-4102-b35f-1b87e8e346db	884828eb-60d9-4423-bc31-a487113c38e7	4	زهري	75
7dbb1eb7-ce33-4979-bde5-557240b1c263	884828eb-60d9-4423-bc31-a487113c38e7	5	دافئ	70
7a211d39-f5b2-4c68-ae83-568feb973742	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	1	مسك	95
58f8c33f-32b0-42b7-b00b-1d9859defcfb	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	2	فانيلا	85
34846505-40d4-443e-b9ed-063e28ee83ff	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	3	بودري	80
589a1696-6092-419b-b6bf-20920737a0d0	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	4	زهري	75
5e7d3c88-4d77-4cb4-992d-952ab094ff08	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	5	حمضي	70
b11ac090-1071-406d-bf99-81c67452e2d1	ec873406-a5b2-4f2a-b007-522847f4fc86	1	بودري	95
97de9077-2482-4987-8baa-73f773f5c049	ec873406-a5b2-4f2a-b007-522847f4fc86	2	زهري	85
e321a3c2-1d58-4f15-badc-cdbfa46a9a1b	ec873406-a5b2-4f2a-b007-522847f4fc86	3	فانيلا	80
7ca9f650-579b-463b-8671-ef25e02216e4	ec873406-a5b2-4f2a-b007-522847f4fc86	4	مسك	75
9ea6a330-3227-4b86-832d-a93786805550	ec873406-a5b2-4f2a-b007-522847f4fc86	5	ناعم	70
1adf4df4-881f-4c1b-ae29-1267a59e228e	f29e0936-5075-4959-9f3a-8e0631322a56	1	باتشولي	90
151e9f17-dc3f-4e63-8d42-a6b08bf59312	f29e0936-5075-4959-9f3a-8e0631322a56	2	زهري	85
c3544466-f3d6-40b4-b6f0-1b75b965e16b	f29e0936-5075-4959-9f3a-8e0631322a56	3	دافئ	80
2128362c-8411-40a4-b3fc-25207cdebbf9	f29e0936-5075-4959-9f3a-8e0631322a56	4	حمضي	75
1f70c2ea-39af-461b-97fd-fb8253ab7ead	f29e0936-5075-4959-9f3a-8e0631322a56	5	فانيلا	70
01f6bc2a-a781-4c71-afd1-ecac372a4cbf	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	1	حلو	95
c079b48b-7b40-483c-812c-1fe79bb9fdee	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	2	زهري	85
79f3fec6-f012-4a9d-a5bf-8e9abb87afb0	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	3	فواكه	80
0d7b3209-a568-4203-9cd7-6c58d896b491	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	4	دافئ	75
dd9a5610-9ece-43ae-a848-91b6ce2eea2b	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	5	باتشولي	70
fb1862db-6c49-42be-aa20-2eb75dc7f6ae	39d50a82-2cdd-434d-86a0-697a11b8b4e8	1	فانيلا	95
8e1b01ee-853f-4ccd-b162-707720113de3	39d50a82-2cdd-434d-86a0-697a11b8b4e8	2	حلو	85
edce2d28-1530-4602-bc74-cd253058cc0b	39d50a82-2cdd-434d-86a0-697a11b8b4e8	3	زهري	80
4d99051a-67c6-4ea5-810c-b7af712b1385	39d50a82-2cdd-434d-86a0-697a11b8b4e8	4	فواكه	75
32c612fe-cf4f-4331-8414-c519d1afbbed	39d50a82-2cdd-434d-86a0-697a11b8b4e8	5	خشبي	70
e1ff7d47-9b32-4a6b-88d0-a648ab1d0142	6ca38c24-ff0b-4de6-bb02-7728da1a152c	1	بودري	95
696768e4-fe45-4df6-8210-829cf1b3fc23	6ca38c24-ff0b-4de6-bb02-7728da1a152c	2	مسك	85
3bfcbc35-7e97-459d-80ee-68844160724f	6ca38c24-ff0b-4de6-bb02-7728da1a152c	3	زهري	80
2f7e5088-8146-403d-9b8e-3e7993c90bed	6ca38c24-ff0b-4de6-bb02-7728da1a152c	4	ناعم	75
4aef7b7b-4fbf-4070-b336-1273dd60d3e5	6ca38c24-ff0b-4de6-bb02-7728da1a152c	5	خشبي	70
0e228c69-2668-4d1c-83dc-4bca125960fc	891f007b-b216-4b69-82ae-7bba793fa2d2	1	منعش	95
975d791a-8d21-4dbd-86f0-df0e5ea78ec1	891f007b-b216-4b69-82ae-7bba793fa2d2	2	بحري	90
df0e7b1e-22be-43a9-9824-c69b4ed68315	891f007b-b216-4b69-82ae-7bba793fa2d2	3	حمضي	80
bed66be4-38b1-4d5a-8932-480c2c613ee9	891f007b-b216-4b69-82ae-7bba793fa2d2	4	خشبي	75
b9d171ee-c064-41fe-9a0e-a79ac1781a44	891f007b-b216-4b69-82ae-7bba793fa2d2	5	توابل	70
c2a18ab4-574b-4170-8222-b3dee302885e	af4c5426-894d-4900-9b64-1acede6eaa6e	1	فواكه	95
35b26155-2050-4d28-8d0f-3b09606a3e89	af4c5426-894d-4900-9b64-1acede6eaa6e	2	حلو	85
e224d947-f7ba-480f-b918-e74be99c3c35	af4c5426-894d-4900-9b64-1acede6eaa6e	3	زهري	80
ef56bfa8-76b7-4483-8148-66b7e39686ec	af4c5426-894d-4900-9b64-1acede6eaa6e	4	ناعم	75
f3c4844d-de57-4bdb-97f4-48df9aa72f3f	af4c5426-894d-4900-9b64-1acede6eaa6e	5	منعش	70
5ac4ae03-e93e-494f-86ba-d0131d456913	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	1	حلو	95
67771253-1f95-468c-9823-ad5204a34a55	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	2	فواكه	85
de96e8eb-774f-4117-9c3c-a4cb3536d1a5	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	3	دافئ	80
a5ca282d-9317-4514-9bc0-58b81b7af247	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	4	زهري	75
ea1d9dc0-e76c-4bc9-b04c-10b51d9d54c3	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	5	شرقي	70
4efe7d86-db3c-421e-b6a1-638a96fe284a	67aca763-e6a4-4936-ab6f-bbc99de5558f	1	فانيلا	90
e5015318-bada-4099-86fb-d73eceb51742	67aca763-e6a4-4936-ab6f-bbc99de5558f	2	زهري	85
027124bb-af04-41c7-865b-c720f4392c61	67aca763-e6a4-4936-ab6f-bbc99de5558f	3	باتشولي	80
e4ee5f4b-b924-4242-a59f-37457084f519	67aca763-e6a4-4936-ab6f-bbc99de5558f	4	حلو	75
103f95e6-29bc-4915-b665-8bb3ec4be26f	67aca763-e6a4-4936-ab6f-bbc99de5558f	5	دافئ	70
74215871-201f-4786-a4ec-78e9ac3d2cc3	d428176a-216a-4231-b4d7-acb249438281	1	زهري	95
eb17e072-00be-4e14-a01c-4eb809bf663e	d428176a-216a-4231-b4d7-acb249438281	2	حمضي	85
ac5ac199-6591-4561-8db8-113ce895e387	d428176a-216a-4231-b4d7-acb249438281	3	منعش	80
ebe1a638-8571-4d94-a617-59637322febe	d428176a-216a-4231-b4d7-acb249438281	4	ناعم	75
b8a915f4-d7f3-4d1e-9466-06e4ff28f568	d428176a-216a-4231-b4d7-acb249438281	5	مسك	70
091c00b2-8aac-4d63-a0c8-9d96963199a0	42517512-0290-480f-9a2c-7f0ae2f7c7d3	1	فواكه	95
c3a7d935-f45b-4fcd-907a-92801aac7c0a	42517512-0290-480f-9a2c-7f0ae2f7c7d3	2	حمضي	85
aff7ea7e-b536-4eb6-88c4-cafd73f28460	42517512-0290-480f-9a2c-7f0ae2f7c7d3	3	خشبي	80
f6cceb5e-9ff1-4dd1-a201-d843314a5145	42517512-0290-480f-9a2c-7f0ae2f7c7d3	4	منعش	75
0118bf81-5009-42c8-89df-d00f201da18b	42517512-0290-480f-9a2c-7f0ae2f7c7d3	5	ناعم	70
f9f3515d-8475-4ef9-8410-aed7044222cc	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	1	حلو	90
71345a89-0257-4fd2-a13f-920877ef7882	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	2	توابل	85
bdd07b7f-2790-4c0e-a89b-7aa924c830b9	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	3	منعش	80
c60b9df3-a31a-4a44-a733-e2ace82c6bd9	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	4	زهري	75
98de01c9-1d39-4b3e-8978-c983bea310b9	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	5	دافئ	70
8becc9c5-bbf3-4f65-8bfc-15885234ac99	52969a79-f71b-4494-baa5-f0f72b8362a5	1	فانيلا	95
6fd7d79c-2bf9-42aa-bc8d-819e5ce835fa	52969a79-f71b-4494-baa5-f0f72b8362a5	2	حلو	85
b798e1d2-e91b-4074-8873-c34d2b537820	52969a79-f71b-4494-baa5-f0f72b8362a5	3	دافئ	80
e2797b67-8914-4cb9-8f43-acbfb149670f	52969a79-f71b-4494-baa5-f0f72b8362a5	4	ناعم	75
51b8749c-89ff-4937-837e-d52e1a2b7bea	52969a79-f71b-4494-baa5-f0f72b8362a5	5	مكسرات	70
dbbb1c7a-b837-453c-92c7-e809852c6aa9	778e0606-669c-4c18-8e9f-55043d1115f0	1	منعش	95
274f8a9a-0093-430d-bd5d-6ca31176099b	778e0606-669c-4c18-8e9f-55043d1115f0	2	بحري	90
5c0858bc-9d81-40a8-b0b9-092e1fddec51	778e0606-669c-4c18-8e9f-55043d1115f0	3	فواكه	80
48904e30-2b6c-4443-8041-135a2d1b8afb	778e0606-669c-4c18-8e9f-55043d1115f0	4	زهري	75
7d35ffe3-48e2-4023-bf4c-14bcc0bb0177	778e0606-669c-4c18-8e9f-55043d1115f0	5	مسك	70
41920c65-91b4-4181-a95f-22976075aafa	3595cb72-9575-4b6b-93bd-fee286dacd22	1	زهري	95
2998cc92-c8de-4060-8f98-06524baa5595	3595cb72-9575-4b6b-93bd-fee286dacd22	2	أخضر	85
18076f6b-07a1-4e1a-a8d5-34714cbc9ba8	3595cb72-9575-4b6b-93bd-fee286dacd22	3	منعش	80
ffd501a5-2c00-41e0-a160-9b2b6ae80cb8	3595cb72-9575-4b6b-93bd-fee286dacd22	4	ناعم	75
927be6a5-3644-489f-a199-627808b93b21	3595cb72-9575-4b6b-93bd-fee286dacd22	5	مسك	70
d0e4f0b7-ba11-4ff8-8bce-838449eed80a	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	1	زهري	95
89ae2134-22d3-4c52-8d89-c11ff7b3a549	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	2	فواكه	85
25f2a689-3ac5-4d23-917f-566a6347006a	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	3	منعش	80
a0e7e5f2-d102-4b21-8bfa-88de97667a42	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	4	ناعم	75
26d4f65f-6f36-42fe-9949-deca5e71b762	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	5	أخضر	70
aa9fc68a-f3fe-447c-b216-20724b1eead4	32d809a3-ffdb-4943-a764-d5a51ab9197b	1	حلو	95
aab5a6cb-7cd0-48f1-a939-d70783a10c99	32d809a3-ffdb-4943-a764-d5a51ab9197b	2	زهري	85
0cb85e9d-44ab-4006-842e-de7d68445e6b	32d809a3-ffdb-4943-a764-d5a51ab9197b	3	دافئ	80
2bc8f83e-da1f-4e59-b220-3a54053050df	32d809a3-ffdb-4943-a764-d5a51ab9197b	4	باتشولي	75
6dcf6cf5-f227-41ed-8319-6198b2a883a9	32d809a3-ffdb-4943-a764-d5a51ab9197b	5	ناعم	70
706dc928-2975-4c52-8fce-bf3ba1e9fba6	1f91a997-29da-43c3-a68e-c685e4805c44	1	مسك	95
b7f3fc48-ba8f-45f2-bd0d-4219ab0bf0a0	1f91a997-29da-43c3-a68e-c685e4805c44	2	زهري	85
4869dfde-877e-4f2e-847f-b75f4f8d4093	1f91a997-29da-43c3-a68e-c685e4805c44	3	ناعم	80
481b021f-d754-4064-9477-3527194e1e12	1f91a997-29da-43c3-a68e-c685e4805c44	4	منعش	75
ae9bc6c1-24c1-4542-a850-9217722980d4	1f91a997-29da-43c3-a68e-c685e4805c44	5	خشبي	70
c4ba797f-0b4a-47bc-ad3d-678bcaf7b7da	46a122eb-37ed-4656-9987-cad400a5d461	1	فانيلا	95
abf26f44-2e2b-4cef-b024-630e8d0a2ad2	46a122eb-37ed-4656-9987-cad400a5d461	2	زهري	85
894800de-658b-4978-a541-ec0410a70944	46a122eb-37ed-4656-9987-cad400a5d461	3	دافئ	80
f4385448-3ae5-4dae-a970-d3c6f186f165	46a122eb-37ed-4656-9987-cad400a5d461	4	ناعم	75
3f3a9ed8-13b5-40e8-a679-7743b27d9ee7	46a122eb-37ed-4656-9987-cad400a5d461	5	ترابي	70
fcbf2126-1de7-4bb8-b100-9da134f0b888	fd56b88d-1e3d-4b94-841d-485aa0c62d93	1	فواكه	95
985864fe-8b05-4861-add6-d7fda740abf7	fd56b88d-1e3d-4b94-841d-485aa0c62d93	2	زهري	85
bb08fc30-75b1-46fd-afe4-b28e4e266735	fd56b88d-1e3d-4b94-841d-485aa0c62d93	3	منعش	80
a161845b-192d-467f-89f2-8a15ca0e13a1	fd56b88d-1e3d-4b94-841d-485aa0c62d93	4	ناعم	75
29287534-7c2b-4589-8df1-227cd1ccf3ce	fd56b88d-1e3d-4b94-841d-485aa0c62d93	5	مسك	70
347c1eac-8ac5-4bec-9a17-fa9bd92caef5	51793003-ac19-41aa-801e-2d656912435e	1	باتشولي	90
537733d7-17b7-4211-82b2-c3059b786309	51793003-ac19-41aa-801e-2d656912435e	2	توابل	85
4cb9b905-60d7-483b-a2a3-527410a2498d	51793003-ac19-41aa-801e-2d656912435e	3	زهري	80
e7c64000-6baa-4f20-b90c-1be1fc519fa9	51793003-ac19-41aa-801e-2d656912435e	4	حمضي	75
cbb6f455-279e-49f1-a965-c3d1ed238e3a	51793003-ac19-41aa-801e-2d656912435e	5	مسك	70
8949999b-9604-44dc-9f22-847a63a70da8	96114e09-ae93-454e-89fe-ac9abff3ccd6	1	زهري	95
0016d66f-4c41-404c-ba96-60edb01ced24	96114e09-ae93-454e-89fe-ac9abff3ccd6	2	فانيلا	85
2c8b0994-af33-40fc-9321-9ac7ece7314b	96114e09-ae93-454e-89fe-ac9abff3ccd6	3	حلو	80
e662be0f-f133-4045-ae45-1c5a62fee788	96114e09-ae93-454e-89fe-ac9abff3ccd6	4	دافئ	75
66e4d291-da67-43d6-8c24-fff40ff82083	96114e09-ae93-454e-89fe-ac9abff3ccd6	5	ناعم	70
4028f24c-2b2e-446b-b954-97d40aef4cfa	acdf7fe9-649c-4462-ad02-38097659151d	1	حلو	95
1db29e85-9a3a-4d86-85dd-c1c3e552c0a6	acdf7fe9-649c-4462-ad02-38097659151d	2	قهوة	85
61eb6ee6-c9b0-4c8b-ac8e-2953a44c66b4	acdf7fe9-649c-4462-ad02-38097659151d	3	بودري	80
9b203d41-c992-431a-b3e2-336df8a0a983	acdf7fe9-649c-4462-ad02-38097659151d	4	دافئ	75
c2e617b3-8481-46d9-a677-7df4fba19395	acdf7fe9-649c-4462-ad02-38097659151d	5	فواكه	70
da2abac0-1b0e-4ab0-8c3f-093cc01e6a35	4946e917-e9b2-4d63-a63c-96526efcffae	1	حلو	95
7e6597d7-4035-45d1-98ef-5b9c4f865476	4946e917-e9b2-4d63-a63c-96526efcffae	2	حمضي	85
e81c7395-33ae-4267-aec4-5436f631f619	4946e917-e9b2-4d63-a63c-96526efcffae	3	فانيلا	80
2da5b94d-53f9-4f69-86dc-f05ef15fa835	4946e917-e9b2-4d63-a63c-96526efcffae	4	زهري	75
45265d84-e462-4809-a16b-1e71520ce759	4946e917-e9b2-4d63-a63c-96526efcffae	5	دافئ	70
b628f37e-92e3-4d8c-9ab7-6e13a5d9c58d	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	1	فواكه	95
6dcf33f0-2fd5-436f-a0bf-7f293e655f94	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	2	زهري	85
eb078b24-ba7c-4f4d-abf4-de79e52f3ce1	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	3	حلو	80
f685cb2c-c698-435a-9d0b-32bc04990c70	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	4	فانيلا	75
de80eb98-61e6-4616-9f6f-d9979365dff5	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	5	ناعم	70
15f29ceb-ae77-4c8d-9f81-73427ab83406	228cab4e-f472-4d7a-8378-a31d69d6c1c0	1	زهري	95
d640decd-4076-43f9-98d7-4ca4f89df3ab	228cab4e-f472-4d7a-8378-a31d69d6c1c0	2	فانيلا	85
b169cefd-2c79-4239-819e-892607e5dbe5	228cab4e-f472-4d7a-8378-a31d69d6c1c0	3	دافئ	80
1f115421-c941-4eac-af67-9bcdf2a80a03	228cab4e-f472-4d7a-8378-a31d69d6c1c0	4	فواكه	75
c3262235-4e2a-45b8-adbf-49884d71ebb4	228cab4e-f472-4d7a-8378-a31d69d6c1c0	5	ناعم	70
9e483601-6d10-4aa7-a8e2-c9bf56caad7b	53d206c0-c23e-4dd3-a128-783b456c7717	1	زهري	95
4a67ed05-3f2f-4b8f-9cd9-15f2e2e7e2f7	53d206c0-c23e-4dd3-a128-783b456c7717	2	باتشولي	85
6cd92c09-9acf-4b55-a15f-3c9d21a39022	53d206c0-c23e-4dd3-a128-783b456c7717	3	حلو	80
38fb9b32-4afd-4bc9-98d2-7c99ae662c7a	53d206c0-c23e-4dd3-a128-783b456c7717	4	دافئ	75
820bc883-6d22-4d9a-a01b-4b37fa9aadb0	53d206c0-c23e-4dd3-a128-783b456c7717	5	منعش	70
4218c1ea-5371-4f46-8db7-e3cc53381917	0d52c6a7-65d9-4b93-964f-72063f7ed24f	1	فانيلا	95
3875dd9d-e307-45a9-8237-8b3fe23df61a	0d52c6a7-65d9-4b93-964f-72063f7ed24f	2	حلو	85
230c3c3b-a7d5-4bdd-94f6-01be5521dc82	0d52c6a7-65d9-4b93-964f-72063f7ed24f	3	زهري	80
5677a7dd-a1ef-4db3-b61b-40d2e25a0bd3	0d52c6a7-65d9-4b93-964f-72063f7ed24f	4	أروماتك	75
19e4ec38-4437-422b-97d3-f8b75eb51554	0d52c6a7-65d9-4b93-964f-72063f7ed24f	5	دافئ	70
9c44f43c-2ecc-4b76-a571-06d268b3003e	2b00c57b-169d-4e83-8445-8c167d1d6046	1	فانيلا	95
fcc4c4cd-f7d3-4aad-8179-3f2468cc64ef	2b00c57b-169d-4e83-8445-8c167d1d6046	2	حلو	85
309f8d88-9000-4857-8154-430eadd9706c	2b00c57b-169d-4e83-8445-8c167d1d6046	3	مسك	80
c6fe5b44-1aab-4881-b696-ad90f6ef1a9e	2b00c57b-169d-4e83-8445-8c167d1d6046	4	زهري	75
3e472fc3-0b24-46f1-aad1-7e79a59c6787	2b00c57b-169d-4e83-8445-8c167d1d6046	5	دافئ	70
dbd2df65-93f2-4fc7-b7d5-20ecc5edc8d4	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	1	زهري	95
1f9dbe00-bab5-445d-b9b4-332ea0e8b1fe	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	2	حمضي	85
fa8edc19-30d0-4a0e-9667-68267655c5f8	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	3	فانيلا	80
83347413-a880-4bb4-a46b-e3cd3ecf34df	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	4	مسك	75
f4519dd1-2650-463c-8bc5-de61ed40f9f8	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	5	ناعم	70
3a67625e-fc87-434d-a054-1592e7afe63b	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	1	حلو	95
95ed95d0-697a-467f-8fca-5653a2543967	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	2	فواكه	85
be6b553b-1dc0-47f1-93f5-c88927ec8eb3	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	3	زهري	80
93f19ffa-61c0-4fe7-a09d-c4b266369600	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	4	مسك	75
f9d33e88-300c-4c4f-83dd-2039461074b8	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	5	ناعم	70
95402f1d-584d-4d06-b132-faeec2ced260	a5e213c8-bcaf-487d-a232-fec41894abd2	1	حمضي	95
f1a790ea-8d35-491f-9a7c-98cb7f4a992d	a5e213c8-bcaf-487d-a232-fec41894abd2	2	زهري	85
b46aa5df-5b7d-4e3d-8a93-98bad1750046	a5e213c8-bcaf-487d-a232-fec41894abd2	3	منعش	80
64f2f034-cd03-441b-8a78-7e91ffb8e741	a5e213c8-bcaf-487d-a232-fec41894abd2	4	ناعم	75
4f67a619-cc12-4ab9-8e4d-07f939f9dc2b	a5e213c8-bcaf-487d-a232-fec41894abd2	5	مسك	70
73f635e1-1cd2-4e63-acba-ee2064d64473	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	1	حلو	95
8143a07d-5654-4ab9-af80-a9610c5f2b7e	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	2	فانيلا	85
73d9f61b-3ef7-4ca9-9f08-f199dd31f122	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	3	زهري	80
210c52f7-412c-4658-816c-01d5f2b07f33	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	4	دافئ	75
3d60ce6a-3e18-4d80-ae08-b72c0410c72f	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	5	مسك	70
0ed3611c-3e77-4c95-9d91-8456545a0494	1df1bf29-393a-4a74-900b-711f93f278cd	1	منعش	95
0b1820ef-618d-49c7-ae84-2cc98a80787e	1df1bf29-393a-4a74-900b-711f93f278cd	2	حمضي	85
a9cb00f4-64ff-4b3e-9cea-b3c08a7fbce1	1df1bf29-393a-4a74-900b-711f93f278cd	3	خشبي	80
c7174509-0ea8-43d9-b0b8-313b8084da0a	1df1bf29-393a-4a74-900b-711f93f278cd	4	زهري	75
9b3a8730-5eef-4ed8-b39e-f5bd7b81b74a	1df1bf29-393a-4a74-900b-711f93f278cd	5	باتشولي	70
fc824f95-1553-4336-8835-5eb4d5d0c84c	84981eb1-6893-4085-9c0d-58fef95b3333	1	زهري	90
a808b000-866c-43f3-9bb1-f59ecf2ed0eb	84981eb1-6893-4085-9c0d-58fef95b3333	2	حمضي	85
ed497475-71e9-4a0b-945e-b76549947308	84981eb1-6893-4085-9c0d-58fef95b3333	3	فواكه	80
d6b999e5-ae64-49b2-96e2-0ddb19e04660	84981eb1-6893-4085-9c0d-58fef95b3333	4	ناعم	75
c57b0e07-1d14-42c7-b091-40774a6d20eb	84981eb1-6893-4085-9c0d-58fef95b3333	5	خشبي	70
a7e2d0c3-b1b7-40ca-8ba2-cbb5b5125cf6	91c7b155-374a-44ab-8f3c-dfa7ad66a823	1	فواكه	95
9136c739-ce7d-455e-bd82-e5638c3b44e7	91c7b155-374a-44ab-8f3c-dfa7ad66a823	2	باتشولي	85
82007c56-f41f-45a7-932d-c87d7d185a7c	91c7b155-374a-44ab-8f3c-dfa7ad66a823	3	زهري	80
7daf44d4-cf4a-4324-bcd5-c5b22e35dd49	91c7b155-374a-44ab-8f3c-dfa7ad66a823	4	حلو	75
f4bca445-7329-42bf-9858-f81360b79bfa	91c7b155-374a-44ab-8f3c-dfa7ad66a823	5	توابل	70
87d7f24c-09f8-4cce-b621-5adb5e67092c	2035fc62-bb44-415b-93a3-664bf0317667	1	فواكه	95
39a7f9ef-9b5e-44f7-a32e-ec41a2734f23	2035fc62-bb44-415b-93a3-664bf0317667	2	منعش	85
aeaf0c00-d305-4c3e-9aa9-b4eb960e0914	2035fc62-bb44-415b-93a3-664bf0317667	3	بحري	80
6f934dc9-d237-4c1d-b7f9-7c1c78ec3658	2035fc62-bb44-415b-93a3-664bf0317667	4	ناعم	75
4c27de38-987c-42e5-89bc-f3a56288d26f	2035fc62-bb44-415b-93a3-664bf0317667	5	مسك	70
e5d42351-b2dd-4390-95a0-4cfdef92d045	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	1	بودري	95
3c0a1511-36ca-4ad0-b930-0144949a6981	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	2	ألديهيد	90
9b51afd4-3b7b-4962-81a6-05bb6d70cf77	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	3	ناعم	80
071bf155-a6ed-4dd6-ba93-d055549366ca	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	4	خشبي	75
f03b1c32-dfb9-484f-80a5-684cadaf0b00	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	5	زهري	70
a6ebb276-01a5-4c48-8628-34483fae3dd7	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	1	فانيلا	95
2d7b492a-d25a-4d93-890e-1e7350d2d2f0	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	2	حلو	85
9623c8f3-dbfa-4fd1-933a-f15472e85100	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	3	فواكه	80
9d130e49-d276-4e56-96a8-bfbf7c6843ff	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	4	دافئ	75
7f367f5c-c2ec-4a5f-b692-196ac409ff1c	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	5	خشبي	70
19d18b37-583e-4bbd-9f7e-628fb5b861d0	c48de798-90ac-46ab-8a7d-ce383a9b5197	1	فواكه	90
d6f838f0-f574-46cc-981b-11627ffeffee	c48de798-90ac-46ab-8a7d-ce383a9b5197	2	زهري	85
d4adfe38-9e40-4d1a-bbc0-571383af255f	c48de798-90ac-46ab-8a7d-ce383a9b5197	3	حلو	80
de60d6a2-c003-464f-8c5f-a73e588d5bc2	c48de798-90ac-46ab-8a7d-ce383a9b5197	4	ناعم	75
10cde338-88e8-4a3e-a8b2-d1d6b3885d45	c48de798-90ac-46ab-8a7d-ce383a9b5197	5	أخضر	70
cff0cdfb-9fe3-4a2f-ae54-2ac5010da49d	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	1	باتشولي	95
5a122c97-62c8-4891-9e4c-f2ed0e9d916d	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	2	حلو	85
d02f9bf4-2a8e-4a3d-82b9-3aa669fcf86c	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	3	شرقي	80
5d41653f-33f2-4e6d-9b63-977c5aa9ea7f	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	4	خشبي	75
61684f8f-c0a8-47fc-b643-a98da2faab10	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	5	دافئ	70
b43b763f-0ac0-4276-9ab6-e7f8a0357140	f1a154df-b14e-4464-919a-227c2911ba71	1	حلو	95
b10aa749-b7f8-42b9-8069-b8730db80829	f1a154df-b14e-4464-919a-227c2911ba71	2	فواكه	85
572032f8-cfdb-4901-95b9-ca231ded3807	f1a154df-b14e-4464-919a-227c2911ba71	3	باتشولي	80
ef1ba342-3bbc-4c15-923a-9111190c8a16	f1a154df-b14e-4464-919a-227c2911ba71	4	زهري	75
5e21b1ca-27f1-469d-82f7-52d96b20084f	f1a154df-b14e-4464-919a-227c2911ba71	5	دافئ	70
3a4cf36e-65a7-47a7-b543-fb62dc2459b2	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	1	فواكه	90
b00f72bb-aa76-4fc4-b72f-8c6478a9842d	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	2	زهري	85
7d000512-fb65-4bf1-a7a3-bd2975cbd9c9	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	3	دافئ	80
c97fd208-18b5-4aaf-828a-901267b8c329	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	4	ناعم	75
13da19a1-cb75-4030-bc6a-ad08bef87a91	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	5	مسك	70
fc77a394-d4bb-47ab-a08a-fa489a6fd91c	7993d6f5-ae55-42f9-8a93-33469f77f97e	1	فانيلا	95
90cb4212-1556-47f7-8cd5-0176d310d781	7993d6f5-ae55-42f9-8a93-33469f77f97e	2	حلو	85
4d34e93d-cc7a-475a-a835-315e7189505e	7993d6f5-ae55-42f9-8a93-33469f77f97e	3	دافئ	80
9ee6326f-5a89-4e36-887d-ad44e9f7eaf7	7993d6f5-ae55-42f9-8a93-33469f77f97e	4	زهري	75
e121ab2e-75c4-4e51-a920-50da1274b387	7993d6f5-ae55-42f9-8a93-33469f77f97e	5	مسك	70
9458f4d4-ac8b-4b2c-be4f-f09ee7633d68	92ddbf21-eeb8-4dbf-b375-67b791f6f189	1	فواكه	90
c3fe12a1-35e4-49ea-a4cf-c24f9898d167	92ddbf21-eeb8-4dbf-b375-67b791f6f189	2	زهري	85
6b5fa734-af64-405d-ac87-bbeefe5b1d31	92ddbf21-eeb8-4dbf-b375-67b791f6f189	3	منعش	80
33cb9083-98a5-4922-8998-8c864f5063e0	92ddbf21-eeb8-4dbf-b375-67b791f6f189	4	ناعم	75
796f0b3a-1b93-4c33-a104-fc76b2297083	92ddbf21-eeb8-4dbf-b375-67b791f6f189	5	خشبي	70
a6fc3e00-e0c5-47d1-9e9b-aaefa198513c	f8d86061-8839-4601-ba76-588935717299	1	حمضي	95
a5cc7a59-4de1-46ab-a4c6-b2eb4b78928a	f8d86061-8839-4601-ba76-588935717299	2	فواكه	85
81ce5107-5fe9-4827-8846-e9bc81e458f8	f8d86061-8839-4601-ba76-588935717299	3	زهري	80
59aa2a46-3dfb-4c6f-98f8-630381d25a70	f8d86061-8839-4601-ba76-588935717299	4	توابل	75
84e94c17-f717-4fdb-8cc8-79bcb9d769c7	f8d86061-8839-4601-ba76-588935717299	5	فانيلا	70
7eee81cb-5e4d-41c2-9a56-0eeb54142700	0dc3136c-29dd-4108-8a0d-3ea7475a998b	1	زهري	90
1198fe63-1536-4d04-8384-bc3c00e94340	0dc3136c-29dd-4108-8a0d-3ea7475a998b	2	فواكه	85
ef5445b5-baaf-4704-aa21-157aa7ea1417	0dc3136c-29dd-4108-8a0d-3ea7475a998b	3	توابل	80
6472b9fc-474e-44e8-b303-9e2fda0d91ff	0dc3136c-29dd-4108-8a0d-3ea7475a998b	4	دافئ	75
ebded04b-8efb-49f8-baee-0ce8c2e482c9	0dc3136c-29dd-4108-8a0d-3ea7475a998b	5	باتشولي	70
42118d52-da75-4c7b-9252-426844815da7	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	1	زهري	95
b69474b4-3047-48bb-b3b4-b4e2716fa621	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	2	حمضي	85
8b42b107-274a-4203-822f-5f8da00b68de	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	3	خشبي	80
97fb4106-cd73-40e9-afb9-293f785ee961	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	4	ناعم	75
be39213c-74cf-46aa-9f30-63194164fd14	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	5	عنبر	70
88ef3581-9d0e-41a2-8801-e966e5e50cfa	1c8ae757-4400-4989-ac57-d7a488bddcc7	1	زهري	95
9f080b72-b894-4e42-b59f-8350c2973040	1c8ae757-4400-4989-ac57-d7a488bddcc7	2	حلو	85
1ed68c14-88a5-4146-9659-46ec85e92d0f	1c8ae757-4400-4989-ac57-d7a488bddcc7	3	دافئ	80
193fc0f6-691c-4adf-9ba9-2fd0ccecf598	1c8ae757-4400-4989-ac57-d7a488bddcc7	4	توابل	75
6afefc79-2d90-499b-b3dd-fa7178c97f5c	1c8ae757-4400-4989-ac57-d7a488bddcc7	5	ناعم	70
358e6ea6-5223-43b7-8efd-8710d1a4f796	6a1eaa1a-daee-4248-9aa9-0eed652bc343	1	حلو	95
407856a8-c7dc-4177-9580-b0112b01588a	6a1eaa1a-daee-4248-9aa9-0eed652bc343	2	باتشولي	85
e7b54c52-84a3-4640-945e-f66be53df216	6a1eaa1a-daee-4248-9aa9-0eed652bc343	3	زهري	80
8f96b6c2-7a0a-44c3-b665-eda55da99202	6a1eaa1a-daee-4248-9aa9-0eed652bc343	4	حمضي	75
1d4286d3-d24f-4b2c-b591-593f3bc3f545	6a1eaa1a-daee-4248-9aa9-0eed652bc343	5	دافئ	70
438244e9-45f0-4c2f-b961-ae62cc3463d7	e616f599-e026-469d-b89b-151d226f3e53	1	زهري	95
53b575d7-2061-4bcb-866b-95c934a6e193	e616f599-e026-469d-b89b-151d226f3e53	2	حلو	85
3a44a7b2-769c-4bf5-b9d0-b4a82b854992	e616f599-e026-469d-b89b-151d226f3e53	3	دافئ	80
8ba10485-8132-41b9-8503-83e392ab99b9	e616f599-e026-469d-b89b-151d226f3e53	4	مسك	75
f54239c6-00a4-4a5a-b07a-65a229049d48	e616f599-e026-469d-b89b-151d226f3e53	5	شرقي	70
6bc48f86-1498-4a62-9121-a5d6ee424510	1a3778e5-2d5c-49ca-bc30-6971c142dd90	1	زهري	95
e55c1b61-1d5d-4ffe-ae8a-8e81dd69b2ca	1a3778e5-2d5c-49ca-bc30-6971c142dd90	2	فواكه	85
024cb0a1-b467-458c-bf68-e0c64b3a08e7	1a3778e5-2d5c-49ca-bc30-6971c142dd90	3	توابل	80
09263724-7ef0-445f-9994-f5245fd137da	1a3778e5-2d5c-49ca-bc30-6971c142dd90	4	حلو	75
ccb14a05-09dd-46cb-ae37-10b18a089424	1a3778e5-2d5c-49ca-bc30-6971c142dd90	5	دافئ	70
ca675fbb-5751-40fd-8215-0c53eaabbe5d	710f4d3a-54e2-40b1-894b-461bd25408ec	1	حمضي	95
b6bf3705-189b-4b96-9048-b60ad2c08183	710f4d3a-54e2-40b1-894b-461bd25408ec	2	فواكه	85
c491e706-db2a-4a4e-806e-1c3b40ba60d5	710f4d3a-54e2-40b1-894b-461bd25408ec	3	منعش	80
4fc85d2d-54c4-450a-b010-6e8362518434	710f4d3a-54e2-40b1-894b-461bd25408ec	4	خشبي	75
de03b2f1-da89-49f3-b3fa-a460d22c8a0f	710f4d3a-54e2-40b1-894b-461bd25408ec	5	زهري	70
1a68aff2-690c-4933-aa19-d8a15530c04f	f874db57-7f97-4bdc-b2ca-e41134fcd67e	1	زهري	95
20c94e34-849b-4591-b523-d0ff496c42a0	f874db57-7f97-4bdc-b2ca-e41134fcd67e	2	فواكه	85
43845958-4816-45e8-946b-3886c7626eac	f874db57-7f97-4bdc-b2ca-e41134fcd67e	3	مسك	80
11a928d4-dfb8-40b8-8eb7-40f94923899e	f874db57-7f97-4bdc-b2ca-e41134fcd67e	4	فانيلا	75
f8d4ae71-1a99-4ee8-ba70-4cf20675d0f8	f874db57-7f97-4bdc-b2ca-e41134fcd67e	5	دافئ	70
f402c9f0-f23f-4f12-ac2f-845535cbbe74	84da58fa-0b61-407a-b718-025e11580a93	1	زهري	95
bb292a87-94d0-4bbc-a535-fc889f6acd0b	84da58fa-0b61-407a-b718-025e11580a93	2	مسك	85
9ff85d39-8384-44bf-af0a-98fb1a7ba43f	84da58fa-0b61-407a-b718-025e11580a93	3	منعش	80
a24d7cc6-4306-4383-b979-b3b79ea92d4c	84da58fa-0b61-407a-b718-025e11580a93	4	ناعم	75
a5de07c7-a7b9-4f6b-a845-4c3ccc4d671f	84da58fa-0b61-407a-b718-025e11580a93	5	حمضي	70
7ad1d5d9-8672-4d67-baec-87ff140f5185	3c96be3f-cf06-4508-8a57-05b69cd36d4f	1	بودري	90
0b1d8ab5-5e02-4c3e-b211-69a7b3e5c27d	3c96be3f-cf06-4508-8a57-05b69cd36d4f	2	مسك	85
f90210cf-a3ad-434a-864b-0a178e7fd747	3c96be3f-cf06-4508-8a57-05b69cd36d4f	3	زهري	80
1b742416-47f0-4e76-9638-5d647b44e9d3	3c96be3f-cf06-4508-8a57-05b69cd36d4f	4	دافئ	75
06e9238d-3909-4367-975d-0434cc9f3044	3c96be3f-cf06-4508-8a57-05b69cd36d4f	5	خشبي	70
fdf9289c-88b3-4389-9da6-384844067d07	c7e2a675-839e-4f75-96be-4414eafe4cd2	1	زهري	95
3a492d22-a65f-41eb-926b-c6ea1e8769a8	c7e2a675-839e-4f75-96be-4414eafe4cd2	2	بحري	90
91805825-2adc-4e9a-967d-6b106bc09484	c7e2a675-839e-4f75-96be-4414eafe4cd2	3	منعش	85
1b372822-d890-4c6b-9fe4-fa0a13dd7b1b	c7e2a675-839e-4f75-96be-4414eafe4cd2	4	ناعم	75
07679b61-1476-471b-992f-275847a3ef3e	c7e2a675-839e-4f75-96be-4414eafe4cd2	5	خشبي	70
0d73933b-0851-4748-aea8-26bfd93def42	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	1	توابل	95
861d5f96-fdb0-41e4-8a4a-ad37696be0cf	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	2	دافئ	85
2b611728-8675-45c7-9de5-9418a79d54b7	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	3	خشبي	80
0ba9810a-9a63-40a4-85dd-1928c39076cb	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	4	شرقي	75
6a8a7c95-8b9c-44cb-840f-2f3de3f717f0	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	5	جلدي	70
b7d4b108-73cd-47ef-afb2-004083915c9c	f0a75e56-d4da-429e-98b7-92d643d55138	1	توابل	95
e80d248f-1adb-4d73-90c3-4415ba84be4b	f0a75e56-d4da-429e-98b7-92d643d55138	2	خشبي	85
f53f89a4-19d7-4a89-9b7c-5a5f769e8780	f0a75e56-d4da-429e-98b7-92d643d55138	3	أروماتك	80
02d70a62-24d2-4e71-8ff9-303c85831162	f0a75e56-d4da-429e-98b7-92d643d55138	4	دافئ	75
b2fdc717-d9fe-4eea-810f-299189909252	f0a75e56-d4da-429e-98b7-92d643d55138	5	جلدي	70
031aabfe-dfe0-48d9-969c-746571040ae5	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	1	حلو	95
4a064283-d6d4-449d-b864-b53126dc36aa	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	2	توابل	85
2c78f45c-1639-4b04-b48f-7a0416f5217d	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	3	دافئ	80
d88763ac-536e-4973-b21b-3553c7147f04	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	4	أروماتك	75
172cf8ee-c7f5-4121-9b14-649843de6af8	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	5	خشبي	70
0782669b-2cf6-4018-82d9-0196b816ac8b	3f9b2867-b203-475b-85c5-e7faeb445d21	1	حلو	95
c563cc7e-486e-494f-aad4-8d757fb5fe03	3f9b2867-b203-475b-85c5-e7faeb445d21	2	دافئ	85
c857b12e-2d33-4d01-af26-c18fc413b8b3	3f9b2867-b203-475b-85c5-e7faeb445d21	3	توابل	80
1466b51b-df94-4e95-aaf3-e77440c4a25c	3f9b2867-b203-475b-85c5-e7faeb445d21	4	خشبي	75
2d7bdf21-cbae-4ee8-a29c-401fcab30971	3f9b2867-b203-475b-85c5-e7faeb445d21	5	أروماتك	70
5ef7911f-e3c2-4bcd-a464-a970b26482d9	6059c523-1080-40f7-85a1-059e006f4086	1	منعش	95
fd8b666e-6bcd-4d5b-bfb5-2167cb67c973	6059c523-1080-40f7-85a1-059e006f4086	2	زهري	85
3254d5d8-09da-4f05-aee1-26a96dfda186	6059c523-1080-40f7-85a1-059e006f4086	3	أروماتك	80
373b838b-3aa4-4d34-8050-7abba2c4a8cd	6059c523-1080-40f7-85a1-059e006f4086	4	خشبي	75
fba89180-80ed-459c-8f0d-4e504a7266b1	6059c523-1080-40f7-85a1-059e006f4086	5	ترابي	70
a8b49f84-9176-4d85-b593-e3bd098307ac	775919b4-f2a5-4d06-8a03-b75f8f322d6a	1	فانيلا	95
00f0d90c-e8f8-441e-87d5-e74dd29d4a3b	775919b4-f2a5-4d06-8a03-b75f8f322d6a	2	حلو	85
35e00e55-830d-407f-bebf-771b02c0d311	775919b4-f2a5-4d06-8a03-b75f8f322d6a	3	دافئ	80
c438c1cd-2c6f-443f-8b07-b3f511ef5328	775919b4-f2a5-4d06-8a03-b75f8f322d6a	4	توابل	75
2ed15ee6-a034-4a68-b8cb-665b2a14243d	775919b4-f2a5-4d06-8a03-b75f8f322d6a	5	خشبي	70
f2a2eadd-b8fe-4ebb-bd4c-2804dfd49915	1116477c-81da-486d-98a7-5e92c071c2e4	1	منعش	95
3fbc7650-17c2-4e3e-a42c-653ff1f78079	1116477c-81da-486d-98a7-5e92c071c2e4	2	فواكه	85
f433010a-6871-4a19-8164-a265a39f1a62	1116477c-81da-486d-98a7-5e92c071c2e4	3	توابل	80
c1ebe5dd-e79f-4508-88a4-cb40b46fb0c6	1116477c-81da-486d-98a7-5e92c071c2e4	4	دافئ	75
60471b93-6a14-42e6-9957-38546bb72cd7	1116477c-81da-486d-98a7-5e92c071c2e4	5	خشبي	70
a78a480f-380e-4002-9ad4-643b65fdcbca	83315f2e-fe15-4968-8917-05e6d7106235	1	خشبي	95
147b7810-a89f-4304-86ff-7b20d39c393a	83315f2e-fe15-4968-8917-05e6d7106235	2	أروماتك	85
92120679-4b9e-4907-ba23-585e03500415	83315f2e-fe15-4968-8917-05e6d7106235	3	حلو	80
9da76fed-75eb-4a4e-a81c-7df416fd35db	83315f2e-fe15-4968-8917-05e6d7106235	4	زهري	75
fe492871-a835-4c62-a7f6-8cba19d1d16e	83315f2e-fe15-4968-8917-05e6d7106235	5	ناعم	70
1234c6fb-5df5-44f2-819e-940e863f778a	b7a6b456-f7db-4152-849b-b3ff6487805f	1	منعش	95
080f9f55-cfca-488e-96d2-bc07674f869a	b7a6b456-f7db-4152-849b-b3ff6487805f	2	بحري	90
a205a607-945a-43fe-b392-6180f002d426	b7a6b456-f7db-4152-849b-b3ff6487805f	3	فواكه	85
9055137f-4c1a-4750-977a-cc1ff321021c	b7a6b456-f7db-4152-849b-b3ff6487805f	4	زهري	75
603bb71c-f0d5-461f-9c00-f37a403ae302	b7a6b456-f7db-4152-849b-b3ff6487805f	5	ناعم	70
e774dd88-c37d-4918-be2b-4061a4207abd	81d4b029-3dec-4b52-87f2-ff106b930076	1	حمضي	95
ca8e7428-fca8-4a4b-8831-8adb0b8332d4	81d4b029-3dec-4b52-87f2-ff106b930076	2	أروماتك	85
0b08d0c9-0b75-46fb-9744-8f522654e735	81d4b029-3dec-4b52-87f2-ff106b930076	3	توابل	80
3d46d20c-9cce-405c-8af4-6ea4a4d2b2fa	81d4b029-3dec-4b52-87f2-ff106b930076	4	خشبي	75
7605dd0e-24e2-4f1c-8d56-708239c49855	81d4b029-3dec-4b52-87f2-ff106b930076	5	ناعم	70
2e5b419d-a938-470b-bd4b-e0e348f14b17	135c0949-7a6a-4655-83bd-b5620476af5d	1	حلو	95
865b1a23-59fa-48cc-aecf-1d6b80258a14	135c0949-7a6a-4655-83bd-b5620476af5d	2	دافئ	85
7d47f696-a6a2-4caf-9bf9-23220d7246d3	135c0949-7a6a-4655-83bd-b5620476af5d	3	أروماتك	80
a240611b-e081-4706-a24f-76c3e935d34a	135c0949-7a6a-4655-83bd-b5620476af5d	4	خشبي	75
c30dff3c-2133-4961-86cb-57ac4bcf83fc	135c0949-7a6a-4655-83bd-b5620476af5d	5	ناعم	70
11452cbe-0d95-4394-9d04-1d1c25acbca1	131577eb-5549-4503-853c-f6aa2cc8fffb	1	زهري	95
78e4742f-6d6a-444e-be87-68aafb03dd8b	131577eb-5549-4503-853c-f6aa2cc8fffb	2	حلو	85
c332b145-38b3-4b13-973c-0a4db7867b7c	131577eb-5549-4503-853c-f6aa2cc8fffb	3	دافئ	80
821dc5e3-d26b-40c1-b9d8-e8fc168be195	131577eb-5549-4503-853c-f6aa2cc8fffb	4	باتشولي	75
651708fe-446e-4154-a7d5-7a3942ae1747	131577eb-5549-4503-853c-f6aa2cc8fffb	5	ناعم	70
c86529b1-b4d7-49fb-815c-eae004461581	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	1	زهري	95
d06d4957-e8ed-40e3-a06d-ad2896bb0cf6	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	2	فانيلا	90
f995935a-3c1d-4dc6-b114-a71c600e3b25	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	3	منعش	80
fdd7d11d-511d-4812-9bad-a2f2354237da	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	4	خشبي	75
fa504545-a4c1-4be3-a1b2-f303e1ce6a5c	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	5	ناعم	70
6b5e43bb-6a0d-4426-9597-88115c7a5872	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	1	منعش	95
66bb39dc-c541-46b1-b92a-ea996691d261	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	2	فواكه	85
2220976b-f059-4779-b089-27b8119367fc	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	3	مسك	80
87585309-214b-40a4-8708-0783fcbd133e	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	4	حمضي	75
cc4b1fa2-2a34-42e1-867a-e690c49a08b0	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	5	خشبي	70
0f37478a-d284-4500-943d-065c2c48820f	21e86815-37ef-4bb1-9723-d07f96aec3f5	1	حلو	95
383d77a6-1f0f-47fe-9ab4-372b07813b00	21e86815-37ef-4bb1-9723-d07f96aec3f5	2	جلدي	85
17cfb177-bfed-40ad-92ed-3e52de329d5d	21e86815-37ef-4bb1-9723-d07f96aec3f5	3	دافئ	80
e0009f57-6ea9-440f-b914-248dd33ab2ea	21e86815-37ef-4bb1-9723-d07f96aec3f5	4	خشبي	75
b9a41fa9-1241-42c7-b624-6b9ca35cd84e	21e86815-37ef-4bb1-9723-d07f96aec3f5	5	مكسرات	70
32ceeba1-d02f-402f-a210-914a7f50bc47	27e2641e-f3aa-472b-901c-fb9e6c121517	1	حمضي	95
b4f3c97c-a329-43c2-84b8-f82ddbc119e8	27e2641e-f3aa-472b-901c-fb9e6c121517	2	منعش	85
4c9cc0e3-4ba4-4f67-b249-a2ddc3b67713	27e2641e-f3aa-472b-901c-fb9e6c121517	3	خشبي	80
9096e915-7df1-4fed-b9a0-7a40fd797357	27e2641e-f3aa-472b-901c-fb9e6c121517	4	زهري	75
07fcdda3-c5ca-400c-b834-fa1ad2d24400	27e2641e-f3aa-472b-901c-fb9e6c121517	5	توابل	70
193a0519-80b0-4da2-bc47-a91d96989237	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	1	منعش	95
94089e37-b27f-437e-aa94-ba73082ff8d9	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	2	حمضي	85
6a61cfda-02b5-46b9-adf9-ec01bf8f5ce6	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	3	خشبي	80
3e14fce5-1e98-4677-a8f5-e3915d0b31d6	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	4	أخضر	75
3b775305-d36f-4506-a071-6e396dcdd40e	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	5	توابل	70
7f2474db-fda4-4998-b001-b210a9c05d21	76669643-f398-4d8c-950b-e87e91fcc5dc	1	منعش	95
da7c2368-cfd4-4863-bf29-ce8944ab0715	76669643-f398-4d8c-950b-e87e91fcc5dc	2	حمضي	85
fba06456-cad4-4eef-9386-a11a26e1aca1	76669643-f398-4d8c-950b-e87e91fcc5dc	3	أخضر	80
66cf91b7-5b4b-4e4a-88f5-a6b0b7327e68	76669643-f398-4d8c-950b-e87e91fcc5dc	4	خشبي	75
e962f0a3-1538-4be2-a6a1-07646d4ec60f	76669643-f398-4d8c-950b-e87e91fcc5dc	5	مسك	70
866c5dac-ed67-4593-b337-569bad415e3c	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	1	حمضي	95
cd7f321a-8f2b-4b5d-8345-b0c1f4d2e43f	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	2	منعش	90
f0f85934-8831-4194-ae13-891b23a6e1d2	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	3	خشبي	80
8aabe397-c39c-4030-a415-375056179482	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	4	ترابي	75
01fc8587-3af9-4544-af40-59fdd6288c42	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	5	ناعم	70
93a51d06-2860-4464-86f1-5c86845cc402	a1cdcec6-1029-41e3-be91-786a73345bb6	1	حلو	95
03680a7d-f230-4198-8b01-ed27454c6c99	a1cdcec6-1029-41e3-be91-786a73345bb6	2	دافئ	85
5bfaf818-b1ff-4f6a-8fd8-3a67d96d7016	a1cdcec6-1029-41e3-be91-786a73345bb6	3	أروماتك	80
42ac91c9-9e3a-4826-b7dd-7a874ac64631	a1cdcec6-1029-41e3-be91-786a73345bb6	4	شرقي	75
a05f17fd-cd74-4a02-ad98-80ee95df21b8	a1cdcec6-1029-41e3-be91-786a73345bb6	5	ناعم	70
89711d29-ed45-42ad-b1ec-861b0ad31e6d	e337df00-b9dd-4967-a845-0096a76ad289	1	أروماتك	95
83a92235-3817-4222-a27b-196cd20819f4	e337df00-b9dd-4967-a845-0096a76ad289	2	حمضي	85
2dcecbe8-e0d1-43ca-b6e3-2fe1466511c8	e337df00-b9dd-4967-a845-0096a76ad289	3	دافئ	80
00648eb0-666e-43f7-9022-18e3a40ee76d	e337df00-b9dd-4967-a845-0096a76ad289	4	خشبي	75
b9d063e4-c233-45dd-98ea-6a0fded65126	e337df00-b9dd-4967-a845-0096a76ad289	5	مسك	70
b37b80ef-19e8-4cab-9b11-3885d0ce700e	6fa838ee-ec16-4d7e-99ee-001963647cf0	1	أروماتك	95
7804cd42-3503-4dca-a2c0-6d80984afad0	6fa838ee-ec16-4d7e-99ee-001963647cf0	2	توابل	85
12a0f595-8502-4c1e-ab94-872cec5df461	6fa838ee-ec16-4d7e-99ee-001963647cf0	3	دافئ	80
21c313cf-f328-4083-9a32-27a37e3b9ab0	6fa838ee-ec16-4d7e-99ee-001963647cf0	4	حمضي	75
d4885385-4601-4d7c-98d1-b4238573a35a	6fa838ee-ec16-4d7e-99ee-001963647cf0	5	خشبي	70
96515294-a50e-45cb-92b3-13e46ab5ad55	ffa94942-4222-4270-962e-40340b6abbc1	1	حمضي	95
7b663e6d-97dd-4363-92ba-5d326655b39d	ffa94942-4222-4270-962e-40340b6abbc1	2	منعش	85
9b8ed861-8a1f-4acb-8919-c3007d019953	ffa94942-4222-4270-962e-40340b6abbc1	3	توابل	80
639cb79d-05d8-4169-a42f-5d0e8abfc48b	ffa94942-4222-4270-962e-40340b6abbc1	4	خشبي	75
abbd90be-63b9-4e05-8a04-b290ffa3dc69	ffa94942-4222-4270-962e-40340b6abbc1	5	مسك	70
91778d31-259f-4178-b275-7a74a665f061	aad91930-910d-46f4-82a5-e40f5d3cf0c9	1	حمضي	95
10b10ed5-1924-446a-9e19-e80f2f0faf49	aad91930-910d-46f4-82a5-e40f5d3cf0c9	2	زهري	85
bdfe71cf-e33e-45d7-b25a-5aca54964d59	aad91930-910d-46f4-82a5-e40f5d3cf0c9	3	منعش	80
e4047598-92ae-4816-8eb1-aab966303afa	aad91930-910d-46f4-82a5-e40f5d3cf0c9	4	دافئ	75
ccb3f3f3-4f8c-4036-b55e-2b1aa50b34fb	aad91930-910d-46f4-82a5-e40f5d3cf0c9	5	باتشولي	70
05bdf384-973f-4a63-b03e-cc993d98dd31	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	1	خشبي	95
77ad8e30-565f-45c7-a4ff-a479d0bedc99	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	2	جلدي	85
910bc4e2-6c91-4b8c-9b72-a24900bb982e	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	3	توابل	80
98672f81-19e4-4220-8a8b-fa9577fc59bc	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	4	دافئ	75
403ae883-911c-4f00-b6f0-ce3788948fc9	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	5	حمضي	70
8c5f60c6-8360-41ce-806f-c64534872fa7	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	1	منعش	95
a9669030-1982-4d36-9ae6-04afef69f02c	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	2	فواكه	85
7446fdbc-3f1c-48b2-812e-44278dc1b00e	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	3	أروماتك	80
2c35f4f1-80f9-43b5-974c-8d740b405bf6	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	4	مائي	75
9a19e0ac-e71a-44cc-9f7b-ba7905ef0ab0	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	5	خشبي	70
e38f8b4b-5b1a-4059-a14f-5e6c984c1718	0b47c2a7-881c-4371-a1b5-a4f61cf581da	1	حلو	95
16510fb2-9100-4bf9-8481-8334c64bbad5	0b47c2a7-881c-4371-a1b5-a4f61cf581da	2	توابل	85
beec6df7-5b87-437f-bf2a-b256bcca8be6	0b47c2a7-881c-4371-a1b5-a4f61cf581da	3	دافئ	80
2b71e79a-4a35-46a6-82bf-403dbead7b6b	0b47c2a7-881c-4371-a1b5-a4f61cf581da	4	خشبي	75
472dc41d-2def-45c5-9fe1-42d8622ae50a	0b47c2a7-881c-4371-a1b5-a4f61cf581da	5	ناعم	70
da83df05-4d77-4f2f-92ef-3574809c2296	3a198552-3977-46a7-9bec-cc0802770a86	1	أروماتك	95
e4de2c97-4cba-4a44-b0ab-b131ea890d46	3a198552-3977-46a7-9bec-cc0802770a86	2	حمضي	85
14b23b5d-c6c3-460d-869c-4f3f96a5dd5f	3a198552-3977-46a7-9bec-cc0802770a86	3	جلدي	80
2365f19f-965b-44ad-91e9-7d16595149a6	3a198552-3977-46a7-9bec-cc0802770a86	4	دافئ	75
0bd2e648-c425-4128-baf5-e057cba438ae	3a198552-3977-46a7-9bec-cc0802770a86	5	حلو	70
0ffe20b3-b35e-49a5-8091-8c3542427163	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	1	حلو	95
5c302e78-bd3b-4456-bf75-f873d8850bad	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	2	دافئ	85
99f4a7a3-5117-410e-98eb-77c938739a6d	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	3	فانيلا	80
5ce1a976-8187-4a87-9960-3d84be4166ed	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	4	أروماتك	75
5a59e266-eb4e-4333-81d2-7fee6a9dea27	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	5	خشبي	70
5a61d058-09a4-4c05-88c9-7a7f40af1b76	33fd7ff8-058d-4dce-9fd1-73325df504b1	1	خشبي	90
7e0fea2a-cfba-46d1-8739-2c585dc1128a	33fd7ff8-058d-4dce-9fd1-73325df504b1	2	توابل	85
256a5831-8cd7-452d-8348-698e61b4f6b8	33fd7ff8-058d-4dce-9fd1-73325df504b1	3	حلو	80
2566a50f-832d-459b-b13a-e33e9203c71e	33fd7ff8-058d-4dce-9fd1-73325df504b1	4	حمضي	75
73d46873-9af0-411e-81ce-e93b82521072	33fd7ff8-058d-4dce-9fd1-73325df504b1	5	فانيلا	70
4d0fb485-0df0-4825-9c90-6a7781829dfd	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	1	منعش	95
399ed7f5-383f-421e-9df1-01f0e04e5fc7	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	2	بحري	90
5b53270e-9fd3-4546-9311-7d165e017c45	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	3	جلدي	80
2ce85e37-4c46-43a3-92ad-58fc6a15e132	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	4	ناعم	75
76135188-925d-4e16-bc6d-d69834fad54f	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	5	مسك	70
b3d69787-0562-474c-bd44-c6a27b26e6b8	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	1	حمضي	90
974d634a-c853-4119-b398-aaa81eda80e1	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	2	أروماتك	85
0815cb05-9a02-4e01-a5f0-33d5f019b42b	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	3	حلو	80
3ee3c8d8-cfc9-43c1-9f34-8e78e1a9a77b	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	4	منعش	75
2e7b0ab0-d42e-446b-973a-294ae4e39224	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	5	خشبي	70
61b80bd7-936e-4e4a-9d4d-2922e300c365	c9b4438b-d77e-4678-8ea5-0986c8de862e	1	زهري	95
a0cf05cf-e90a-4a00-93fe-e9406b5d8863	c9b4438b-d77e-4678-8ea5-0986c8de862e	2	منعش	85
443e041a-a9eb-45b8-8801-3786881ca16e	c9b4438b-d77e-4678-8ea5-0986c8de862e	3	مسك	80
f2ae19f4-5e32-422e-be5e-3ea36db18f4a	c9b4438b-d77e-4678-8ea5-0986c8de862e	4	خشبي	75
738493ce-5692-40f0-86ee-21c7f765dd80	c9b4438b-d77e-4678-8ea5-0986c8de862e	5	ترابي	70
7b6af099-b753-4219-8a8a-7a3a6c28fbab	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	1	أروماتك	95
ee1ec9c0-7735-41ac-984f-c9088f4cc92b	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	2	منعش	85
80bff32b-1860-420b-a3d9-690505ce4824	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	3	حمضي	80
0e411a98-704a-4c11-83a9-7059d9cf7906	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	4	زهري	75
c7483c5c-21c4-4512-8d8a-a32dbc0f2e19	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	5	خشبي	70
4b3b1036-0e40-49ef-aea4-3d08cdfc7dd0	145289af-7463-4277-a429-6bf5c918586f	1	حمضي	95
510d646c-051a-4525-bc1f-e8af7f11371d	145289af-7463-4277-a429-6bf5c918586f	2	خشبي	85
12cc4bde-400b-40d6-be42-620b60f4bae8	145289af-7463-4277-a429-6bf5c918586f	3	منعش	80
f2b80d57-4005-4994-97af-f848430638d2	145289af-7463-4277-a429-6bf5c918586f	4	ناعم	75
3acf2737-3477-41e8-b007-c3deb13c4c7b	145289af-7463-4277-a429-6bf5c918586f	5	ترابي	70
72a6bbac-d94f-4872-a393-25fa2480ab73	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	1	حمضي	95
4898caca-9091-47bb-8206-75011eb6a8f8	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	2	منعش	85
081307bf-694f-4200-a48b-dfbe1cacd1c2	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	3	خشبي	80
60c18dbc-34a9-44b1-af37-c379bb550de3	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	4	توابل	75
a66c6644-576c-4fae-8814-32f0990b6661	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	5	بخور	70
e1029d27-680b-4f1a-98b7-4a6ba6907736	8241db8f-cd01-4e71-a0df-4be5525223fe	1	خشبي	95
8e10b6d7-a6f3-4933-bce5-7960b16a27cc	8241db8f-cd01-4e71-a0df-4be5525223fe	2	منعش	85
f7cec599-d423-46f3-9de2-9700040eb259	8241db8f-cd01-4e71-a0df-4be5525223fe	3	توابل	80
4c0a3d4d-c08c-41ab-a110-2a3a53ffb623	8241db8f-cd01-4e71-a0df-4be5525223fe	4	حمضي	75
2a4435fd-155f-474e-9c49-cc7c823d031f	8241db8f-cd01-4e71-a0df-4be5525223fe	5	ناعم	70
469c1554-1047-4dac-8711-76c65c02d97f	debb67da-79f1-487a-8b7e-3eea8acf835e	1	حمضي	95
4cddb547-3b31-439a-a304-c668a7225586	debb67da-79f1-487a-8b7e-3eea8acf835e	2	منعش	85
67b4269c-687d-47fb-a395-827fb98c89f5	debb67da-79f1-487a-8b7e-3eea8acf835e	3	بحري	80
11d5f28a-93d4-4d95-b453-df3f513b53e7	debb67da-79f1-487a-8b7e-3eea8acf835e	4	ناعم	75
4dd7a4c1-dde9-429c-9f37-af743cd43932	debb67da-79f1-487a-8b7e-3eea8acf835e	5	خشبي	70
31711829-572c-4287-b9d8-cf4410215aad	75c176cb-6188-420d-b64c-d60bce019552	1	منعش	95
8356c91d-2941-4be9-92e4-0e6edc84f3e5	75c176cb-6188-420d-b64c-d60bce019552	2	بحري	90
498e0790-7da6-483a-9fda-8f87908a2369	75c176cb-6188-420d-b64c-d60bce019552	3	حمضي	80
2c166682-aacf-4a11-a044-caea044317c2	75c176cb-6188-420d-b64c-d60bce019552	4	زهري	75
8230ca48-9a4a-4cec-874f-0c4034d1ff7b	75c176cb-6188-420d-b64c-d60bce019552	5	مسك	70
e8852b64-373e-4575-9eed-607eb30228bd	3b17c376-e2d2-494b-ae1c-e230803d688d	1	منعش	95
5fb6314e-53a8-42d5-81ce-3ee57a7a3942	3b17c376-e2d2-494b-ae1c-e230803d688d	2	فواكه	85
d18d4d65-4a4f-4014-bec7-071f08f65f65	3b17c376-e2d2-494b-ae1c-e230803d688d	3	أخضر	80
d79f4233-df3a-431e-8289-139d39474e56	3b17c376-e2d2-494b-ae1c-e230803d688d	4	ناعم	75
bac5cb34-a617-47c8-9f61-a9ed45a6dec2	3b17c376-e2d2-494b-ae1c-e230803d688d	5	مسك	70
623a3a1a-5012-47e6-8ec9-e606cde15c2c	7c6d2688-bd20-4197-8a29-7dbb5985b236	1	خشبي	95
9cdf3295-d156-4f18-8ba0-fec7103dda4b	7c6d2688-bd20-4197-8a29-7dbb5985b236	2	منعش	85
04aec934-4652-4928-aa03-8e336bc396cc	7c6d2688-bd20-4197-8a29-7dbb5985b236	3	مالح	80
d26b2e83-e0e3-422d-a057-3ba3d236d816	7c6d2688-bd20-4197-8a29-7dbb5985b236	4	أروماتك	75
b1d07a98-acb9-478a-8417-6bc44d31cf33	7c6d2688-bd20-4197-8a29-7dbb5985b236	5	توابل	70
3016131f-94e9-4746-8837-25274cf676b3	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	1	بودري	95
95d2d278-1f6a-4d1d-89f2-1ec9caea9e98	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	2	زهري	85
5a53bf76-4b8d-4c9c-afdb-b85eb9703129	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	3	منعش	80
6ea564b0-9f0e-4e10-9459-50c183341c28	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	4	ناعم	75
76116956-81e9-4b63-98f9-00e8c4b1b860	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	5	خشبي	70
2cfcaec5-85e0-457e-98de-fe6a10fc814c	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	1	حمضي	95
470a6a61-65e0-4683-b514-8489d8a435ec	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	2	توابل	85
95d8b657-0c18-4a39-ac72-f816b74e39a7	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	3	دافئ	80
6c863d12-7d19-4001-b21a-77daa5e507b1	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	4	فانيلا	75
d3749a8c-2aba-4450-91a1-f7e1d8dd00c6	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	5	خشبي	70
f53c1eda-ef74-4661-abab-b51284932f4b	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	1	حمضي	90
7bb97904-3cf3-427d-98f2-aa3304d40cd0	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	2	جلدي	85
3658c1de-2e30-4a8e-a8cf-ba43a375494c	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	3	زهري	80
af9c71c4-fb8d-4a0e-b197-a1db6d2cf645	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	4	دافئ	75
ab9bcef2-ec5f-4958-810b-cbb9e549dc2e	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	5	خشبي	70
6ce4da32-ae15-4ed5-a08d-cd4c7bc759f2	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	1	خشبي	95
ed19b70d-e9b0-4efc-98c8-49f8a92fe53a	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	2	زهري	85
87669c52-cd90-4fa1-abec-c34340f43d93	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	3	منعش	80
216c10c6-ac96-439e-b3b0-28d30c10f17d	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	4	ناعم	75
b4970779-bec1-486f-b39d-76fd2ec2e915	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	5	مسك	70
1e09cdaf-4013-4215-8912-800de455298c	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	1	حلو	95
06bbbe3e-106f-45d6-80fc-178924f9d0ea	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	2	شرقي	85
d47cc582-bbd4-47af-8ad4-f018d1cfd9cb	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	3	دافئ	80
51c0f4e1-b303-47d6-809a-18706bafcad8	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	4	توابل	75
ae3cf373-e7de-4462-bf42-5723373aa99d	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	5	ترابي	70
19164ff4-ef59-4d4a-bafb-08ff898bab35	4844ec82-0feb-4e33-95eb-f32cc0bba616	1	توابل	95
762ff98a-71ea-4f76-ae6d-d8b44c7d9676	4844ec82-0feb-4e33-95eb-f32cc0bba616	2	حلو	85
6ac5fb98-5572-410d-8ad3-95d85f305523	4844ec82-0feb-4e33-95eb-f32cc0bba616	3	دافئ	80
3fe3248c-3c3c-4496-9002-35f3421a8e2c	4844ec82-0feb-4e33-95eb-f32cc0bba616	4	خشبي	75
a6e276b3-25b5-4489-8e47-61ca0b634c73	4844ec82-0feb-4e33-95eb-f32cc0bba616	5	أروماتك	70
0d20689a-dc39-433b-97ca-dd7830cb5073	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	1	بحري	95
47d5d028-151e-48f9-9da2-c3b74335c04d	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	2	منعش	85
cdfd7b9b-2944-4185-a785-53d81eb83fc2	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	3	توابل	80
9141fe65-466e-4b12-abf7-9585e4d2d159	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	4	دافئ	75
2b816d99-e302-452a-8871-f22ba24c254f	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	5	خشبي	70
39d5c3fa-7cce-4224-b82d-18e1bfea8614	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	1	أروماتك	95
722648ff-c377-4a51-b992-cc64bffc2c37	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	2	توابل	85
26436ea2-5f4a-4193-88e8-4fb121c847b1	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	3	حمضي	80
e1af6c1a-548e-4a4a-9b86-0d6ca8172c50	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	4	جلدي	75
0534fb82-2642-4b6d-9333-186352bdeb27	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	5	ترابي	70
b590e17a-6a0f-4fa5-b6c9-ca92a7b486b2	52bead5d-2a56-47f3-991a-efa29d065eb9	1	حلو	95
4599be97-5336-40ea-a3b3-df44f5cc078c	52bead5d-2a56-47f3-991a-efa29d065eb9	2	دافئ	85
85aef3fa-31f4-4026-b495-5f19156bfe63	52bead5d-2a56-47f3-991a-efa29d065eb9	3	شرقي	80
86f94be7-5251-4c18-8844-aaa17793f458	52bead5d-2a56-47f3-991a-efa29d065eb9	4	أروماتك	75
f7875bd5-7554-4026-8bb7-95bbc58c33e7	52bead5d-2a56-47f3-991a-efa29d065eb9	5	خشبي	70
21788262-a38a-4160-826b-2d4263df98c3	828cd953-6202-4314-8377-610c699ac17a	1	منعش	95
8be282a0-34e8-4ff6-824f-e6ba066a130f	828cd953-6202-4314-8377-610c699ac17a	2	بحري	90
b57e4ff5-e959-4459-89d7-b934b85da959	828cd953-6202-4314-8377-610c699ac17a	3	حمضي	80
c23b45ce-890c-412d-a90c-2dfe7395ed94	828cd953-6202-4314-8377-610c699ac17a	4	أخضر	75
a3d99f45-9b8f-4f4a-b74e-7ab2fb44f823	828cd953-6202-4314-8377-610c699ac17a	5	خشبي	70
67b50e01-6844-4db2-99fb-68c661ce7606	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	1	توابل	95
7fc1070d-4afe-47e5-955d-bc3d1ed3f0e7	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	2	جلدي	85
f12ff5ed-d793-4329-8519-fe9ef4ff5b98	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	3	دافئ	80
f2703cc8-289f-4992-9977-c8097c575399	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	4	شرقي	75
7741aea6-fe46-4100-b890-05e6f1a3b806	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	5	خشبي	70
791eec29-845d-4572-ab65-37f89fa6002c	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	1	فانيلا	95
3f8922f0-4342-498c-b165-d9af7b477591	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	2	حلو	85
4b56d767-7699-49a3-8364-75ec85e15112	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	3	دافئ	80
f935b402-07fb-4931-b017-44b18fc95edc	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	4	شرقي	75
b387ff7d-76b3-4968-8d27-9401ed0112e0	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	5	أروماتك	70
63531362-9150-40e3-a75c-362c4986ea0f	3d99d65a-33df-4ebe-bc41-2ad546d6790c	1	أخضر	95
4d13e51c-263a-4f0c-bb72-9c3cbc64a686	3d99d65a-33df-4ebe-bc41-2ad546d6790c	2	توابل	85
3e91c0e7-9014-4f79-8743-8e8b4b9b5ec2	3d99d65a-33df-4ebe-bc41-2ad546d6790c	3	جلدي	80
296cdb99-b22e-45e1-902e-6d63b485e84b	3d99d65a-33df-4ebe-bc41-2ad546d6790c	4	خشبي	75
7ccac5b0-7db1-403b-abfc-7eb307b83cdb	3d99d65a-33df-4ebe-bc41-2ad546d6790c	5	ترابي	70
b449283b-ff61-4bae-97e8-12906b0eeb82	7041706b-03c9-4811-9e66-5f44df1e8c2d	1	حلو	95
0cccd74b-71fa-4e55-92bc-22a3536596d2	7041706b-03c9-4811-9e66-5f44df1e8c2d	2	فانيلا	85
849b77de-2a07-4040-990f-22667d0466c0	7041706b-03c9-4811-9e66-5f44df1e8c2d	3	دافئ	80
b6c89e6f-7650-44b4-85f1-fa9bb3b5f549	7041706b-03c9-4811-9e66-5f44df1e8c2d	4	توابل	75
0e58ffd6-99de-4d43-a1fe-ae035b67857e	7041706b-03c9-4811-9e66-5f44df1e8c2d	5	جلدي	70
d0e6c66f-a36b-4d39-9187-9897c2af2cb5	5deff441-fa44-45dd-b557-2bae4131ed87	1	حمضي	95
b2087812-c9e5-48c7-8a7f-bd647a7dc98c	5deff441-fa44-45dd-b557-2bae4131ed87	2	توابل	85
49fb746f-6eeb-41b3-890c-e7c81275e3b9	5deff441-fa44-45dd-b557-2bae4131ed87	3	دافئ	80
2683882f-a6e7-4712-b513-8658c43cf136	5deff441-fa44-45dd-b557-2bae4131ed87	4	خشبي	75
d9c91d39-59c6-414c-b050-ee917193a3a7	5deff441-fa44-45dd-b557-2bae4131ed87	5	أروماتك	70
7643f2f5-56ee-4277-af11-1eea1a5648c5	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	1	حمضي	95
625f6d50-5be9-4c33-8791-29958103a527	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	2	منعش	85
e149a6c1-9740-482b-8178-8913713733c5	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	3	توابل	80
b3ef3254-6508-457a-b166-25424b5f8238	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	4	خشبي	75
3350e2cc-f365-4315-8929-a01786f328ba	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	5	ترابي	70
967d7497-6a23-4d3a-b412-388cf05bbdde	a93d4a47-dece-48ef-9306-57f56fa499d5	1	حلو	95
1f8d8c19-fcef-411f-9991-4b7a9f33177b	a93d4a47-dece-48ef-9306-57f56fa499d5	2	توابل	85
d153bcee-745b-4a29-a068-3f3a544b0a24	a93d4a47-dece-48ef-9306-57f56fa499d5	3	دافئ	80
d7acb30d-9d09-4cee-9f8f-dab8e3d68560	a93d4a47-dece-48ef-9306-57f56fa499d5	4	شرقي	75
667da407-ce06-45ff-bb15-28eec699b848	a93d4a47-dece-48ef-9306-57f56fa499d5	5	خشبي	70
aca98824-ab44-45ee-8875-9625860cfdc1	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	1	حلو	95
eb7fd3c5-6bc3-4534-9785-b3630b3d55bc	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	2	توابل	85
a20514b9-a340-4834-98c6-353fe238d5ac	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	3	دافئ	80
cd7c4bf6-907c-4cec-82c1-bfb53528b284	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	4	جلدي	75
ee0abeb6-59bd-475f-8c2b-48f38f1dc70d	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	5	خشبي	70
9c4ff613-9e58-49a0-b393-6031edaf07f6	394f0f58-0cd2-4010-bc08-b18a16300fd1	1	فواكه	95
ed883041-94f8-45ce-9a52-4ddc9402df07	394f0f58-0cd2-4010-bc08-b18a16300fd1	2	خشبي	85
92c686cc-1469-4d09-b00a-b5146b331f71	394f0f58-0cd2-4010-bc08-b18a16300fd1	3	منعش	80
60d8ce34-aca3-4574-b708-b4287168c68d	394f0f58-0cd2-4010-bc08-b18a16300fd1	4	ناعم	75
15f03161-3b44-4d6e-ada4-fadf5e94de11	394f0f58-0cd2-4010-bc08-b18a16300fd1	5	أروماتك	70
2ca91771-3d67-43d1-87cc-5a70529b08ab	e946b50a-bb23-422f-901c-bc9834e0b9d8	1	حمضي	95
696d82fa-0d15-49cf-bb29-4215a614a790	e946b50a-bb23-422f-901c-bc9834e0b9d8	2	توابل	85
030a5464-4062-4a4d-9172-cfea966fab05	e946b50a-bb23-422f-901c-bc9834e0b9d8	3	دافئ	80
fbc5baa4-86cf-4182-ab06-b792aff01f38	e946b50a-bb23-422f-901c-bc9834e0b9d8	4	خشبي	75
30a3e215-f4b2-40ad-8569-b1bd1a3121f6	e946b50a-bb23-422f-901c-bc9834e0b9d8	5	ترابي	70
\.


--
-- Data for Name: ProductFamilyTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductFamilyTag" (id, "productId", tag_ar) FROM stdin;
\.


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductVariant" (id, "productId", volume, price, stock) FROM stdin;
8524a01f-cb0a-4e59-8f36-a940405bdaf9	0489881e-3909-4d95-9a70-56f03ca9d2b8	50ml	10000	30
b22d6f1c-c148-4e7e-9582-ff137e0315d2	16d29daf-79b9-42fb-964c-b50553900528	100ml	16000	20
00551b91-53da-43ea-9b41-67446e705c1f	16d29daf-79b9-42fb-964c-b50553900528	200ml	28000	20
d2144204-4920-43bb-a4e1-fdb4144bb0ba	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	50ml	10000	20
2af14f5c-cfe6-4aa6-b139-e5898546be3c	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	100ml	16000	20
71517b3e-bca2-4fba-be63-a9644e7392b2	fe518ee8-0974-4ce9-ab7c-2a2d259195b3	200ml	28000	20
a9e27fdf-e03e-47a9-889d-718fe079f6dc	f1a00606-4504-41f9-9b85-2a04a7f765a6	50ml	10000	20
2583597c-5084-46a6-b548-024e0848286a	f1a00606-4504-41f9-9b85-2a04a7f765a6	100ml	16000	20
027dbc49-5db6-4287-b4e8-d9a6d0731a95	f1a00606-4504-41f9-9b85-2a04a7f765a6	200ml	28000	20
edbf94eb-e6d2-4728-9762-a9b8863a5263	b40bad66-7413-4610-b365-72dffcc94600	50ml	10000	20
a9a46758-8afb-4f38-94c0-e5ecb91575af	b40bad66-7413-4610-b365-72dffcc94600	100ml	16000	20
49f7aa81-4478-45d9-aaa2-248e84739b8c	b40bad66-7413-4610-b365-72dffcc94600	200ml	28000	20
63982d91-3f3a-47c0-8088-6921634cb9e8	33b4dc2a-b042-4330-8113-fda43f07cd10	50ml	10000	20
9406260d-836a-4e24-8ec6-532493204d25	33b4dc2a-b042-4330-8113-fda43f07cd10	100ml	16000	20
0e70bbdb-0e2f-4ec9-b7ac-12b85327a31c	33b4dc2a-b042-4330-8113-fda43f07cd10	200ml	28000	20
cf15c15e-2529-4e15-a835-d1229fc22e59	1b719431-0f16-4095-b56e-c037998814aa	50ml	10000	20
d5108fdc-9dff-49df-83ef-4302998c229a	1b719431-0f16-4095-b56e-c037998814aa	100ml	16000	20
0dd92bc7-575f-488c-91d0-6706a8ac69ef	1b719431-0f16-4095-b56e-c037998814aa	200ml	28000	20
a1a17ee2-71e0-424e-9828-04dbf88310b3	0ece9262-5007-4fc7-959d-b6804cb359b9	50ml	10000	20
efb0020c-96fa-4a5e-a6e6-d83221f7e60c	0ece9262-5007-4fc7-959d-b6804cb359b9	100ml	16000	20
04554ae9-f5e8-487a-8bd5-b21006cb4377	0ece9262-5007-4fc7-959d-b6804cb359b9	200ml	28000	20
0707b410-c124-4ea8-b69d-8673edd93d82	df36fd9b-d366-4c34-a5fa-1199df68bb26	50ml	10000	20
6f14189e-7223-4848-9f87-b6dd1d1df04b	df36fd9b-d366-4c34-a5fa-1199df68bb26	100ml	16000	20
e95ee89e-549c-4c7b-a7d4-3706ff1e29ab	df36fd9b-d366-4c34-a5fa-1199df68bb26	200ml	28000	20
a0ea5359-0ec2-4ee6-afb1-1fc875366167	73d4130e-1c54-4d63-8249-4f129c97cd90	50ml	10000	20
e415508a-fe01-4b2b-9d29-291668f34a35	73d4130e-1c54-4d63-8249-4f129c97cd90	100ml	16000	20
b4d04fb6-9a88-4f48-bce2-f3445cba6651	73d4130e-1c54-4d63-8249-4f129c97cd90	200ml	28000	20
3b7689bc-97e7-45b8-b431-c54a75ffdfdb	a05ed06e-e57e-48f3-8e26-a861760bd2fb	50ml	10000	20
69c72784-0aa6-4bd1-a435-62e659017451	a05ed06e-e57e-48f3-8e26-a861760bd2fb	100ml	16000	20
7e8caddd-6f8e-4596-a7b3-7fb4c14da245	a05ed06e-e57e-48f3-8e26-a861760bd2fb	200ml	28000	20
d291e1cd-67b2-40b5-92df-5aecd9ed12e8	75ac202c-2415-48cf-ab16-a80f2e043943	50ml	10000	20
82066e89-9fa0-4e18-aaa3-04e54b996437	75ac202c-2415-48cf-ab16-a80f2e043943	100ml	16000	20
0587b1b7-3c83-436f-bb5b-6c8e6c77bd55	75ac202c-2415-48cf-ab16-a80f2e043943	200ml	28000	20
d24b73d1-5c47-4cce-8f90-f3471ebb2bc8	8abad596-27ef-4643-8d66-4842a06760d6	50ml	10000	20
a61628fc-2c9b-469a-ab69-92745df74d7b	8abad596-27ef-4643-8d66-4842a06760d6	100ml	16000	20
b140ccfa-73b9-4ee1-a0ae-6c7eeae3cae2	8abad596-27ef-4643-8d66-4842a06760d6	200ml	28000	20
5b53661f-d644-41f6-ab76-ba3c1486b11b	bed6484b-64cf-4785-9323-3805baed49a1	50ml	10000	20
9fddfadd-0d5e-4e1e-9c4c-8bc05487449f	bed6484b-64cf-4785-9323-3805baed49a1	100ml	16000	20
ca3baf02-8e41-453a-beaa-d97c0cd77e82	bed6484b-64cf-4785-9323-3805baed49a1	200ml	28000	20
bf726c21-f1c1-4efe-b075-844a42252905	d1b1746c-1ec4-4692-ae96-47e2aadee234	50ml	10000	20
883ba391-6a61-48c0-bdf3-f53f1328a4de	d1b1746c-1ec4-4692-ae96-47e2aadee234	100ml	16000	20
9c208b1b-fd77-48ca-a619-dabc5f87c839	d1b1746c-1ec4-4692-ae96-47e2aadee234	200ml	28000	20
f1acab12-433f-4cd9-b945-bc823b68be96	ff170f46-3d00-4500-9eb4-c137ecf3a31c	50ml	10000	20
0d910888-ba82-4344-811c-43cd9fe5352b	ff170f46-3d00-4500-9eb4-c137ecf3a31c	100ml	16000	20
459295bf-a47a-4f96-bb2e-aa0c8bb23190	ff170f46-3d00-4500-9eb4-c137ecf3a31c	200ml	28000	20
ad40f5b1-5501-47d7-9914-8f451512d29d	3c88b567-7ac2-44c7-8726-fa4902c0650b	50ml	10000	20
6c1d7c3a-882d-4182-89f2-f959355943c5	3c88b567-7ac2-44c7-8726-fa4902c0650b	100ml	16000	20
ff23f421-8023-4873-adac-dc3c780c9f41	3c88b567-7ac2-44c7-8726-fa4902c0650b	200ml	28000	20
c09ab4cf-28b1-4ff5-bedd-b2a2aaf811c4	7f1cb136-a5b1-4306-9704-62588862fbc2	100ml	16000	20
92231b70-f3a3-4596-900a-5518c82a09a0	3a63970f-150d-47d6-ada7-457c5eeac590	50ml	10000	10
3770dac1-9751-4884-8af8-9037cfcf4caa	3a63970f-150d-47d6-ada7-457c5eeac590	100ml	16000	10
a421f29c-e8b7-406d-ab67-aa9d625396b2	3a63970f-150d-47d6-ada7-457c5eeac590	200ml	28000	10
888b2ab5-7c92-42a0-a957-5f3615001b7f	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	50ml	10000	10
f8dd85bb-64f2-4466-9651-7f5eadaab36b	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	100ml	16000	10
569de15c-034a-40bf-9f78-234eaf825a5f	9175ac6c-b4ad-4ada-8062-9b1ccc096b17	200ml	28000	10
7a469995-8998-4e23-b96d-d742c1ce9a9d	4b07031f-9a4b-46b9-b02d-6ee759270535	50ml	10000	10
fd50482f-0e1b-48cd-b6a2-ba798e741bd0	4b07031f-9a4b-46b9-b02d-6ee759270535	100ml	16000	10
61aaca92-9446-41f3-a6c0-25263d3c58f6	4b07031f-9a4b-46b9-b02d-6ee759270535	200ml	28000	10
3404141d-34f4-4a5b-bb73-1c60ed00d12d	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	50ml	10000	10
55cfb12a-746d-4288-a9e4-0d344f380234	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	100ml	16000	10
815b0349-6f60-4973-886c-f08a764dd6fb	aaab530d-1a0f-4b87-ab0b-f1ff52ae6efd	200ml	28000	10
52a6670a-8f84-4ba3-bfce-ff5cd1c34adc	1904f302-353b-49a3-a3cf-a44a83900ef1	50ml	10000	10
79dac462-b4f8-46b4-b946-512580a4533c	1904f302-353b-49a3-a3cf-a44a83900ef1	100ml	16000	10
60642496-0cdb-46bc-bd85-4ded25b9ea08	1904f302-353b-49a3-a3cf-a44a83900ef1	200ml	28000	10
818f841e-9482-4e0c-8a72-8c1fb3d875db	8069c814-bcd5-4efd-bc8c-3b904c32fb05	50ml	10000	10
375b1452-41b2-411b-93e2-d0c828aa875f	8069c814-bcd5-4efd-bc8c-3b904c32fb05	100ml	16000	10
1dbc36ae-df04-4423-9698-ef6574f4c981	8069c814-bcd5-4efd-bc8c-3b904c32fb05	200ml	28000	10
f33ffbe0-a21a-46e5-a433-5d5fa6df8d2b	41bad034-f7d7-48d2-a4fa-06afd3822985	50ml	10000	10
7f265ec0-8982-4114-8b86-d1be843badf7	41bad034-f7d7-48d2-a4fa-06afd3822985	100ml	16000	10
2c3b03d8-c110-4cdd-b793-06cf2ac69658	41bad034-f7d7-48d2-a4fa-06afd3822985	200ml	28000	10
ec6d1494-b383-41e1-8f23-dc27998414f6	145322fb-82ad-4c59-97f4-f83351d153f6	50ml	10000	10
4e22d689-38fc-4e89-a8b3-818c5d8de446	145322fb-82ad-4c59-97f4-f83351d153f6	100ml	16000	10
9bdedd3e-28ba-4d3b-a06c-6d084a37ff53	145322fb-82ad-4c59-97f4-f83351d153f6	200ml	28000	10
e577b4a5-cb63-4da9-b68c-2d08fdb3ebfd	41a4187a-0678-44a1-93ea-12faf3f859ff	50ml	10000	10
8248f5e2-3a66-4421-b696-1da8ab314746	41a4187a-0678-44a1-93ea-12faf3f859ff	100ml	16000	10
965dd6d6-b30d-45e9-a210-0e8bffd6e485	41a4187a-0678-44a1-93ea-12faf3f859ff	200ml	28000	10
3a6ba5fd-03df-4c4a-bab4-6106fe1bb68d	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	50ml	10000	10
6a19a36b-10c4-4f59-a164-5249cc8fbc02	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	100ml	16000	10
f87e82a4-2282-4561-b46d-677ee18a89b2	5fe9c1d8-7480-425d-9933-a76dd1e61e0f	200ml	28000	10
eac1bf68-dc6b-4c63-86d5-68b24f2bcb35	89b49afd-1edc-47a0-a281-b7c66a7174d8	50ml	10000	10
a0f30daf-c31f-4006-8317-4663c2bf4312	89b49afd-1edc-47a0-a281-b7c66a7174d8	100ml	16000	10
01ecd4a5-22cc-4193-b692-df35ab83b6c3	89b49afd-1edc-47a0-a281-b7c66a7174d8	200ml	28000	10
8629fec0-8a24-4df6-8788-80f9328c9d12	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	50ml	10000	10
6d998a79-2815-4c69-b5be-97274a47cbba	f8d86061-8839-4601-ba76-588935717299	50ml	10000	10
e6da40e8-2859-4e15-8e11-a86d2d68688a	f8d86061-8839-4601-ba76-588935717299	100ml	16000	10
927e2923-66db-4f6f-97e6-74ef0300680e	f8d86061-8839-4601-ba76-588935717299	200ml	28000	10
71d7ec95-8d98-4c63-b6b2-a4b6eda7dc18	0dc3136c-29dd-4108-8a0d-3ea7475a998b	50ml	10000	10
5dd1bc3e-0488-4dac-81ee-cda58d962f21	0dc3136c-29dd-4108-8a0d-3ea7475a998b	100ml	16000	10
0fba2573-80ca-40f6-88e5-41582680835a	0dc3136c-29dd-4108-8a0d-3ea7475a998b	200ml	28000	10
4e50bcf7-978a-4b5d-8c5f-5cf4830f4b02	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	50ml	10000	10
25ada572-05c1-4606-80bc-66e81fde2531	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	100ml	16000	10
321b49e8-b61e-4ffe-bcb6-8290b8f780be	d59d095c-d4e2-4ccf-b856-a8752b4ad13c	200ml	28000	10
1da8a50c-808e-4dcd-ba1e-f13dfee17252	1c8ae757-4400-4989-ac57-d7a488bddcc7	50ml	10000	10
03dba8d2-b51f-4aa9-8c7f-63ca5ad0d22a	1c8ae757-4400-4989-ac57-d7a488bddcc7	100ml	16000	10
f2e5efd3-5a2d-4a56-9599-016f41bfeaab	1c8ae757-4400-4989-ac57-d7a488bddcc7	200ml	28000	10
762cfe82-9e97-49c5-845f-b1622e7373aa	6a1eaa1a-daee-4248-9aa9-0eed652bc343	50ml	10000	10
d3259d75-b7f6-4a64-995f-5d6e6d0f64dd	6a1eaa1a-daee-4248-9aa9-0eed652bc343	100ml	16000	10
a2735fff-bd21-4a73-b51c-6fdcf5774554	6a1eaa1a-daee-4248-9aa9-0eed652bc343	200ml	28000	10
08a90f57-04cf-4573-b504-e530705c95eb	e616f599-e026-469d-b89b-151d226f3e53	50ml	10000	10
cf52399f-872f-426a-a8ff-eb05b6a96a58	e616f599-e026-469d-b89b-151d226f3e53	100ml	16000	10
795f45ed-733f-433f-87c2-2edfbc3f3e74	e616f599-e026-469d-b89b-151d226f3e53	200ml	28000	10
2c817f63-c1e9-4509-a02b-c2c5bffa3334	1a3778e5-2d5c-49ca-bc30-6971c142dd90	50ml	10000	10
e1ff2b67-6d24-45e9-9b1a-1c65f7a03e0f	c5c96781-0c85-4e34-aba6-f68cd878276e	50ml	10000	10
8a79fc7a-e77e-466f-a957-4c926c589c78	c5c96781-0c85-4e34-aba6-f68cd878276e	100ml	16000	10
a4de2d4e-e0b4-46d4-926d-6cffefeed62b	c5c96781-0c85-4e34-aba6-f68cd878276e	200ml	28000	10
7f3a0954-fac4-4583-a89b-728974b30e9f	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	50ml	10000	10
acb5989b-6895-4188-a87a-7d9b15d32b39	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	100ml	16000	10
4f48e3c6-ab2c-49d5-bc60-f9711db1c8e9	6f43ed94-2970-4f6e-8e58-4b1a7049b47a	200ml	28000	10
0909424f-f15f-4bcb-baba-cee237a1ef90	ede67ea9-e0e5-4e77-8841-b0504adc7f91	50ml	10000	10
d8c0f35f-b48f-465b-9b1f-27047f05b31d	ede67ea9-e0e5-4e77-8841-b0504adc7f91	100ml	16000	10
4fd42397-c0be-4949-a31e-4184001a32e4	ede67ea9-e0e5-4e77-8841-b0504adc7f91	200ml	28000	10
6552629d-e662-43b7-babf-79b1f48843eb	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	50ml	10000	10
264775f6-d122-4133-b69d-0480db15cc45	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	100ml	16000	10
dbfe3428-8d2c-4d70-88f8-13017fcc5957	b23c8016-75ac-4fc5-b0dc-2a828b6d6071	200ml	28000	10
9e7c3d5c-011f-4aaf-b48a-a81e3dcbc694	f0893160-9afd-4796-a6ae-f7eb69e3539a	50ml	10000	10
3fc27687-f963-47d4-9059-7df19198f8be	f0893160-9afd-4796-a6ae-f7eb69e3539a	100ml	16000	10
5c3b8049-0429-4e21-9f45-76c55685994b	f0893160-9afd-4796-a6ae-f7eb69e3539a	200ml	28000	10
14438fd5-763c-4855-b631-3fd406ab9359	dbcd7aa8-c953-40fc-9397-cd6e82970408	50ml	10000	10
9633d3b0-4f57-4304-b2eb-6890d87f37f9	dbcd7aa8-c953-40fc-9397-cd6e82970408	100ml	16000	10
688ee0bf-deca-4643-8951-6294418cee3d	dbcd7aa8-c953-40fc-9397-cd6e82970408	200ml	28000	10
b989a3d5-0bbe-4c71-80e0-33ca6a8ba798	3dc58dd7-9617-4636-9d21-20b318a02125	50ml	10000	10
3fecfaa6-b847-46a1-a436-42f4a9443606	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	50ml	10000	10
32fb0e84-547b-4290-8e75-c25a35bf4945	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	100ml	16000	10
7001cfdc-d920-447f-9418-8d11cbb3da15	4633e3e4-c6e8-40a6-8e76-200f96f00d5f	200ml	28000	10
27f4f8be-8cc4-475f-aef2-546436fb6bc6	67aca763-e6a4-4936-ab6f-bbc99de5558f	50ml	10000	10
0183553c-5c74-4af6-a869-bc9488c35dc4	67aca763-e6a4-4936-ab6f-bbc99de5558f	100ml	16000	10
1295f0a1-bfb0-4da5-ba09-3b090655fe65	67aca763-e6a4-4936-ab6f-bbc99de5558f	200ml	28000	10
31012822-4308-44e9-8f4f-942084e58e2b	d428176a-216a-4231-b4d7-acb249438281	50ml	10000	10
9d839d5f-00ed-4c26-9a8d-a12d4b3aa579	d428176a-216a-4231-b4d7-acb249438281	100ml	16000	10
c74a497c-95ce-459e-ab33-e2d09b74d49a	d428176a-216a-4231-b4d7-acb249438281	200ml	28000	10
200fdb69-20a4-40d8-9dfb-3d1b4babe435	42517512-0290-480f-9a2c-7f0ae2f7c7d3	50ml	10000	10
14227aa1-a7ea-4c96-a432-b9681e1b2267	42517512-0290-480f-9a2c-7f0ae2f7c7d3	100ml	16000	10
56e029ba-7159-4d96-9c27-885125ca3b1c	42517512-0290-480f-9a2c-7f0ae2f7c7d3	200ml	28000	10
8abe9e34-cb82-40fe-bddc-26d2b3fb9c08	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	50ml	10000	10
d6fdd0d2-1403-4202-b712-f27a039db42a	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	100ml	16000	10
fe5986a1-2204-4bf5-92db-9c29caa0abe2	68c6acba-e4a4-46a0-99cc-f3f1547d0acd	200ml	28000	10
f3132ef3-fa73-4758-8428-422001c431f2	52969a79-f71b-4494-baa5-f0f72b8362a5	50ml	10000	10
3aef72b1-4dd0-41bb-8530-63d95148038f	52969a79-f71b-4494-baa5-f0f72b8362a5	100ml	16000	10
75095342-10bd-4950-8e05-265446fc28e5	52969a79-f71b-4494-baa5-f0f72b8362a5	200ml	28000	10
d15eee85-b2a7-4fc8-8596-52c2d446ce03	778e0606-669c-4c18-8e9f-55043d1115f0	50ml	10000	10
85fbad11-382d-492d-bb9c-0011d755c8eb	51793003-ac19-41aa-801e-2d656912435e	50ml	10000	10
6ee79276-fbff-4da9-b516-06ce9ecd05a4	51793003-ac19-41aa-801e-2d656912435e	100ml	16000	10
3874f236-45ab-45b8-9440-520e01fe649c	51793003-ac19-41aa-801e-2d656912435e	200ml	28000	10
bb79cace-cfb4-4266-ae16-0e651be3280f	96114e09-ae93-454e-89fe-ac9abff3ccd6	50ml	10000	10
f984223a-d56d-4753-8ddc-18a2b2c8b822	96114e09-ae93-454e-89fe-ac9abff3ccd6	100ml	16000	10
9a2985ff-167f-4939-a3b3-84c7393c25a6	96114e09-ae93-454e-89fe-ac9abff3ccd6	200ml	28000	10
f99f5128-f0c2-4ba4-aac7-60ab2e78481c	acdf7fe9-649c-4462-ad02-38097659151d	50ml	10000	10
5fd9ee7b-22c1-4263-8252-5546981fa925	acdf7fe9-649c-4462-ad02-38097659151d	100ml	16000	10
173558ca-2c72-4a4f-9dd0-2c99ba7ed0fd	acdf7fe9-649c-4462-ad02-38097659151d	200ml	28000	10
0bf6ec1d-5098-4a31-97ff-5881439e9d4c	4946e917-e9b2-4d63-a63c-96526efcffae	50ml	10000	10
10dc4aee-a2b6-43ce-94ce-f4a817824727	4946e917-e9b2-4d63-a63c-96526efcffae	100ml	16000	10
ec635ef5-0767-4e72-b149-2ec2dd8c73be	4946e917-e9b2-4d63-a63c-96526efcffae	200ml	28000	10
8df5b6e7-24fc-4154-97d5-c5be53ff7b6f	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	50ml	10000	10
3dc75038-0c9d-4dc0-a4c9-28203e2bf4f1	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	100ml	16000	10
ab5685cb-00e3-4f53-8668-c7c2b6a9adcc	e9c7a831-8c6e-44b2-a0c6-2f2c7725156c	200ml	28000	10
4d075027-2b1d-4061-b184-96df1a49342d	228cab4e-f472-4d7a-8378-a31d69d6c1c0	50ml	10000	10
764946e5-e9cb-4585-a6ea-d61332e34e66	228cab4e-f472-4d7a-8378-a31d69d6c1c0	100ml	16000	10
68fd0557-04ba-49e7-90cc-00473e457703	228cab4e-f472-4d7a-8378-a31d69d6c1c0	200ml	28000	10
89bccc88-eab9-4d6f-b261-be25e372b681	53d206c0-c23e-4dd3-a128-783b456c7717	50ml	10000	10
3ae5dd5e-0df5-4f9b-bffe-d939c6858ce6	1df1bf29-393a-4a74-900b-711f93f278cd	50ml	10000	10
1e21ac16-5028-4401-bc5b-8637b29ff9eb	1df1bf29-393a-4a74-900b-711f93f278cd	100ml	16000	10
b1cf80cc-5170-4e1d-8d29-d24ec0c3a878	1df1bf29-393a-4a74-900b-711f93f278cd	200ml	28000	10
c0e5481d-1b47-4dea-a02b-7f955d8bd90a	84981eb1-6893-4085-9c0d-58fef95b3333	50ml	10000	10
268d77a0-3461-4808-9c26-ab2fa143144c	84981eb1-6893-4085-9c0d-58fef95b3333	100ml	16000	10
1b61029c-79d0-4703-9b3d-01a066a3fdc1	84981eb1-6893-4085-9c0d-58fef95b3333	200ml	28000	10
8f775663-662e-4688-ba96-7cf2e7d2c0b2	91c7b155-374a-44ab-8f3c-dfa7ad66a823	50ml	10000	10
0ae32c33-f8a4-4a43-81ee-a3b04677a461	91c7b155-374a-44ab-8f3c-dfa7ad66a823	100ml	16000	10
6f704bf2-e819-4072-ac56-d9d80e567335	91c7b155-374a-44ab-8f3c-dfa7ad66a823	200ml	28000	10
2befa550-6d7e-4cac-acda-27ebecf44636	2035fc62-bb44-415b-93a3-664bf0317667	50ml	10000	10
7c47c21c-dfbd-4141-8618-fb6820688d23	2035fc62-bb44-415b-93a3-664bf0317667	100ml	16000	10
44bd2d82-e6b3-40b2-bb96-82c928b0edfa	2035fc62-bb44-415b-93a3-664bf0317667	200ml	28000	10
18424265-356d-49fd-85e8-97284ac570b9	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	50ml	10000	10
e50bc514-95d6-42be-9a75-b803f912d23d	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	100ml	16000	10
555652bf-85fd-422f-98ee-ddd9aa347491	c70b7432-e4af-4b5f-b677-ff2fc03b5a34	200ml	28000	10
5284e4a7-f255-41e7-8eb3-c2e0526296e5	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	50ml	10000	10
c34cbeac-152a-4cd4-b7f6-1a7ee1b4073b	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	100ml	16000	10
cdb381a4-b4f1-4d29-b899-f354298d9de4	44e5cc25-c5c0-4fa4-b503-2e4865d1213b	200ml	28000	10
197bd263-abc6-4402-a75f-45e1df795ab5	c48de798-90ac-46ab-8a7d-ce383a9b5197	50ml	10000	10
42aa9d95-a7b5-4bce-8ad4-156e1914c03f	39b3ece3-13cf-4797-9c65-45fe96c50d8a	50ml	10000	10
cd3d24c2-b72c-49c8-877e-e0f7e976179d	39b3ece3-13cf-4797-9c65-45fe96c50d8a	100ml	16000	10
b0341a23-5239-4aa8-90f1-eb0fff4de79b	39b3ece3-13cf-4797-9c65-45fe96c50d8a	200ml	28000	10
86cd3f59-dd28-4fba-8c93-a5fdee88c2b0	d9f8b7eb-47a6-489f-95f6-237cf032065d	50ml	10000	10
f0579ffe-5e25-4f80-992b-7ce91d7466d7	d9f8b7eb-47a6-489f-95f6-237cf032065d	100ml	16000	10
233c2f02-2d1a-475a-9592-28dd4a4fde8c	d9f8b7eb-47a6-489f-95f6-237cf032065d	200ml	28000	10
e229a96f-cde6-4dca-9cad-0b732a6eab66	c5e324d5-ca7a-465e-936f-69e4a46381bd	50ml	10000	10
0a235ba7-bcad-4354-8997-b38ece2d493d	c5e324d5-ca7a-465e-936f-69e4a46381bd	100ml	16000	10
bf09bb05-9ec3-42eb-99bb-6ac630595a76	c5e324d5-ca7a-465e-936f-69e4a46381bd	200ml	28000	10
eacd943e-6d3e-448b-879c-cafe17bbfc07	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	50ml	10000	10
521f62eb-e6e6-4d9c-9aea-5eb646b3afcb	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	100ml	16000	10
23c89f93-5384-4f9b-90e4-873c14caa99c	de6ac8ca-fdb0-4bfb-8bc0-c4578a640495	200ml	28000	10
7e409705-dbd9-49f1-bf91-d683bbc42bab	b81ab7be-a94d-4d56-a26a-b09569353a37	50ml	10000	10
514d7909-05c9-4574-a4ab-3287440d4307	b81ab7be-a94d-4d56-a26a-b09569353a37	100ml	16000	10
f3beb5b4-4ec6-4f67-910b-5940ba3203e6	b81ab7be-a94d-4d56-a26a-b09569353a37	200ml	28000	10
b8de7b1b-a8f3-4a5a-813f-880cf54c7258	d5e13d3f-4976-4654-9ee1-4b7481113f8a	50ml	10000	10
77846f7c-530e-40e4-9468-1330c06d431e	d5e13d3f-4976-4654-9ee1-4b7481113f8a	100ml	16000	10
b7ea7fcf-818f-4ac1-b063-6c8de8a7efc5	d5e13d3f-4976-4654-9ee1-4b7481113f8a	200ml	28000	10
0811a245-9f4b-49ae-8ac6-cc7aa3f0819b	94bab4ad-8004-4231-a575-05d4778d1b31	50ml	10000	10
1ad2fcc2-c469-4dd3-abfd-71a137cba0e6	6192fe95-e612-45fd-820e-c6e7ec3ebe20	50ml	10000	10
72ff7752-fe80-4ba8-b301-2dc14e1c62c4	6192fe95-e612-45fd-820e-c6e7ec3ebe20	100ml	16000	10
c9f938df-da0c-466f-bbf9-286acb54810c	6192fe95-e612-45fd-820e-c6e7ec3ebe20	200ml	28000	10
55da9522-a55a-4ab6-bf75-385a5b5da6f5	f1f94b0e-2997-4c2b-b542-7dc1873f2223	50ml	10000	10
96fb3662-1289-4d78-8257-4dc6fbbc3f77	f1f94b0e-2997-4c2b-b542-7dc1873f2223	100ml	16000	10
c52b2ea9-32f1-42ae-bc79-3646bfd101b4	f1f94b0e-2997-4c2b-b542-7dc1873f2223	200ml	28000	10
12c4dee6-86d5-48fa-ba45-a228ae05d0ed	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	50ml	10000	10
118dda34-fd70-4c5a-af30-a212222d05b4	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	100ml	16000	10
31caba43-8f74-4ae6-84e8-ffa77e3592aa	f5e1b36b-ff80-4201-81a9-f7fd6573cf2b	200ml	28000	10
baee3470-0d8c-4c67-a44f-3d0ecf96dea8	68d2a14a-45bb-47a3-b756-cd30710c6ff3	50ml	10000	10
07a015fd-5211-49f4-9a0c-ba68fcbe80ea	68d2a14a-45bb-47a3-b756-cd30710c6ff3	100ml	16000	10
ae272b13-8ab1-4a83-be92-e6f1a124070c	68d2a14a-45bb-47a3-b756-cd30710c6ff3	200ml	28000	10
74fcad63-27a6-45de-bc3e-cdc3796a8599	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	50ml	10000	10
8e88749a-2e23-48ba-b8dd-d0c4eb3806fb	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	100ml	16000	10
2be0efb3-6851-4b1c-a467-c7a39c2eac1c	4ea8bb24-7ec1-4c34-b4dc-b08985addb07	200ml	28000	10
843f26d7-1efc-4405-800b-b5b90c2889c4	5c23ac7f-336a-411c-b5bb-f436e407e8e3	50ml	10000	10
8e2456aa-0115-4d07-b244-d1c9a7be0e09	5c23ac7f-336a-411c-b5bb-f436e407e8e3	100ml	16000	10
1e76eab3-ff02-4f1b-8bea-7b57b45d6d6c	5c23ac7f-336a-411c-b5bb-f436e407e8e3	200ml	28000	10
47a15b52-ebcc-4c79-807f-15b92d1ae204	c6dbb337-65ba-4360-8e98-483939d0faf0	50ml	10000	10
19a3ceb2-146a-473a-84a6-f09c421cd46d	c6dbb337-65ba-4360-8e98-483939d0faf0	100ml	16000	10
ec89cf83-d576-4d5f-a833-b0ed7fd8d7d4	c6dbb337-65ba-4360-8e98-483939d0faf0	200ml	28000	10
36d69d98-299e-45da-947d-9da743e5643e	3d9de990-655a-412f-a171-2e99c9ec7a98	50ml	10000	10
0c166f51-2343-47c6-8287-ab51c74a3e43	fb958e6e-1940-4631-9f05-f62028159987	50ml	10000	10
125669b3-1019-4dfb-b968-4774d6d73def	fb958e6e-1940-4631-9f05-f62028159987	100ml	16000	10
708eccaf-a519-4c8e-ad83-d3b50ab1c272	fb958e6e-1940-4631-9f05-f62028159987	200ml	28000	10
d3fe6c18-0647-4efb-854e-d27a751598b8	15553f08-c40c-4fd8-a166-4194e9075710	50ml	10000	10
ad91764a-059f-4891-8f2b-c7275e591efe	15553f08-c40c-4fd8-a166-4194e9075710	100ml	16000	10
166ec740-4de4-406b-93ea-523dfb12ecbf	15553f08-c40c-4fd8-a166-4194e9075710	200ml	28000	10
a5ab32f5-6e5c-4590-b9fc-8f8e0aceed49	20f4be9a-51ee-4756-9a64-79ded422babf	50ml	10000	10
37bae881-2659-4172-a37c-cf210412a63f	20f4be9a-51ee-4756-9a64-79ded422babf	100ml	16000	10
9b4be026-0359-4dc7-b5cc-091b60cf552d	20f4be9a-51ee-4756-9a64-79ded422babf	200ml	28000	10
68ce2ea4-0347-43c6-8d36-6e67d1d2aef7	8034090e-58ec-4514-8d62-82443952fc15	50ml	10000	10
abd7982e-9c74-4be1-9bbc-95e8f7566d1e	8034090e-58ec-4514-8d62-82443952fc15	100ml	16000	10
d2dd0efd-97b0-4d80-acda-f86ceca5eda5	8034090e-58ec-4514-8d62-82443952fc15	200ml	28000	10
bfe6fb03-1247-4766-91dd-32b60fe818e3	e6088ba1-617f-4822-adf8-97b3d2768da4	50ml	10000	10
8732b7bd-9cbd-4e6e-ad02-387848cdac80	e6088ba1-617f-4822-adf8-97b3d2768da4	100ml	16000	10
bdfbb3fb-1ad9-45bd-bd08-7fe6116d5a4a	e6088ba1-617f-4822-adf8-97b3d2768da4	200ml	28000	10
642dfbd2-f799-43d4-a2ec-7c87e2bdebb8	1bc47f29-3bd9-4148-9a23-03bb30709767	50ml	10000	10
92505733-3a77-445c-9ba5-73a8c5ae64db	1bc47f29-3bd9-4148-9a23-03bb30709767	100ml	16000	10
66638541-a6f9-40df-94f2-55051caf02c8	1bc47f29-3bd9-4148-9a23-03bb30709767	200ml	28000	10
86bc791f-a41c-4517-abd8-6fc2a91aa81d	2f8c8b6e-15d2-4b93-921a-7a56783b1152	50ml	10000	10
9ac3d3f0-64ad-43f0-8c99-6dd4ff9d895d	2f8c8b6e-15d2-4b93-921a-7a56783b1152	100ml	16000	10
5c7bb9a6-61ae-4ed2-a947-1fb9214be86d	2f8c8b6e-15d2-4b93-921a-7a56783b1152	200ml	28000	10
08a1c3b3-2d2b-4277-84cd-0b76642bda45	ec28cc53-46cd-4045-b86f-f6275b30ddb2	50ml	10000	10
91a865ac-90e8-48d2-98fc-cad68c59c991	ec28cc53-46cd-4045-b86f-f6275b30ddb2	100ml	16000	10
c4de2aca-688b-4348-bca6-cc3ed4086503	ec28cc53-46cd-4045-b86f-f6275b30ddb2	200ml	28000	10
2f268dce-b388-4fc8-9999-513383bc3758	0b92632c-950d-438d-bc32-27876a5e0583	50ml	10000	10
54c3a583-07f3-48a7-9aab-36d1ee388c10	0b92632c-950d-438d-bc32-27876a5e0583	100ml	16000	10
9861662c-3172-48d4-bf0e-c987f41330d3	0b92632c-950d-438d-bc32-27876a5e0583	200ml	28000	10
6b881cd9-fce7-4f34-a37c-f56268ded6af	0b47c2a7-881c-4371-a1b5-a4f61cf581da	50ml	10000	10
9507d442-11c3-4624-a4b5-025ebeb084bb	0b47c2a7-881c-4371-a1b5-a4f61cf581da	100ml	16000	10
b0712ebe-b9ef-4b4a-9dd7-3fe0d0d17047	0b47c2a7-881c-4371-a1b5-a4f61cf581da	200ml	28000	10
9b78ffc9-450b-40d3-b8cc-b992bf5960a5	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	50ml	10000	10
533c6be1-1aaf-45b3-a5a2-f8b48b452c7b	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	100ml	16000	10
eeee42bc-77c4-4f62-99d2-bec19763e36e	988e846e-c8f4-4b41-a7e7-9a0c1f9d41e4	200ml	28000	10
0781ba79-c868-4794-bbb8-d47ee6f41b97	0fd5d982-5b25-445c-a0d9-2e085919bf83	50ml	10000	10
3e5dd240-9da0-4a95-ab43-4ba4c29b0044	0fd5d982-5b25-445c-a0d9-2e085919bf83	100ml	16000	10
27982501-c638-4727-8752-1c8036f2eea9	0fd5d982-5b25-445c-a0d9-2e085919bf83	200ml	28000	10
fcaafe54-ade0-438b-83b8-240d7129032f	ca089290-93aa-4fd2-ab79-7b77e9c040cc	50ml	10000	10
ad471a0f-94fd-4f28-bcca-f562f254a200	ca089290-93aa-4fd2-ab79-7b77e9c040cc	100ml	16000	10
03d447d9-e9f9-4e36-8597-21b4e400c101	ca089290-93aa-4fd2-ab79-7b77e9c040cc	200ml	28000	10
f3121305-f974-4501-b9f1-634ee7f83394	24f725b1-37dc-405d-94ab-21acf34aba16	50ml	10000	10
737d99f5-17e2-425b-88da-22a2fbc65419	24f725b1-37dc-405d-94ab-21acf34aba16	100ml	16000	10
4a032d8a-c15f-4956-956c-71bf2196d6b3	24f725b1-37dc-405d-94ab-21acf34aba16	200ml	28000	10
46c1f7f4-4d63-47f9-8941-681558f432ef	209d0031-641f-483a-9b3f-f5b81b56edb9	50ml	10000	10
2f99fcea-fa59-452a-b1a9-f3fa096b2b06	209d0031-641f-483a-9b3f-f5b81b56edb9	100ml	16000	10
ac7c7693-159e-4c5e-a29c-e21e54f92030	209d0031-641f-483a-9b3f-f5b81b56edb9	200ml	28000	10
7dd51903-52ad-493f-a657-762f419ac983	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	50ml	10000	10
41986b0f-9391-4a9b-88e2-9867879c1572	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	100ml	16000	10
aefb9dcb-998d-46dd-a9ab-04e37abdbb85	b3e6ec5c-12ad-4650-9ecd-6d77734dfd30	200ml	28000	10
fbff7b30-9ddb-4397-98a1-09c1249c95e6	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	50ml	10000	10
78e77b99-f1fd-488e-b3ce-a8e62ca67eb2	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	100ml	16000	10
b80f4aaf-9b1c-4132-bce6-918f929c72eb	8637c9fd-ac17-4eb9-9132-9af2ca75b4d2	200ml	28000	10
d1c4efe6-3be2-4535-8da2-1abaeeb8a0ad	e21c17a0-331b-4c9c-ad7f-db1e3242b916	50ml	10000	10
a13def75-73b7-4f78-b48a-9d356b06e872	e21c17a0-331b-4c9c-ad7f-db1e3242b916	100ml	16000	10
25b376ca-0199-40fe-9c15-f4003b264800	e21c17a0-331b-4c9c-ad7f-db1e3242b916	200ml	28000	10
8aaa13f5-abb6-42df-9965-6d49c19393c5	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	50ml	10000	10
19ce927d-697b-4333-a519-9eac1b7cd417	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	100ml	16000	10
8fce154c-e93f-4eaa-a904-2f0b431decc3	2ad9b536-7460-4aa8-8489-2cc96d1a19a7	200ml	28000	10
a573160e-b5a5-4caa-abb0-23f73bc53ac2	038ba25e-adea-4aa2-9167-e955a0c2dbbc	50ml	10000	10
48fedba5-6fe3-43dd-b7dc-aee2232a8c53	038ba25e-adea-4aa2-9167-e955a0c2dbbc	100ml	16000	10
11ccc70c-6235-44b9-a7c3-7c6938075dba	038ba25e-adea-4aa2-9167-e955a0c2dbbc	200ml	28000	10
ab69c00f-2559-4397-872d-143a0252afac	f8358322-e61b-4018-b2ec-4ed99c30ab20	50ml	10000	10
d512c752-2356-439b-b747-158f9aefd4fa	f8358322-e61b-4018-b2ec-4ed99c30ab20	100ml	16000	10
7ccbfe07-54b2-4fef-b081-d65d43ebb32f	f8358322-e61b-4018-b2ec-4ed99c30ab20	200ml	28000	10
2fff22d9-7479-48fc-9707-364eef08bb92	fd1f56db-0a26-4e9e-8703-433044728b1c	50ml	10000	10
37419469-2e66-4787-a65e-e5ef7839a751	fd1f56db-0a26-4e9e-8703-433044728b1c	100ml	16000	10
03b97d01-19f8-4cfa-9115-26ac17b5fca6	fd1f56db-0a26-4e9e-8703-433044728b1c	200ml	28000	10
4741f894-c8fa-4584-804c-f03855ae2cfd	327c9e42-c70f-4142-b85b-e7b7fd58a32f	50ml	10000	10
14d991c7-d65b-4df0-82e4-b1786440125b	327c9e42-c70f-4142-b85b-e7b7fd58a32f	100ml	16000	10
a4aa8ed7-a8f3-4046-9c8e-df09f3cb6e4d	327c9e42-c70f-4142-b85b-e7b7fd58a32f	200ml	28000	10
145598bb-6a4c-4cf6-bdf3-7d7abf7c2bf4	af72522f-1085-4f94-ba11-206256972db1	50ml	10000	10
fd14f3c9-ceff-4b1c-a509-fd0f61c38776	af72522f-1085-4f94-ba11-206256972db1	100ml	16000	10
598d7f98-93a6-4166-a13c-cdcfac3af5f4	af72522f-1085-4f94-ba11-206256972db1	200ml	28000	10
20ec395c-0541-4656-914b-a80a5189bd6e	f00ab0e4-7352-4724-a5b6-9dcce9714156	50ml	10000	10
2d8b2836-28e6-43c6-b2d5-6972f2322107	f00ab0e4-7352-4724-a5b6-9dcce9714156	100ml	16000	10
ad007a8d-3e07-4606-901b-3543e75b214a	f00ab0e4-7352-4724-a5b6-9dcce9714156	200ml	28000	10
a4191763-3550-40e2-b1fc-175d34beb356	5a7c4378-e660-48ea-8550-2f2faee9958b	50ml	10000	10
b9052c5f-b27c-4dc7-8079-d6fa96583ee3	5a7c4378-e660-48ea-8550-2f2faee9958b	100ml	16000	10
6bd2ba7d-13c2-4424-8a61-f8836be033b7	5a7c4378-e660-48ea-8550-2f2faee9958b	200ml	28000	10
1f2b5af3-4ca2-4551-ba31-16169c787d90	95a6f8ff-c74f-4a93-8475-a16c901900f7	50ml	10000	10
d97161ab-596c-4408-8941-68fed7f76a41	95a6f8ff-c74f-4a93-8475-a16c901900f7	100ml	16000	10
ffcb5323-17a8-4c18-b6df-866450703ec4	95a6f8ff-c74f-4a93-8475-a16c901900f7	200ml	28000	10
bdc3ebdd-a6dc-4851-af08-3b178e198b7c	6bbe7394-f4b2-422c-b3de-24d5d3c28710	50ml	10000	10
b46a38a3-0ee3-4524-af5c-8815b418d71b	6bbe7394-f4b2-422c-b3de-24d5d3c28710	100ml	16000	10
41500a49-2b78-4022-ba91-6467059bb31f	6bbe7394-f4b2-422c-b3de-24d5d3c28710	200ml	28000	10
a11519f9-edf5-4916-ad51-805d14dd43ad	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	50ml	10000	10
0dd4b71c-6ce0-437c-b2d2-02003f213bb4	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	100ml	16000	10
8093031b-5fc0-4b82-ba20-28492a1bd07a	0b2cd796-f2ad-41a6-95a7-bd07808d0b2b	200ml	28000	10
bb919341-2040-4061-8222-f26abb5f5443	74771738-b03e-4746-a16e-a5577e605f98	50ml	10000	10
3bbccce3-affe-418d-8e1d-0536fdc1faae	74771738-b03e-4746-a16e-a5577e605f98	100ml	16000	10
4d800945-7c74-4d88-9edf-75c273e811e1	74771738-b03e-4746-a16e-a5577e605f98	200ml	28000	10
543d04b8-acec-4bfe-b8c3-f9613f9bf5d3	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	50ml	10000	10
13e56844-4564-4354-9622-262051ff903d	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	100ml	16000	10
83d9f5aa-8e87-41aa-bb1f-f843a53de728	151ac1fd-8f54-4e59-b81f-2be2b1a664a4	200ml	28000	10
40051fa7-d49a-4610-b18b-e8e9f15f66cd	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	50ml	10000	10
6a304a32-2ccc-4e82-ad51-d6419ac16a7d	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	100ml	16000	10
1b356126-d519-427d-a34a-bd3fca8ef0e5	eb508b4d-7b80-40aa-8b8d-7190e7d534bc	200ml	28000	10
aa8165ab-51e9-4fc5-b9d6-ba3c70f19eba	842e3ac0-435e-4ffb-9070-79a13e1a63cb	50ml	10000	10
37263063-056b-42a6-bbd5-3e5a71163bbc	842e3ac0-435e-4ffb-9070-79a13e1a63cb	100ml	16000	10
712394fc-dc3c-47a9-99d1-1e43d98025ec	842e3ac0-435e-4ffb-9070-79a13e1a63cb	200ml	28000	10
44bb451e-5f26-41a8-b650-02d594fc4c8f	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	50ml	10000	10
57efd67f-3fd9-45b3-8415-cae72e776164	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	100ml	16000	10
338891cb-aed4-47bf-a312-7690b36ceed0	fcbca1f7-980f-4753-adfe-6ccdbd450bdf	200ml	28000	10
645d082d-da48-4aa0-8831-75fc8360824d	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	50ml	10000	10
38f6856b-2261-4664-bf4f-a6b973f38173	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	100ml	16000	10
a6509db5-63c8-4fa9-bb26-7e992715851f	5d06bf2e-1790-4a84-b2c6-8c9e016f5dee	200ml	28000	10
3ecc3ab5-c50b-47f0-a2a3-dba79fdb98f3	306985d9-8ffb-4b62-9a71-cadf1d3ce599	50ml	10000	10
36c56f16-acf2-4468-a1d4-2ce4d67521fd	306985d9-8ffb-4b62-9a71-cadf1d3ce599	100ml	16000	10
7918e05c-7fbd-4132-a183-9b194a3127c4	306985d9-8ffb-4b62-9a71-cadf1d3ce599	200ml	28000	10
ee334bc4-3078-414f-8c54-593010ccb054	23801d96-505a-4109-b5aa-aac795238315	50ml	10000	10
6a86b4b0-f6dc-40af-8065-619099e01b98	23801d96-505a-4109-b5aa-aac795238315	100ml	16000	10
fbae4231-c2c4-4175-aa38-56c0163c75bc	23801d96-505a-4109-b5aa-aac795238315	200ml	28000	10
3ee96e84-ba30-49b8-8a2a-3c4736641be4	f35f005d-502a-47b6-b092-c568c4bf3f3b	50ml	10000	10
abc78e4a-f8d8-4cc2-9eb0-a3d06ffcdb20	f35f005d-502a-47b6-b092-c568c4bf3f3b	100ml	16000	10
62ceaf35-1d96-436d-a601-15a9cf77b8fa	f35f005d-502a-47b6-b092-c568c4bf3f3b	200ml	28000	10
1b33bc30-ebc9-4865-bd02-366bf4769828	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	50ml	10000	10
dc185a67-c50a-4b87-9ded-9a42a03bf9f2	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	100ml	16000	10
bdabac83-357c-4d26-9486-f0ef4f16387e	5a00234f-4a2f-4d69-9f47-8ab63bcbd3ac	200ml	28000	10
b12dd9f5-10b7-410a-a6c5-038a572ae6b2	74f06a46-bbc3-4df9-a35b-bdc354055041	50ml	10000	10
6e34b94d-49da-4810-80bc-0096ecf33bae	74f06a46-bbc3-4df9-a35b-bdc354055041	100ml	16000	10
36578671-8f13-4b5c-af16-59dd544440ee	74f06a46-bbc3-4df9-a35b-bdc354055041	200ml	28000	10
71ba7325-9429-4b00-bd78-50b79d78ba9e	9a621758-3d3e-425a-bf5f-db3123a27f24	50ml	10000	10
29a199a1-df67-4178-9634-5a0cfcc92438	9a621758-3d3e-425a-bf5f-db3123a27f24	100ml	16000	10
a5988ae0-9381-46ee-b356-3114f89fd1bc	9a621758-3d3e-425a-bf5f-db3123a27f24	200ml	28000	10
8d18cfdc-7ba5-42a7-bdac-629fe9f95b5e	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	50ml	10000	10
edda996f-f59a-4d7a-9388-71367d447a4a	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	100ml	16000	10
8fbafc81-c66e-4dad-b5c2-735e2257c0ad	a402f394-6b7b-4cb9-aa2e-9b633e57d39a	200ml	28000	10
4f5453c6-7727-4bb9-b982-f779b2a5db73	1f102a6a-c86a-431b-8311-061a8e9f18a5	50ml	10000	10
11715489-84a1-415c-8376-3bc0c40defca	1f102a6a-c86a-431b-8311-061a8e9f18a5	100ml	16000	10
1c0f4864-e5fd-4bff-87ae-4d04f65594f9	1f102a6a-c86a-431b-8311-061a8e9f18a5	200ml	28000	10
09abdd17-d273-45ca-a4bd-5514bdbafa45	7fd8fd00-5741-458f-9b45-76abc54dd4a5	50ml	10000	10
6052b52b-3fcb-47c5-a1ff-5b6ef764263b	7fd8fd00-5741-458f-9b45-76abc54dd4a5	100ml	16000	10
f734bf8c-f2c4-44fb-af1f-abd985ec83df	7fd8fd00-5741-458f-9b45-76abc54dd4a5	200ml	28000	10
55310721-3f21-4dd1-ae22-f84a4c601e65	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	50ml	10000	10
10739927-2bb0-4e97-8d77-23f64d1154be	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	100ml	16000	10
9ef2142d-b5c1-49f1-aebd-a35918519544	c26aff6d-4bdb-4f88-a758-8bdf6bd33e91	200ml	28000	10
08471bd0-b64c-4b04-a2e6-dcac46b8502e	877c698f-6385-4e69-a47b-0313fe652351	50ml	10000	10
8e6762e2-b321-4130-9a6e-85fb7ae43aa3	877c698f-6385-4e69-a47b-0313fe652351	100ml	16000	10
15ff5837-ad5e-4221-b35d-0dc0f8087909	877c698f-6385-4e69-a47b-0313fe652351	200ml	28000	10
0e0afcdc-278b-4a67-bfed-bfb514d2a726	32280cdb-f1a5-4c78-bdfe-0a63755583d4	50ml	10000	10
2dc91ab3-e591-4ee2-8dd2-3383a1e6c5f5	32280cdb-f1a5-4c78-bdfe-0a63755583d4	100ml	16000	10
5d7a6c52-b818-4403-b94f-fdd2c2df0a59	32280cdb-f1a5-4c78-bdfe-0a63755583d4	200ml	28000	10
3d6c8574-55f1-47ad-a4fb-76d14d6a486d	f91d7284-2e9b-4de7-8f49-003bcace14a7	50ml	10000	10
7d62fdc7-74ec-46b6-8135-286a21998e1a	f91d7284-2e9b-4de7-8f49-003bcace14a7	100ml	16000	10
7e7eab23-951d-4595-a2a7-5c6473269ed9	f91d7284-2e9b-4de7-8f49-003bcace14a7	200ml	28000	10
721e80e0-2968-461f-975f-31f71cf10578	662ef73f-78a7-4f64-8994-df72da082c28	50ml	10000	10
e481b74a-b56d-4105-8570-25893fd0edc3	662ef73f-78a7-4f64-8994-df72da082c28	100ml	16000	10
81ef5fb4-d94e-41fd-baf2-0500e52b59c4	662ef73f-78a7-4f64-8994-df72da082c28	200ml	28000	10
50021465-9329-4509-b00f-50b9e1606fc9	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	50ml	10000	10
fa671892-a9db-43ea-b713-bac34e45e3fc	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	100ml	16000	10
20460f9c-ad32-4cde-8cbd-6e8e41372176	9ffef6b9-15d8-4fd6-921e-c5862d9e7400	200ml	28000	10
ed480b31-4d4b-4b90-8693-b5d5764e09a8	bca4baf7-e4dc-4dff-928b-f214ac8800fd	50ml	10000	10
60d5d711-91c8-4efd-a198-7bf61c940168	bca4baf7-e4dc-4dff-928b-f214ac8800fd	100ml	16000	10
b5162fbf-c2a3-4ccf-9b76-e2f4cdffdd54	bca4baf7-e4dc-4dff-928b-f214ac8800fd	200ml	28000	10
7bf7de3f-89ea-449a-aeb5-8501ad23436e	b7473554-6287-40b5-90fa-9df6187953f3	50ml	10000	10
d604c7d7-2108-4057-90c1-238aa9861d22	b7473554-6287-40b5-90fa-9df6187953f3	100ml	16000	10
3a28e707-e405-46f6-bc31-5546cdc41625	b7473554-6287-40b5-90fa-9df6187953f3	200ml	28000	10
ff054ae9-1ee5-45a1-8ab8-53c2127ab3c0	e328201a-b076-4887-9927-3ed32d89da3c	50ml	10000	10
eddb7545-9309-485e-89e0-ba6c4698cf09	e328201a-b076-4887-9927-3ed32d89da3c	100ml	16000	10
a7791cb2-7d91-43b9-940e-3b713b69be12	e328201a-b076-4887-9927-3ed32d89da3c	200ml	28000	10
f54bba97-fb5e-47f5-8932-e410ac8edcb5	8e7dbd83-b333-4569-8ec7-0bced577036a	50ml	10000	10
c00a9875-620d-4fdc-87f3-9f9f635d9b16	8e7dbd83-b333-4569-8ec7-0bced577036a	100ml	16000	10
e9f18100-0d46-421d-bfd7-23e6b7ca4ad2	8e7dbd83-b333-4569-8ec7-0bced577036a	200ml	28000	10
fc4078fe-caaa-4a90-9646-81cc8624bb68	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	50ml	10000	10
16578750-6119-476a-b99e-5956002b9fb9	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	100ml	16000	10
07e3bee4-a32f-4b86-8491-3393f77c946b	b20c198a-2b2a-4650-9d3e-f3da6bb622bb	200ml	28000	10
422bb2ba-dfb0-49b8-b897-2bf193c87069	7b85426f-e196-49f4-8354-d934e832a2ec	50ml	10000	10
6a76f4fa-f40b-4ec8-bf00-be26ff00e6c4	7b85426f-e196-49f4-8354-d934e832a2ec	100ml	16000	10
3033002a-bedd-4c68-a23f-45d559544020	7b85426f-e196-49f4-8354-d934e832a2ec	200ml	28000	10
40ee8061-6415-400a-b2f9-69672ef6bac0	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	50ml	10000	10
8ecc5570-d705-47c3-9cc7-58572f502dee	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	100ml	16000	10
2b2dcba8-0dc1-465c-9407-e4101ff970f7	2bc7200b-73c9-48cc-a0cc-bba844bd3eb1	200ml	28000	10
e397d107-9011-46ab-a5a8-51403e18702e	127f37c8-72be-40df-9ae2-8fd333586096	50ml	10000	10
5db5f412-cedf-4f84-99d4-883e6c7c4a83	127f37c8-72be-40df-9ae2-8fd333586096	100ml	16000	10
1bfcb70d-609c-406c-bac9-ad7b6b8dc789	127f37c8-72be-40df-9ae2-8fd333586096	200ml	28000	10
bdb234ea-e276-4e5f-b5d3-4b45ebb64b47	342d937e-95f0-469b-9c44-db23c035fc8c	50ml	10000	10
14fa0d4c-c5c8-4283-aa0b-3a043ea86dc4	342d937e-95f0-469b-9c44-db23c035fc8c	100ml	16000	10
10abd424-d8c1-44ee-a540-e760a44e668d	342d937e-95f0-469b-9c44-db23c035fc8c	200ml	28000	10
34fdf525-a5b1-4886-8228-e2c117efdb68	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	50ml	10000	10
f52babd4-df11-4de7-aa56-25c0a98944aa	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	100ml	16000	10
c6267002-7120-4659-9c19-3d920862d36b	35e9b0cf-858c-45ee-b43c-2ac0d6fd7ff0	200ml	28000	10
f1f2ab00-8e3d-4dbe-9b11-52ed4b202fe6	db074475-2bdc-44a6-88cb-3f24570f0974	50ml	10000	10
be0db896-3395-4c36-8c9d-5e6754d85cbb	db074475-2bdc-44a6-88cb-3f24570f0974	100ml	16000	10
9eb2a6e6-67e4-4278-9911-6e04ff546538	db074475-2bdc-44a6-88cb-3f24570f0974	200ml	28000	10
f982af15-0b42-4249-8e69-dcc6057a94d3	8697cd07-9cfc-4ad3-b66a-e726b205592b	50ml	10000	10
6f13dcaf-c97f-494d-81dc-75e11254ad37	8697cd07-9cfc-4ad3-b66a-e726b205592b	100ml	16000	10
63aaa4f5-6e28-4372-96af-c8ad9d14072e	8697cd07-9cfc-4ad3-b66a-e726b205592b	200ml	28000	10
83434acd-4797-4f46-8954-c60b0b547ef2	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	50ml	10000	10
a8c7f5e2-1604-41da-ad98-8dba6dee86f3	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	100ml	16000	10
3f2f0106-8df2-45b3-8ce9-d0d88d9e2d24	7517fe33-a6fa-4b33-aa17-9bd9c85297c9	200ml	28000	10
7bb4b64c-e006-409d-979d-2261046c67a1	cb51dfe2-adb2-42d2-970a-abbc99990bfa	50ml	10000	10
f627e158-bd37-4a73-8576-80034d726b46	cb51dfe2-adb2-42d2-970a-abbc99990bfa	100ml	16000	10
774e1e33-1e8f-4066-9d35-9a82e36d9258	cb51dfe2-adb2-42d2-970a-abbc99990bfa	200ml	28000	10
a1823de5-341e-441a-8504-057f0b58277e	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	200ml	28000	10
9e6c1917-75c6-4d45-ab51-5a9dc1de63c1	19258c51-5210-4598-bb62-e829f84f09b0	50ml	10000	10
de779436-5a89-4903-af32-a50a4f5439cf	19258c51-5210-4598-bb62-e829f84f09b0	100ml	16000	10
6100a5b8-96a1-4598-9cf8-a6ece0e5fa89	19258c51-5210-4598-bb62-e829f84f09b0	200ml	28000	10
fed29ba2-43e8-4c25-8087-77562f1a6fd2	e4531865-1bac-491c-8bca-1f2e1ac0f045	50ml	10000	10
19041c52-d471-4620-a3ec-099931fe7f02	e4531865-1bac-491c-8bca-1f2e1ac0f045	100ml	16000	10
7e0d8830-d18e-4d2c-957b-65b141c19c4f	e4531865-1bac-491c-8bca-1f2e1ac0f045	200ml	28000	10
e7c49e6f-e4a2-4f4e-9b82-387d76be256e	a1cdcec6-1029-41e3-be91-786a73345bb6	50ml	10000	10
ef34d894-db33-47ba-87f4-7b4b8f2f1051	a1cdcec6-1029-41e3-be91-786a73345bb6	100ml	16000	10
6716cfa6-2280-43d8-a5dc-8eec28424924	a1cdcec6-1029-41e3-be91-786a73345bb6	200ml	28000	10
321e242d-5865-4d3a-8b37-3e8dabb39dc1	e337df00-b9dd-4967-a845-0096a76ad289	50ml	10000	10
7a79c22a-6bc7-4d2f-aeac-3dbc27709b50	e337df00-b9dd-4967-a845-0096a76ad289	100ml	16000	10
3b8baf18-5277-4b33-b7c9-2b87a3afc6fa	e337df00-b9dd-4967-a845-0096a76ad289	200ml	28000	10
d7172eff-54b9-4ffe-823e-1e8031c0c083	0489881e-3909-4d95-9a70-56f03ca9d2b8	100ml	16000	30
5e6a0756-3bb3-49c1-bcfe-c03938190027	0489881e-3909-4d95-9a70-56f03ca9d2b8	200ml	28000	30
1760863d-6dcd-4667-8638-9ba79cceb770	d5dbc3ff-685f-4366-a30b-867a527e8a15	50ml	10000	30
fdd65d9d-9c50-49dd-a546-0be8feadc3ee	d5dbc3ff-685f-4366-a30b-867a527e8a15	100ml	16000	30
7154d74e-c100-49f8-bc4c-edb09ddb0fcf	d5dbc3ff-685f-4366-a30b-867a527e8a15	200ml	28000	30
6da38c37-feb0-4d46-8754-a1b671bc3611	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	50ml	10000	30
23338eaf-5e58-48e1-81bd-2c2f7b8241d3	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	100ml	16000	30
ae12f3a5-f4c9-419e-a2be-b66ef231faca	3d2d1d5a-f214-4e54-a12c-d80ed46656f2	200ml	28000	30
250c28aa-1d83-4b41-9c28-23ce36aa29f0	767bc26f-f467-4b3f-9e70-f66c29c51718	50ml	10000	30
eb9c5b29-1493-484f-b981-1a072a1738ae	767bc26f-f467-4b3f-9e70-f66c29c51718	200ml	28000	30
c689bad8-ad42-463d-b38f-eed7d4da9581	c6d45800-9bae-46ef-8800-343114afa08a	50ml	10000	30
b4cea2b6-85c7-4af8-8f04-fafd9b85a097	c6d45800-9bae-46ef-8800-343114afa08a	100ml	16000	30
c6d0ab04-81e4-491f-840c-2c64fdbc0a46	c6d45800-9bae-46ef-8800-343114afa08a	200ml	28000	30
15094139-47e2-4bbe-a7bc-a13715d33ed9	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	50ml	10000	30
e43ac61f-858e-4f7b-b818-550ba18993d0	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	100ml	16000	30
d82e74d7-b95d-4bed-a1e3-892cc4263eeb	4e5bc6ad-152d-4fc8-9513-270f4d1de52f	200ml	28000	30
88498a1a-7240-4c5b-b27c-f666a9514ede	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	50ml	10000	30
cf7343f9-7c05-4292-84de-ceb8859ea9da	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	100ml	16000	30
b68255db-f9c5-4bec-bf49-046473c4de06	64b4baf1-7a10-4ed4-8083-ba1b9053c1c7	200ml	28000	20
18f00978-f31f-49d4-a495-a876074add76	d714c24f-a3cd-4109-b043-bb08f5cc0438	50ml	10000	20
3892bd0d-1537-4ff5-a99a-cf87b5845175	d714c24f-a3cd-4109-b043-bb08f5cc0438	100ml	16000	20
0e27ebdf-bb06-4bbe-b995-67e066df3b7e	d714c24f-a3cd-4109-b043-bb08f5cc0438	200ml	28000	20
1f3925b1-04d3-4bf8-9d34-1873a12ed76b	b58cd811-68c3-46c6-b60e-c2cefb6b167c	50ml	10000	20
343c6b08-2ee6-4e31-a617-a1b1e3ebbc81	b58cd811-68c3-46c6-b60e-c2cefb6b167c	100ml	16000	20
80716401-8ba3-4a2a-9f79-72a807ad4331	b58cd811-68c3-46c6-b60e-c2cefb6b167c	200ml	28000	20
53169fed-0794-463d-a6ea-a2185564b5aa	72f5204b-71de-40c6-bab1-ed8d5307e9f4	50ml	10000	20
22e6a23b-79f3-43ba-a95c-38cf52fb6963	72f5204b-71de-40c6-bab1-ed8d5307e9f4	100ml	16000	20
d6b83511-a34d-49da-b508-ec2e34f4a106	72f5204b-71de-40c6-bab1-ed8d5307e9f4	200ml	28000	20
51cb4186-41a3-4740-89fe-f011602d7a76	28e85aaa-f5c9-4348-b831-0a993734a059	50ml	10000	20
91d2b146-f9ce-402e-91f3-0661a6af6ae0	28e85aaa-f5c9-4348-b831-0a993734a059	100ml	16000	20
c9886ace-69e2-4a58-9d3c-3377e5f05e03	28e85aaa-f5c9-4348-b831-0a993734a059	200ml	28000	20
bcc971bd-4306-436b-8580-e353b6f327f1	dd67cb78-da62-470d-8f29-c594b909f7a5	50ml	10000	20
8c71022b-ce92-4f08-85a0-b9e2565f4c29	dd67cb78-da62-470d-8f29-c594b909f7a5	100ml	16000	20
e000cba2-12b8-45bf-8c66-31c3f2b680dd	6db54e28-8ba7-420a-ba75-ebe7979f09d0	50ml	10000	20
85d07a80-8ad8-4e8c-96f5-6366fd1c120d	dd67cb78-da62-470d-8f29-c594b909f7a5	200ml	28000	20
56344db1-67f2-4fd8-aa01-3083a605c730	6db54e28-8ba7-420a-ba75-ebe7979f09d0	100ml	16000	20
8bcb217c-b543-46a0-9660-8949fad0595c	6db54e28-8ba7-420a-ba75-ebe7979f09d0	200ml	28000	20
9442856e-b460-4546-ba87-28ebeed79cf5	ec08e506-0d25-4292-933a-7e77d056197c	100ml	16000	20
a72a2f16-dc2c-4f66-9f47-8a60945d6d6d	ec08e506-0d25-4292-933a-7e77d056197c	200ml	28000	20
8813a99e-25cf-4a54-b9f6-1e25023eed67	84e50a6c-c3e0-4114-9150-d6205212b7ca	50ml	10000	20
6e09ba5b-a33c-4f4e-8a3c-fdccae63674d	84e50a6c-c3e0-4114-9150-d6205212b7ca	100ml	16000	20
12617d38-c0ec-4482-b9b2-5439adc4688a	84e50a6c-c3e0-4114-9150-d6205212b7ca	200ml	28000	20
fd0571c8-1c49-48ff-a6f8-af5991b695f9	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	50ml	10000	20
d8159635-18ad-4f99-8312-4010294b820a	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	100ml	16000	20
073c0cb6-0bcd-4836-a7cd-ad2cffc88476	8421c5f1-d8f3-4854-83fa-6ff342c0d6c6	200ml	28000	20
e682f7b1-d8a6-4453-994f-ce566b1f1a3d	bbbe0953-9dad-41a1-b246-0bbf527278d2	50ml	10000	20
aa4dd26b-bb6e-4051-b619-79b224319068	bbbe0953-9dad-41a1-b246-0bbf527278d2	100ml	16000	20
c281d5b1-7d8f-4969-b138-b18acf79bbf4	bbbe0953-9dad-41a1-b246-0bbf527278d2	200ml	28000	20
845de796-7544-4649-baed-3af917d0345f	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	50ml	10000	20
27ae767b-fd70-49f3-ade8-6d2e88d38fb1	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	100ml	16000	20
6b451893-2cdf-4a4f-90ce-af8659f87bd4	f8f9d7f6-af89-40d0-8483-cd0efeeeb672	200ml	28000	20
8e15fbf9-9ddb-4963-87c6-3b668f79f36d	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	50ml	10000	20
2d06ac94-bad5-4d0e-b350-2f495cfe6e26	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	100ml	16000	20
d0855f36-7912-426e-acbd-63707a0b15a8	5a5ede4b-9d43-4b79-8c2b-19f44725d2c8	200ml	28000	20
7aae0858-c79a-419a-9a49-219ea819f97b	48d5299f-c979-4fc4-bc27-0043890a7b8d	50ml	10000	20
ca10786e-780f-4b6c-af43-7fd65ce46929	48d5299f-c979-4fc4-bc27-0043890a7b8d	100ml	16000	20
32710473-8e4a-4a07-a053-fb83b245c0b0	48d5299f-c979-4fc4-bc27-0043890a7b8d	200ml	28000	20
c3888bab-06b8-4eac-a20c-24391c193e01	856088c4-d455-4674-86d7-1abe92e243b6	50ml	10000	20
764f3f78-9f7a-463e-8448-bf1f0e7a58a5	856088c4-d455-4674-86d7-1abe92e243b6	100ml	16000	20
4ab9d900-f5ac-465b-a1b6-47c7d073a11d	856088c4-d455-4674-86d7-1abe92e243b6	200ml	28000	20
4c455f25-935d-45e5-90a8-c82c68c2547f	01f8559c-9dd2-4dad-90b6-c306988299e5	50ml	10000	20
fdbc45bd-9959-487c-bd50-7f0d6567907c	01f8559c-9dd2-4dad-90b6-c306988299e5	100ml	16000	20
c8cb47cd-12df-460e-8232-cb42110fecb3	01f8559c-9dd2-4dad-90b6-c306988299e5	200ml	28000	20
a5af5325-56f7-472a-a9fb-da77cf575a4d	16d29daf-79b9-42fb-964c-b50553900528	50ml	10000	20
0c8dafcb-92b0-4626-be85-54f461b755a2	f5fee43d-13f3-43bb-8508-b08bda80dd2c	100ml	16000	30
353b1164-7b26-44dd-bb5f-326f39f11976	7f1cb136-a5b1-4306-9704-62588862fbc2	200ml	28000	20
7ff2a85f-d807-403c-a50a-2445625b0d06	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	50ml	10000	20
69618c87-9267-4a5b-8606-80e73afd880c	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	100ml	16000	20
695ef035-d101-41b3-9336-789540d137dc	ef36a5eb-f591-46fe-a0c4-6a3de44da7fd	200ml	28000	20
87108f08-f2de-4c1b-b6d2-6acd33743785	0657e2e2-2d86-4106-b336-efd532d98fb4	50ml	10000	20
f79f034a-4155-41a2-819a-469067fffb1f	0657e2e2-2d86-4106-b336-efd532d98fb4	100ml	16000	20
6c1ee64c-ef8d-4eed-b2d0-07449b421f8e	0657e2e2-2d86-4106-b336-efd532d98fb4	200ml	28000	20
0243ee8f-0bf0-4149-9bba-6e81c90af2fd	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	50ml	10000	20
75429028-624d-4f18-bdcd-be352f96c869	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	50ml	10000	20
a5e27178-6659-4026-a6bd-96237fbbe019	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	100ml	16000	20
aa14e1a7-4cb4-4a16-ad0e-a196d66e84f5	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	100ml	16000	20
d1b83c44-6019-4c88-8c3d-489f5bf536ae	6210563a-b9ec-4047-b1d8-1da33e9662f2	50ml	10000	20
4b914be8-b616-4008-b58b-9e9b91175833	6210563a-b9ec-4047-b1d8-1da33e9662f2	100ml	16000	20
0a7e6c9c-e96a-4b3f-b28a-a57e24313f10	6210563a-b9ec-4047-b1d8-1da33e9662f2	200ml	28000	20
fa5dc5c0-174a-4ca2-9d35-16d416f89fc9	84f5ce1a-63c0-47a5-8b82-90022e5dadb9	200ml	28000	20
4c531d6f-fc2b-4bcc-91d2-07c2e0e028ac	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	50ml	10000	20
0f975451-3506-4a37-8495-d680bc105d54	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	100ml	16000	20
83a9c94a-90ec-4212-998b-fb2d528a94d1	0f9e2a4c-f70f-4727-b404-5cd3e6cf2ef3	200ml	28000	20
42f8ca74-2996-48ef-aeb2-898b3b7e2eda	c0221751-2228-456b-a326-b8d40f23c6c7	50ml	10000	20
92234760-a7e3-4822-ae6e-64f50ded9952	c0221751-2228-456b-a326-b8d40f23c6c7	100ml	16000	20
199b023e-edc0-4b4a-9b0e-f88050526c75	c0221751-2228-456b-a326-b8d40f23c6c7	200ml	28000	20
796b9793-f12f-4f42-8a93-7be245836500	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	50ml	10000	20
52db3e5a-2bc4-425e-a54a-d681ed9c5107	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	100ml	16000	20
a825fd90-596b-4576-a09f-9eb9db225b7c	4e8eded0-f8b2-4136-a7e0-d926ef5dada0	200ml	28000	20
687d47ba-cecc-44ab-857e-6172695fd3fc	996405d5-6f23-4ccc-a387-9d7f6fba68e8	50ml	10000	20
62f092f6-05f8-45b8-8eac-ca1cc4d16850	996405d5-6f23-4ccc-a387-9d7f6fba68e8	100ml	16000	20
0573fbf4-2b5b-4bb8-95d7-abcb6f49534e	996405d5-6f23-4ccc-a387-9d7f6fba68e8	200ml	28000	20
f3082516-e395-44a7-871e-50df330e7c10	c8e98770-b2d9-4add-88b3-57af59796384	50ml	10000	20
3aaef5d1-5583-44e7-a160-8a0ffd27132c	c8e98770-b2d9-4add-88b3-57af59796384	100ml	16000	20
1a02ec12-72e5-4d8a-aca9-e0511643bdc1	c8e98770-b2d9-4add-88b3-57af59796384	200ml	28000	20
f13726a1-81e4-4db2-9420-6db757a2e587	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	50ml	10000	20
16e7811c-47eb-4c91-9147-0586a5f7963f	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	100ml	16000	20
d8b97815-a9e6-4f3d-9d2b-32570317b093	2c1fca70-1b3d-43fc-8c20-7056a97adfb4	200ml	28000	20
42ffdaf1-4135-4000-93d4-19f389c4d216	74a0a41c-a5ca-4967-98d0-333b7ec343b9	50ml	10000	20
985f7db7-f4c5-41c9-aef9-3e805ede200c	74a0a41c-a5ca-4967-98d0-333b7ec343b9	100ml	16000	20
2472cdaa-685e-41ab-ab54-e5c01d53aad7	74a0a41c-a5ca-4967-98d0-333b7ec343b9	200ml	28000	20
2648b1ec-032b-4431-93c9-180feb02f8a6	5ff2b307-6c42-4108-926a-6e6fa1fac47b	50ml	10000	20
05421a68-81ce-403b-a34d-7cdeedf80328	7feb7a06-6c47-4394-90ed-3210cf471c2a	50ml	10000	20
77a5ded1-3dc6-463e-8595-bf59d2dfdb08	5ff2b307-6c42-4108-926a-6e6fa1fac47b	100ml	16000	20
bd1491aa-199d-4ee9-a76e-24cc8623e9e7	7feb7a06-6c47-4394-90ed-3210cf471c2a	100ml	16000	20
1de64d5f-5c1e-4f88-8e33-e49272d44161	7feb7a06-6c47-4394-90ed-3210cf471c2a	200ml	28000	20
35d32d3a-d8c6-46e6-adfb-303a2ade2b94	b2ac3210-34a5-4e86-a628-0ea79aae160d	50ml	10000	20
fa0a3efb-7531-466a-bec5-bc638e601cae	b2ac3210-34a5-4e86-a628-0ea79aae160d	100ml	16000	20
4efcccdd-54fb-4473-b593-51862d389bee	b2ac3210-34a5-4e86-a628-0ea79aae160d	200ml	28000	20
fcaf03a9-f00c-4f79-983a-cd189b087016	69da95bf-6e1a-486b-b0c5-7d3fed07e012	50ml	10000	20
3995d114-f9db-47a5-a05b-421434a521be	69da95bf-6e1a-486b-b0c5-7d3fed07e012	100ml	16000	20
09786652-7c59-40c0-9fb6-4122b3e3efb4	69da95bf-6e1a-486b-b0c5-7d3fed07e012	200ml	28000	20
db0b1426-c3f4-44d8-b891-82b48360afec	8905257e-c381-4912-a966-00223625f3e4	50ml	10000	20
2080d329-b590-4159-9eb8-a4f4b39f2c65	8905257e-c381-4912-a966-00223625f3e4	100ml	16000	20
13971c0d-609e-43f8-8bcb-1092f57f9fc2	8905257e-c381-4912-a966-00223625f3e4	200ml	28000	20
acf082d4-c305-4d57-8748-c32d8147f161	af4c5426-894d-4900-9b64-1acede6eaa6e	50ml	10000	20
25548f7c-494a-4672-99b4-141ed1b500dc	af4c5426-894d-4900-9b64-1acede6eaa6e	100ml	16000	20
961f4c08-74da-47f6-85a5-282eb2e4a91a	af4c5426-894d-4900-9b64-1acede6eaa6e	200ml	28000	20
61c550ad-662d-4ca0-a3c5-629d4e852d82	fd56b88d-1e3d-4b94-841d-485aa0c62d93	50ml	10000	20
190e6517-a0c9-453a-9b7e-41f06cca2db7	fd56b88d-1e3d-4b94-841d-485aa0c62d93	100ml	16000	20
a495cde3-fdb0-4983-bd12-d194b4b97d71	fd56b88d-1e3d-4b94-841d-485aa0c62d93	200ml	28000	20
589c68f8-1269-4b35-8b57-0081db81da9a	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	50ml	10000	20
1e79031e-6427-43fc-9ad5-58b96592ddd5	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	100ml	16000	20
5465592c-8caf-4123-854b-978a826f7b82	5c94e9e3-bcce-4efd-bdbe-29e01dd09ba9	200ml	28000	20
2bfd6611-fbc8-44f4-bf42-81b6178ae753	5b2f01bb-00bd-4a50-a834-3460898a017b	50ml	10000	20
15e3a2c3-538a-4265-b3cc-757854b61ffc	5b2f01bb-00bd-4a50-a834-3460898a017b	100ml	16000	20
b8b66a70-a11a-40dc-9c08-c1f64d56bcc8	5b2f01bb-00bd-4a50-a834-3460898a017b	200ml	28000	20
ad1c51cf-7b2e-42fe-861f-7aa532a08aac	6f311c30-c216-438a-b707-2e69ab4de5ce	50ml	10000	20
72158a80-d629-4a9b-b8ad-4281890e83e4	6f311c30-c216-438a-b707-2e69ab4de5ce	100ml	16000	20
e380a6a6-cc76-448c-bab3-ab2a95d6c921	6f311c30-c216-438a-b707-2e69ab4de5ce	200ml	28000	20
180e83ce-130e-48ba-9754-024e861ddccb	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	50ml	10000	20
ecd166f4-3d6d-4b6f-996b-c4cdf87daa41	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	50ml	10000	10
e9493889-5b06-4d08-9fd9-11fca6ea3d1e	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	100ml	16000	10
911b002c-580e-4a9b-a3b6-2799f359534f	eaf4499d-bfc6-43c8-a27e-9ff3e293be31	200ml	28000	10
177237b4-25ad-4fe8-b9c5-6570d73c6603	6fa838ee-ec16-4d7e-99ee-001963647cf0	50ml	10000	10
5c133d06-40eb-4815-9d76-e134ae452e08	6fa838ee-ec16-4d7e-99ee-001963647cf0	100ml	16000	10
4b74def7-d013-4203-8a3b-19a8af2eb278	6fa838ee-ec16-4d7e-99ee-001963647cf0	200ml	28000	10
85224bf2-9ef4-4aca-8e34-3dd25cb50b47	ffa94942-4222-4270-962e-40340b6abbc1	50ml	10000	10
b25e0096-58a4-4ee4-9741-c0f426bcf44f	ffa94942-4222-4270-962e-40340b6abbc1	100ml	16000	10
8ffe4be6-2205-48ed-b21e-93262ddd5c4d	ffa94942-4222-4270-962e-40340b6abbc1	200ml	28000	10
fa5f636e-64b5-44ec-8587-fc037443c65f	aad91930-910d-46f4-82a5-e40f5d3cf0c9	50ml	10000	10
e098d087-addd-4ac9-a937-d5f85193f63a	aad91930-910d-46f4-82a5-e40f5d3cf0c9	100ml	16000	10
f0f518c1-5077-4fa9-878d-fe7e63248b01	aad91930-910d-46f4-82a5-e40f5d3cf0c9	200ml	28000	10
3ea2a8ea-5fa1-4780-bceb-2407e3e64c1c	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	50ml	10000	10
d4c3251a-5b10-4011-b4a6-e92a6f356388	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	100ml	16000	10
78e1e90a-5697-46fd-a45a-09149bc1127b	5cf0ae01-7c84-4f09-8d74-85e1e6ebc6c3	200ml	28000	10
27e8f320-b3ee-4867-915c-7ffd12a3977f	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	50ml	10000	10
2342b439-8e36-4d06-8245-9f26a8f8ceef	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	100ml	16000	10
e1278d8d-d06a-478f-8e7d-87b90a7aff2c	7ad64a45-a0d5-42f5-8fa8-4062a120de8c	200ml	28000	10
4a4fa645-8ebe-4a52-b5c2-adc99ea3a84a	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	100ml	16000	20
4d1d9b39-30dd-42fa-a435-850b606b9a42	b2ebfa80-d2e6-4d97-998e-e36e4e6d7e7d	200ml	28000	20
c5a96dfa-a7cb-4bf3-b52b-4f05ed287552	67285bc6-6382-4b7d-8173-2d857a4a1c13	50ml	10000	20
723d6dca-6bd1-4e8b-ae33-afc9758af2a9	67285bc6-6382-4b7d-8173-2d857a4a1c13	100ml	16000	20
8c259534-93ca-4f39-8200-c43dff10735f	67285bc6-6382-4b7d-8173-2d857a4a1c13	200ml	28000	20
8a69958e-8165-4315-bdf6-559118c6d54e	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	50ml	10000	20
9fdb29b4-937c-49ae-aa7c-ee54e9c45f1b	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	100ml	16000	20
3925f938-c8e0-40da-bff7-f9f1c6013c92	994fddd5-46f5-4b37-863b-4bb2dabf4e9c	200ml	28000	20
a4f08758-3c95-4b00-a28d-fed1cf200d26	ff1b01c0-d0e9-4988-af57-57ef959974b4	50ml	10000	20
e336a8c4-dffb-4f8c-8787-1d3574cdd260	ff1b01c0-d0e9-4988-af57-57ef959974b4	100ml	16000	20
02030cdc-c47b-4cf6-9be1-62f7582aa0a3	ff1b01c0-d0e9-4988-af57-57ef959974b4	200ml	28000	20
f3156374-f3ea-47ca-a6b1-639bdcad4b5b	d8defac8-a4f0-4335-a403-23d76a646acb	50ml	10000	20
271370d7-5295-448c-a55b-f375a36ddcc5	d8defac8-a4f0-4335-a403-23d76a646acb	100ml	16000	20
8410ee93-4595-4606-8ffa-20be5f6cb87e	d8defac8-a4f0-4335-a403-23d76a646acb	200ml	28000	20
d1968311-a9d6-4df3-a526-c7c4a618ad14	c2a9a595-7ec0-49f3-9016-9f1325ebd800	50ml	10000	20
45e0937e-649d-43a5-87ec-52fe54340264	c2a9a595-7ec0-49f3-9016-9f1325ebd800	100ml	16000	20
2524ea58-9c90-4965-a000-2a7c5fd1ff11	c2a9a595-7ec0-49f3-9016-9f1325ebd800	200ml	28000	20
0bcd026f-6868-4b5a-9775-6dea82c344ff	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	100ml	16000	10
89d09036-11d4-4af1-9ae4-c91986ba71d8	e047f5ad-5a4a-4d57-bd6f-ac8e8a6deb6a	200ml	28000	10
5a665f0c-0ffc-436a-b6c0-4eeb8677180e	11f0346a-b5bc-4898-b80d-3036af83d7dd	50ml	10000	10
6ea24bec-6f26-42a2-8bb2-eecb9aa021a0	11f0346a-b5bc-4898-b80d-3036af83d7dd	100ml	16000	10
736a5e69-4f70-422c-a386-6a854add3a2f	11f0346a-b5bc-4898-b80d-3036af83d7dd	200ml	28000	10
c6fcac86-1125-4bca-88bc-0c375b51654a	3de69211-944c-4d70-a176-6144b2d5d8b5	50ml	10000	10
1f5b7c9e-0cf1-4442-83e8-9eb0d62510c3	3de69211-944c-4d70-a176-6144b2d5d8b5	100ml	16000	10
62b5e540-d398-4ec8-80be-6cf8f6d83b78	3de69211-944c-4d70-a176-6144b2d5d8b5	200ml	28000	10
e0a583bf-2ef5-4357-9ad5-8e108a5f9357	d2c53ac9-0886-43a5-845d-4b799b6ea413	50ml	10000	10
33f69933-dcdb-4580-b8eb-5fc0b61159d0	d2c53ac9-0886-43a5-845d-4b799b6ea413	100ml	16000	10
906d2365-ccfe-4826-a65a-4e5605d9ef1d	d2c53ac9-0886-43a5-845d-4b799b6ea413	200ml	28000	10
994e0ed7-7c4a-43ad-8ed5-7eb89efc4490	a99e49e0-69e2-4a60-95d2-537c71c8430b	50ml	10000	10
010c4782-9b06-4a48-96ef-b0d08509a5ea	a99e49e0-69e2-4a60-95d2-537c71c8430b	100ml	16000	10
fc114a22-9c62-4958-9266-4ff5d7143eb2	a99e49e0-69e2-4a60-95d2-537c71c8430b	200ml	28000	10
b0148214-0fde-4992-80ac-09dc8c0a90b6	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	50ml	10000	10
60763b62-63ba-4f03-a904-5b42a14bef6b	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	100ml	16000	10
959bd20b-95e2-4bb8-8232-56aa12fd759c	2c525b80-1cd2-430a-94c4-cd60d4aef1f1	200ml	28000	10
fee151ed-277e-41cf-be15-0a2ed3a0bc14	21e86815-37ef-4bb1-9723-d07f96aec3f5	50ml	10000	10
3cf27580-6038-41e4-ab54-e96545b01b52	21e86815-37ef-4bb1-9723-d07f96aec3f5	100ml	16000	10
f086289d-e8ea-43c2-ab56-66b23edd90f7	21e86815-37ef-4bb1-9723-d07f96aec3f5	200ml	28000	10
142f6ebe-24de-49c0-aeef-283f8b22524b	27e2641e-f3aa-472b-901c-fb9e6c121517	50ml	10000	10
accacfe7-589d-41d5-a7bd-93f41a87093e	27e2641e-f3aa-472b-901c-fb9e6c121517	100ml	16000	10
be436b7b-86fc-4b8b-bc52-3bca87a28a05	27e2641e-f3aa-472b-901c-fb9e6c121517	200ml	28000	10
a186e58f-8f08-40e9-a8e2-847efb5576f2	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	50ml	10000	10
1c95ae82-f89d-403a-b600-8a64103d4e78	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	100ml	16000	10
4c030ee2-f035-424a-a9c6-db06d4bfd15c	5c2c3dd7-a5f7-4bbd-aef0-53a933b1a0f7	200ml	28000	10
4875c1af-48dd-414b-b44f-d7c81df37845	76669643-f398-4d8c-950b-e87e91fcc5dc	50ml	10000	10
bdf83bfb-f18f-4116-90ee-675231ff68b1	76669643-f398-4d8c-950b-e87e91fcc5dc	100ml	16000	10
dd040a45-358d-42ee-8218-9787cd1720da	76669643-f398-4d8c-950b-e87e91fcc5dc	200ml	28000	10
c1a131d9-8d18-4660-af53-4594d8a479cd	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	50ml	10000	10
3b380120-b47c-4f08-b15a-e1e7944c7784	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	100ml	16000	10
8e2f7693-214e-41d3-9609-d9ce77b274aa	c22e50c2-f975-4f6c-9c57-d85b7158fb4a	200ml	28000	10
1603fb6c-0f74-47ed-b40c-15008a356f02	1a3778e5-2d5c-49ca-bc30-6971c142dd90	100ml	16000	10
65a264dd-55bc-4ad4-9af2-ee34aacf7808	1a3778e5-2d5c-49ca-bc30-6971c142dd90	200ml	28000	10
d91be839-6b02-485d-b8dc-11f8c625dc61	710f4d3a-54e2-40b1-894b-461bd25408ec	50ml	10000	10
0f76f8c4-0d64-4d40-8058-031401ff55af	710f4d3a-54e2-40b1-894b-461bd25408ec	100ml	16000	10
6931b9ef-2370-4809-8295-9eb108de63cc	710f4d3a-54e2-40b1-894b-461bd25408ec	200ml	28000	10
65797585-1dcf-4682-b702-b252b609d16a	f874db57-7f97-4bdc-b2ca-e41134fcd67e	50ml	10000	10
ba6df2a1-9b77-4779-b79a-11d66e1c129d	f874db57-7f97-4bdc-b2ca-e41134fcd67e	100ml	16000	10
f1c6c071-5e41-4ad6-bf0f-f92bede98251	f874db57-7f97-4bdc-b2ca-e41134fcd67e	200ml	28000	10
5a3979f5-7652-49ba-8139-a76591093284	84da58fa-0b61-407a-b718-025e11580a93	50ml	10000	10
8c9a014e-3803-40e0-b9af-28031e00ec2f	84da58fa-0b61-407a-b718-025e11580a93	100ml	16000	10
f062a7c4-1174-4a3e-b6c6-a7ea03bb8705	84da58fa-0b61-407a-b718-025e11580a93	200ml	28000	10
af123ee9-f9c2-48eb-903e-5796274d8fb8	3c96be3f-cf06-4508-8a57-05b69cd36d4f	50ml	10000	10
83ab92ea-5ead-44c8-b026-01a419eeaec8	3c96be3f-cf06-4508-8a57-05b69cd36d4f	100ml	16000	10
19518c4e-8b4a-427e-be4a-ef3642b5ee7f	3c96be3f-cf06-4508-8a57-05b69cd36d4f	200ml	28000	10
fd4d32e5-6085-4391-9f0d-c605a15cc1ce	c7e2a675-839e-4f75-96be-4414eafe4cd2	50ml	10000	10
7cf71b14-62a6-4546-b64c-1aca48b5205e	c7e2a675-839e-4f75-96be-4414eafe4cd2	100ml	16000	10
7118493c-88c0-4278-9526-96ff8ba912b2	c7e2a675-839e-4f75-96be-4414eafe4cd2	200ml	28000	10
bce21fed-8083-437b-8804-054a6be91b22	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	50ml	10000	10
8cdf0d8a-65d2-4685-b118-b596c869edd9	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	100ml	16000	10
6d67edb3-d54d-49f8-a0c2-5e07d692c3d3	d5184e03-f50a-4e0f-b448-3f7d6d1090e3	200ml	28000	10
47ea72b6-8a3e-44d3-a0ca-45df0a646d15	a93d4a47-dece-48ef-9306-57f56fa499d5	50ml	10000	10
bcf53e8b-e34c-4472-bf6d-4c20a821bf10	a93d4a47-dece-48ef-9306-57f56fa499d5	100ml	16000	10
c8d48dea-09f5-4199-aadd-de658e7b0df3	a93d4a47-dece-48ef-9306-57f56fa499d5	200ml	28000	10
13a1d0be-ebe9-471d-a2cc-590ffbd51eb7	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	50ml	10000	10
c11e8a2a-4b75-4bef-9b62-af61ba37b02f	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	100ml	16000	10
6707e731-7f1b-4bae-9ba2-e98b31f4a873	7d0bdc52-ed96-4374-9774-ce78d2d2bca6	200ml	28000	10
b90b5fcd-d424-498a-b9e1-b0fdc5925d05	394f0f58-0cd2-4010-bc08-b18a16300fd1	50ml	10000	10
73d2e8c6-8168-4caf-b465-29a22260ea4c	394f0f58-0cd2-4010-bc08-b18a16300fd1	100ml	16000	10
63e345cf-2c40-4171-9df1-6c99675559e6	394f0f58-0cd2-4010-bc08-b18a16300fd1	200ml	28000	10
6527f58c-cb7b-4c4d-acfd-859f33a63247	e946b50a-bb23-422f-901c-bc9834e0b9d8	50ml	10000	10
4effd9d2-a5d6-4dc9-9a96-c99f8828a1c4	e946b50a-bb23-422f-901c-bc9834e0b9d8	100ml	16000	10
094ca896-da30-40fb-adef-8652b1a34cb5	e946b50a-bb23-422f-901c-bc9834e0b9d8	200ml	28000	10
b4f6f233-b504-4abc-88e9-7bb4db48bd20	3dc58dd7-9617-4636-9d21-20b318a02125	100ml	16000	10
2ba8b277-a62d-49e0-a3e3-4d5a30adce7b	3dc58dd7-9617-4636-9d21-20b318a02125	200ml	28000	10
e44e45df-455b-4347-a89d-542e12cf8c05	c50b0594-d1a2-4571-99c1-3ae820c80c97	50ml	10000	10
a7f506a9-343a-488c-bf1c-54f37bf8b0ee	c50b0594-d1a2-4571-99c1-3ae820c80c97	100ml	16000	10
2482aa08-4732-4726-83ff-9b43f8b8a2f1	c50b0594-d1a2-4571-99c1-3ae820c80c97	200ml	28000	10
33bfd3de-d36a-4f90-8c50-3497426d9681	a51f935a-1c25-4c97-a1b0-f3a48f84110d	50ml	10000	10
d7c46307-8f05-4be5-9045-fa891ef84480	a51f935a-1c25-4c97-a1b0-f3a48f84110d	100ml	16000	10
fe5acb11-159b-4a61-8cf9-da0058fc30e2	a51f935a-1c25-4c97-a1b0-f3a48f84110d	200ml	28000	10
ff524c8d-f1b2-41c2-8306-32ed2a161689	29326dc6-bbce-4b7d-bdf7-14a183f91d29	50ml	10000	10
a3f41cf6-356a-4f3d-9fc9-b0be0980d33b	29326dc6-bbce-4b7d-bdf7-14a183f91d29	100ml	16000	10
36d1f8b6-ec0d-4b96-9aac-e96c5d10e23c	29326dc6-bbce-4b7d-bdf7-14a183f91d29	200ml	28000	10
90be1fbf-413f-46c1-b2af-c12c0ea9cc10	a46bce06-0dfc-4138-9fdd-54c90d303733	50ml	10000	10
86498acf-71f8-4e17-953f-3c1ef10b2d8d	a46bce06-0dfc-4138-9fdd-54c90d303733	100ml	16000	10
7a219eb4-9b0d-4308-a13d-9c617df1837e	a46bce06-0dfc-4138-9fdd-54c90d303733	200ml	28000	10
db6cd575-a884-4ccd-95c7-ac5749896c0d	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	50ml	10000	10
d05ed5d9-a645-422b-bf53-55aa7cf41afb	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	100ml	16000	10
dc4750b2-17f3-4f4e-8c71-2288b703b36b	70e4bf39-2a9d-4593-9ba1-8ec2e507809c	200ml	28000	10
aa0ef778-f3ee-4b20-b57f-0f7b60da599b	3a198552-3977-46a7-9bec-cc0802770a86	50ml	10000	10
0171b0bb-8690-415f-835d-fdc05b6838d7	3a198552-3977-46a7-9bec-cc0802770a86	100ml	16000	10
71a7fdff-70de-4c0d-80ec-a93cd2dacac4	3a198552-3977-46a7-9bec-cc0802770a86	200ml	28000	10
76596e64-8b6d-4207-beaa-ce2256cd6060	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	50ml	10000	10
1c801a06-0a09-4e96-9fbb-7b30b0d3ee4c	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	100ml	16000	10
9b452ac0-3401-4e8b-a6b7-aff69708ee15	b285c514-7aa1-43df-a7f1-2474eaf6ba5d	200ml	28000	10
3efa91a0-22b5-4e58-9363-4eb949f0c26f	33fd7ff8-058d-4dce-9fd1-73325df504b1	50ml	10000	10
15457228-9584-4f33-8560-bca6b34d1e8d	33fd7ff8-058d-4dce-9fd1-73325df504b1	100ml	16000	10
61f5a031-c893-4e09-8d22-70486e1192e6	33fd7ff8-058d-4dce-9fd1-73325df504b1	200ml	28000	10
d625080b-9437-464c-b3fa-a95c73c10801	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	50ml	10000	10
0eded359-0e28-4e12-9f65-55e8203b2ef7	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	100ml	16000	10
e14a35a3-f938-46a9-9f02-e26955e8cedb	c6ced70f-f594-42f5-a79a-2b9d055c7a5d	200ml	28000	10
3a7c5e68-fd83-4f47-a3da-603c16bc0ad5	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	50ml	10000	10
f4069bb2-16f0-44eb-a53c-af6f3d25093a	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	100ml	16000	10
bf3f0529-02ca-44be-a490-e6199ac54ee5	75e6ad6c-c887-4923-a0cf-d43f6bd30fd2	200ml	28000	10
591304d2-297b-4095-9680-aac82c715990	778e0606-669c-4c18-8e9f-55043d1115f0	100ml	16000	10
64b8735a-8ca6-4b0f-9387-3d70aaaaeba1	778e0606-669c-4c18-8e9f-55043d1115f0	200ml	28000	10
aec9fa13-ea48-4411-8340-b315725fab9d	3595cb72-9575-4b6b-93bd-fee286dacd22	50ml	10000	10
f8b0d6f8-a2b8-43f4-bd44-54714466f7ba	3595cb72-9575-4b6b-93bd-fee286dacd22	100ml	16000	10
0f0233f8-8bbb-426d-ab3a-6290d06b2008	3595cb72-9575-4b6b-93bd-fee286dacd22	200ml	28000	10
659f4c22-776d-4f2c-8961-648a65068354	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	50ml	10000	10
2d818dc6-173d-4148-8853-95c13d3cd334	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	100ml	16000	10
d85e61eb-7a57-4d86-9977-9e4f8e469429	28f85c3d-d6c8-42a7-9fa3-f946ac86218b	200ml	28000	10
dd667a85-e678-4609-ac33-297b1ae822af	32d809a3-ffdb-4943-a764-d5a51ab9197b	50ml	10000	10
b42ee39b-c792-4ca2-8b14-c43ff8f71cd2	32d809a3-ffdb-4943-a764-d5a51ab9197b	100ml	16000	10
934d4251-e611-4c66-b556-b331ce74228d	32d809a3-ffdb-4943-a764-d5a51ab9197b	200ml	28000	10
956ae73b-8b59-4dc0-8677-5eea98aa78ff	1f91a997-29da-43c3-a68e-c685e4805c44	50ml	10000	10
ca3ef9fa-c863-4538-9829-ab308257d85f	1f91a997-29da-43c3-a68e-c685e4805c44	100ml	16000	10
a12d177c-0fb2-45bf-b0a7-e7e8d905b841	1f91a997-29da-43c3-a68e-c685e4805c44	200ml	28000	10
670c6ef7-f332-4385-8f8c-cd2bf51f32df	46a122eb-37ed-4656-9987-cad400a5d461	50ml	10000	10
7d1b8a53-c8fe-4f9b-90de-711c02a0d0d7	46a122eb-37ed-4656-9987-cad400a5d461	100ml	16000	10
c3e4a195-913f-42d0-b86a-f5503a9eb49c	46a122eb-37ed-4656-9987-cad400a5d461	200ml	28000	10
b7a6a218-72f7-4782-82c2-c7d4826611b0	debb67da-79f1-487a-8b7e-3eea8acf835e	50ml	10000	10
7d74cf84-1ab7-470c-9b82-809cc8517772	debb67da-79f1-487a-8b7e-3eea8acf835e	100ml	16000	10
990c1acc-1501-4a4a-81ce-513fda685128	debb67da-79f1-487a-8b7e-3eea8acf835e	200ml	28000	10
dfc01f36-2a9c-473e-8e6f-8125124aa839	75c176cb-6188-420d-b64c-d60bce019552	50ml	10000	10
98f45e4d-9d9a-40b0-bded-65681acfa3f2	75c176cb-6188-420d-b64c-d60bce019552	100ml	16000	10
0ea20b52-aa4b-4017-bff6-9a0b5f4df57f	75c176cb-6188-420d-b64c-d60bce019552	200ml	28000	10
0b102b87-ba00-4d6a-810a-8644365d7f83	3b17c376-e2d2-494b-ae1c-e230803d688d	50ml	10000	10
f2c03a1f-32fd-44d6-8de2-d19aa03be5fd	3b17c376-e2d2-494b-ae1c-e230803d688d	100ml	16000	10
fb0f583b-71b7-4b4c-a6a2-0a6440a28111	3b17c376-e2d2-494b-ae1c-e230803d688d	200ml	28000	10
7e5039f7-bdd3-4941-85ef-7feaf33b9851	7c6d2688-bd20-4197-8a29-7dbb5985b236	50ml	10000	10
4e2ab67b-1d9a-4404-83db-56b1fede85bc	7c6d2688-bd20-4197-8a29-7dbb5985b236	100ml	16000	10
55255045-cdcf-40c0-b5a6-0dc7fe63c633	7c6d2688-bd20-4197-8a29-7dbb5985b236	200ml	28000	10
c213e4c7-721c-482d-ad7a-52b58e425c32	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	50ml	10000	10
ec77783d-50f7-4766-b248-81f39b186dd4	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	100ml	16000	10
644d9b69-98b0-42c4-bc3f-7ccc93e1b5bf	b1f9839a-1f0d-454f-8bee-e7f62e3b3336	200ml	28000	10
001b08f6-0d04-46c4-81fb-f530575c4588	53d206c0-c23e-4dd3-a128-783b456c7717	100ml	16000	10
22704316-b15d-423b-8471-8422a9d19c07	53d206c0-c23e-4dd3-a128-783b456c7717	200ml	28000	10
3dd321b6-a2b6-4ee2-8eb1-2b3aacfcba62	0d52c6a7-65d9-4b93-964f-72063f7ed24f	50ml	10000	10
cfe03377-00b6-496b-b607-02f697f08e07	0d52c6a7-65d9-4b93-964f-72063f7ed24f	100ml	16000	10
79dfea2c-a53a-43f1-848f-62d066d6d192	0d52c6a7-65d9-4b93-964f-72063f7ed24f	200ml	28000	10
c8128c23-4480-4367-ae50-2d2c5ab2c21d	2b00c57b-169d-4e83-8445-8c167d1d6046	50ml	10000	10
b0114bf1-7358-4ce0-a4b6-27d55e4910b1	2b00c57b-169d-4e83-8445-8c167d1d6046	100ml	16000	10
7d1d91d1-a01d-446f-a238-c4dd138a238c	2b00c57b-169d-4e83-8445-8c167d1d6046	200ml	28000	10
8e555520-7155-4fee-8e0e-4c6c98ec7ee3	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	50ml	10000	10
9851adfa-7004-4ef2-945f-d88a1dccf041	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	100ml	16000	10
17864cfe-b63d-4af3-ad8c-06ce50de3898	e94b562e-0fce-4ded-8cd1-fbb2ac3aa7ab	200ml	28000	10
e18812db-9a13-4573-9846-c2c5411ed5d6	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	50ml	10000	10
3845b38f-e2a5-4256-b801-1e706bf4021b	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	100ml	16000	10
452d7178-5adf-40cb-9832-9cd21f3e08d1	3a0a1a1d-2e18-45b1-a4ff-55dcc41a7c2c	200ml	28000	10
0b9261a0-e9df-40dd-b6eb-ed2c21e32e70	a5e213c8-bcaf-487d-a232-fec41894abd2	50ml	10000	10
602b3e32-4028-40b5-9dd9-fc4fe6f869e4	a5e213c8-bcaf-487d-a232-fec41894abd2	100ml	16000	10
d07204ac-5934-4370-84c2-d071f577dacc	a5e213c8-bcaf-487d-a232-fec41894abd2	200ml	28000	10
891e56ab-c406-4391-ae86-2f9eff50739b	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	50ml	10000	10
ffdbe3a7-5b0f-4ac1-8d01-d5a6da64ffec	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	100ml	16000	10
20949976-6903-473d-b182-a78e6c794d09	97ae4cbc-7e2f-4d08-90fe-ea3b5859b12b	200ml	28000	10
787e0520-f32b-44d7-ac47-6d73ec16a0c1	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	50ml	10000	10
7001f6aa-6d7a-42c2-a564-63c27836e3c3	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	100ml	16000	10
a25e6de0-f3df-4ad0-bf3a-1c3cc9bd7689	3b4062d1-5f9b-4db6-95a0-713bdc0379fd	200ml	28000	10
dfcf7a22-02c2-4493-b6d9-a4b4e8af94f7	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	50ml	10000	10
a7fa46d7-71e7-46ae-b3c5-587d420cef7f	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	100ml	16000	10
65582f25-d953-4d96-ab7b-e359d1cec8a9	6881a4bf-bf22-4bac-b29a-55cf77c91e1d	200ml	28000	10
4af9c976-ffa8-4fb1-b7a2-830a4b861533	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	50ml	10000	10
bbe54db8-1d30-45c6-95eb-20451be6e3e0	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	100ml	16000	10
e6421233-b544-402c-8b9c-0ab032cef1dc	bd4861a7-fc98-41d3-b5b5-4c7d1f6573af	200ml	28000	10
804e5bf7-04f9-4243-84b9-2c58a6fa4424	4844ec82-0feb-4e33-95eb-f32cc0bba616	50ml	10000	10
a6e6fa27-b17c-4067-9120-4d9392995465	4844ec82-0feb-4e33-95eb-f32cc0bba616	100ml	16000	10
61c5f9fb-7a5d-4035-8850-fbee2dd270a6	4844ec82-0feb-4e33-95eb-f32cc0bba616	200ml	28000	10
dde06855-85ee-47a1-ac74-914aec002ee1	c48de798-90ac-46ab-8a7d-ce383a9b5197	100ml	16000	10
09661b38-6cab-4269-a30b-7af804c75a23	c48de798-90ac-46ab-8a7d-ce383a9b5197	200ml	28000	10
ddc037da-18d3-4a13-8ac6-d9958fe41804	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	50ml	10000	10
d1f589eb-6271-4df2-93e9-3d7d6576e59c	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	100ml	16000	10
edf99df6-22a6-4f96-b8fa-3a1e9df97991	b9aeb545-ec2a-43c1-85a1-56c24bb32a15	200ml	28000	10
799b8df7-7be6-4516-b353-880a186d5655	f1a154df-b14e-4464-919a-227c2911ba71	50ml	10000	10
d950b559-0ad8-4897-917d-aa2ef2415a44	f1a154df-b14e-4464-919a-227c2911ba71	100ml	16000	10
b1f249af-d391-4400-b8c7-53b5b4fb8cdd	f1a154df-b14e-4464-919a-227c2911ba71	200ml	28000	10
96dee5ee-ca72-4b7a-947f-b04cd2cd0f59	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	50ml	10000	10
28cd0e9c-dd77-46d7-931a-bf0a978640c1	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	100ml	16000	10
677e956f-66cd-48e5-9070-63ca53efb330	deb25bac-8fcd-43e6-bd29-94ae8cfb73b5	200ml	28000	10
8da206ac-bde8-43de-8474-117a186d3f85	7993d6f5-ae55-42f9-8a93-33469f77f97e	50ml	10000	10
5f3ffd0d-541d-42a2-b54a-19ef53fa34b5	7993d6f5-ae55-42f9-8a93-33469f77f97e	100ml	16000	10
03435ee3-b919-4bc7-84a8-ab0962ed2cdd	7993d6f5-ae55-42f9-8a93-33469f77f97e	200ml	28000	10
f2e42931-12cd-4de6-a591-08bff308030b	92ddbf21-eeb8-4dbf-b375-67b791f6f189	50ml	10000	10
6ab4b9fc-2b3d-4c59-94d1-1d7e9eb1ef8d	92ddbf21-eeb8-4dbf-b375-67b791f6f189	100ml	16000	10
333f85d8-9d74-499f-b665-0b8eb4320513	92ddbf21-eeb8-4dbf-b375-67b791f6f189	200ml	28000	10
4907ac96-ec87-46c8-982b-1040531a2481	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	50ml	10000	10
dfde0257-ee5b-413a-a363-df0ad62b6b36	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	100ml	16000	10
eb45dce2-9477-40f5-82e4-b38f5d286944	26f0b3e5-0c85-48d8-bc41-38cbc3c8f690	200ml	28000	10
9946292d-ffb5-4509-a46f-1778db18466d	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	50ml	10000	10
0b8e7dd7-f5d4-4128-b439-ef17518e092f	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	100ml	16000	10
7888840b-3926-4a61-8714-52ff28f7609c	ad10563b-0a2e-4fbf-ba81-3d924ee0f8f5	200ml	28000	10
20c664f8-c2ca-474e-ac75-f543a45e9fdc	52bead5d-2a56-47f3-991a-efa29d065eb9	50ml	10000	10
0c708c25-458e-41dc-beb7-3f15c2f7454c	52bead5d-2a56-47f3-991a-efa29d065eb9	100ml	16000	10
ae2c932a-8421-4cc9-ba92-5f2eff97a18c	52bead5d-2a56-47f3-991a-efa29d065eb9	200ml	28000	10
de8215fa-07c3-4b10-9962-efd09a0c185a	828cd953-6202-4314-8377-610c699ac17a	50ml	10000	10
c530c99e-e9f8-44fb-b62e-f1945c833654	828cd953-6202-4314-8377-610c699ac17a	100ml	16000	10
88ed4a1d-59b6-4207-8fae-72386f523132	828cd953-6202-4314-8377-610c699ac17a	200ml	28000	10
f194fb27-d7e3-40c5-bd26-d48bdacd20a4	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	50ml	10000	10
cf96ade5-c05e-4c39-b76d-29d28ee182b2	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	100ml	16000	10
53f2b02a-f6be-45d1-81c9-38570f4496bb	9dfc3a86-7728-4a26-9d12-e661f8bf97c5	200ml	28000	10
17e7c82b-83ce-4b12-ad37-a54370ce6bb8	94bab4ad-8004-4231-a575-05d4778d1b31	100ml	16000	10
3725ecb1-7e2e-4683-b72b-841dee8a7413	94bab4ad-8004-4231-a575-05d4778d1b31	200ml	28000	10
fd73879c-6351-4996-86e5-3895e477f577	29161948-28d9-496c-b580-4db234dcfd49	50ml	10000	10
2afa68c8-9b05-480c-b59c-80d7bd837722	29161948-28d9-496c-b580-4db234dcfd49	100ml	16000	10
d397a182-3c03-40ce-b659-553f71ac965a	29161948-28d9-496c-b580-4db234dcfd49	200ml	28000	10
82e3ae99-ba47-4e8e-8226-39401ff6f6a5	4fe0dc57-7dbc-4219-b34d-e17eef96168a	50ml	10000	10
fc59b730-c181-476c-b6ff-4f5e544ed6c5	4fe0dc57-7dbc-4219-b34d-e17eef96168a	100ml	16000	10
19bb2551-eb57-4343-880c-e8e53e9de779	4fe0dc57-7dbc-4219-b34d-e17eef96168a	200ml	28000	10
1dcfa045-86cf-452f-9318-1a45abb2db5f	64a976f5-a78e-4dcd-88bd-7412386b16a7	50ml	10000	10
e1e1ffae-0efa-4836-8c8f-01e485d9308a	64a976f5-a78e-4dcd-88bd-7412386b16a7	100ml	16000	10
ec712d7f-7e7e-4995-acd9-2d604b1f181c	64a976f5-a78e-4dcd-88bd-7412386b16a7	200ml	28000	10
d1f36120-4d75-4edb-b5bf-7e218174be74	39591cde-e167-4fa1-b3cb-3a620edcfbe2	50ml	10000	10
d0f73deb-6de1-405e-ac81-54d4502aae0c	39591cde-e167-4fa1-b3cb-3a620edcfbe2	100ml	16000	10
d32da10f-3f49-4453-b186-cd73e5850c6d	39591cde-e167-4fa1-b3cb-3a620edcfbe2	200ml	28000	10
4caa4115-e65b-474b-a09b-2f5511585ca0	5334b375-acf6-426b-b62d-96cfd55e373a	50ml	10000	10
cfabd5ce-6ff0-4c6f-8fea-6884677172ca	5334b375-acf6-426b-b62d-96cfd55e373a	100ml	16000	10
0409fd63-ba96-4c48-941b-434939f61a00	5334b375-acf6-426b-b62d-96cfd55e373a	200ml	28000	10
9cbe39a8-328f-4039-97e0-81b7c6d1d5ad	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	50ml	10000	10
40c1cac1-83ce-4842-820a-7e7ac3e488e6	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	100ml	16000	10
e9cdfd8f-056c-4cd0-b500-90fc5d23227b	fb3f2610-2d3c-451b-bf4b-8d62dcf4e3a0	200ml	28000	10
2081c7ed-2c70-4d1b-97bf-d8baaeadfebe	3d99d65a-33df-4ebe-bc41-2ad546d6790c	50ml	10000	10
1a8a312a-2afd-4189-9b7d-3b958518f539	3d99d65a-33df-4ebe-bc41-2ad546d6790c	100ml	16000	10
7ac75492-ac4c-443d-95b9-45208639677f	3d99d65a-33df-4ebe-bc41-2ad546d6790c	200ml	28000	10
2587c412-69c5-43a0-9fc7-cccf64890011	7041706b-03c9-4811-9e66-5f44df1e8c2d	50ml	10000	10
4637f409-3d88-4015-8443-606d804f9c41	7041706b-03c9-4811-9e66-5f44df1e8c2d	100ml	16000	10
6168b6d6-49e3-46bf-b7d5-fbfbb53c61b7	7041706b-03c9-4811-9e66-5f44df1e8c2d	200ml	28000	10
c0537266-5932-4026-9ba3-5bdd6844aa28	5deff441-fa44-45dd-b557-2bae4131ed87	50ml	10000	10
c40aaf60-2979-4e49-a043-9ac60d8036b8	5deff441-fa44-45dd-b557-2bae4131ed87	100ml	16000	10
06d58b40-4211-4628-b44a-764a747e360c	5deff441-fa44-45dd-b557-2bae4131ed87	200ml	28000	10
c9b10877-7dfb-4911-b291-cc08dc5dcc0b	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	50ml	10000	10
02c45e33-c11f-447a-962b-400ed47fd2d4	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	100ml	16000	10
a79da6d6-94ee-4409-9649-166147667046	62c612e9-9e2f-45cb-b23c-e6e099d7c9cf	200ml	28000	10
01ce7f6d-2f4e-4259-904b-7389a23b28d6	3d9de990-655a-412f-a171-2e99c9ec7a98	100ml	16000	10
09620da5-452b-416c-83f2-9d9b8c076607	3d9de990-655a-412f-a171-2e99c9ec7a98	200ml	28000	10
545a1ef2-b3c8-4058-8bf6-50eb9402d17d	531ebefb-9720-4d57-9031-13a9ae5d2666	50ml	10000	10
3cfaf40f-5fb5-4320-af12-305339a8fcd2	531ebefb-9720-4d57-9031-13a9ae5d2666	100ml	16000	10
1c220144-00cc-4696-9a83-3291cae1dd8e	531ebefb-9720-4d57-9031-13a9ae5d2666	200ml	28000	10
56a45299-77c6-45a7-b283-f4359076339a	d8f8529a-9239-4f99-a49c-1d88abc62488	50ml	10000	10
f7eda628-8e5c-48ab-a0a9-f8076fbcfae6	d8f8529a-9239-4f99-a49c-1d88abc62488	100ml	16000	10
48a5210a-533a-4828-ae10-5a777b5f1c98	d8f8529a-9239-4f99-a49c-1d88abc62488	200ml	28000	10
f6cdaff9-02ca-4cd1-aac4-af53652a595d	93ece844-6dee-4add-bc57-7dec482e45ce	50ml	10000	10
92bfef85-99c5-4ea1-bf8a-c9a0671815ff	93ece844-6dee-4add-bc57-7dec482e45ce	100ml	16000	10
13045109-5b51-45f9-9345-dc59f54ec855	93ece844-6dee-4add-bc57-7dec482e45ce	200ml	28000	10
7d841af9-6bd9-4963-868d-4633f18d8c3e	f0a75e56-d4da-429e-98b7-92d643d55138	50ml	10000	10
e4f3e29b-37ba-44e5-a757-bd508d29920b	f0a75e56-d4da-429e-98b7-92d643d55138	100ml	16000	10
41dbd700-8834-4a49-bc53-32175d1c1584	f0a75e56-d4da-429e-98b7-92d643d55138	200ml	28000	10
75aaa330-4f96-4f70-a5a2-2017d5c58814	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	50ml	10000	10
bb6aa834-e4c9-42bf-90e2-f51b59d5f635	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	100ml	16000	10
45e464ca-03c0-4145-91f8-302f0e7e643b	8a3bdaf6-b7cb-4a60-9826-12b81180e0e2	200ml	28000	10
43e40e41-f3c3-4d51-944a-bb5dcb11b291	3f9b2867-b203-475b-85c5-e7faeb445d21	50ml	10000	10
e546086d-d1ee-4de7-bb03-c9c129a2598f	3f9b2867-b203-475b-85c5-e7faeb445d21	100ml	16000	10
8cebf85c-8567-4503-8fcc-baec1ebd06f3	3f9b2867-b203-475b-85c5-e7faeb445d21	200ml	28000	10
97a09734-452e-4e30-9cbe-fc7f3959ea03	6059c523-1080-40f7-85a1-059e006f4086	50ml	10000	10
8995f848-c3f0-49f3-8600-b22ae04d0069	6059c523-1080-40f7-85a1-059e006f4086	100ml	16000	10
2ade2322-d07f-446b-8580-d35db4aaf28a	6059c523-1080-40f7-85a1-059e006f4086	200ml	28000	10
bda5eee4-20e2-4a02-a89c-c4dfeed05745	775919b4-f2a5-4d06-8a03-b75f8f322d6a	50ml	10000	10
151d889e-ad59-4161-b669-6ee130c5b4d5	775919b4-f2a5-4d06-8a03-b75f8f322d6a	100ml	16000	10
2e38b789-5f0f-409a-aaee-8e9ef1954911	775919b4-f2a5-4d06-8a03-b75f8f322d6a	200ml	28000	10
a2bf94cb-d647-4f74-8ebe-620a89e618be	280ca217-97f0-454a-a18e-0d952e3f0b1d	50ml	10000	10
3af786b4-d53c-4f3b-8420-2a3fdd82d521	280ca217-97f0-454a-a18e-0d952e3f0b1d	100ml	16000	10
662a423c-e373-460f-9baf-20db2a1dd997	280ca217-97f0-454a-a18e-0d952e3f0b1d	200ml	28000	10
68cb9815-0146-458f-987f-81b8bfa0bf46	bab6c3d5-c460-43f7-a660-6d6b8747318b	50ml	10000	10
01b932c9-ce4a-4b41-9c68-9a0eb279c74b	bab6c3d5-c460-43f7-a660-6d6b8747318b	100ml	16000	10
f0c37ec8-8b2f-4001-805e-9ea93689b3c1	bab6c3d5-c460-43f7-a660-6d6b8747318b	200ml	28000	10
70e9d87b-cb71-41cf-bde2-6c45f1abd275	96218f01-4d39-4de3-a748-6dd625db4252	50ml	10000	10
aafaed4b-0259-4247-9899-704169cd3c18	96218f01-4d39-4de3-a748-6dd625db4252	100ml	16000	10
ba33d487-f5e4-430e-90fd-c3e002305253	96218f01-4d39-4de3-a748-6dd625db4252	200ml	28000	10
c3a7773d-ad02-4166-8f26-2f655c521ccc	884828eb-60d9-4423-bc31-a487113c38e7	50ml	10000	10
9dcb84fd-4d97-4844-841e-f863ff854602	884828eb-60d9-4423-bc31-a487113c38e7	100ml	16000	10
594e3529-b3c7-4a94-87b8-c8723936e701	884828eb-60d9-4423-bc31-a487113c38e7	200ml	28000	10
04735b04-0841-4f61-bb9b-9a89773a73e3	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	50ml	10000	10
ca76ecd1-7446-472a-8149-9796da990edf	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	100ml	16000	10
99e63150-aa62-4faa-87da-0d776456add8	89f69073-7c68-4e9e-852e-df3cf5cfe3d8	200ml	28000	10
0b888eff-3d3d-4318-ad15-7315e8d43a68	ec873406-a5b2-4f2a-b007-522847f4fc86	50ml	10000	10
785c67db-43ed-4d8b-a6b1-181260f662bf	ec873406-a5b2-4f2a-b007-522847f4fc86	100ml	16000	10
5bf8508c-df6d-499e-a467-d5ef378b96e7	ec873406-a5b2-4f2a-b007-522847f4fc86	200ml	28000	10
bcb96200-4c56-448e-b8c8-ebe5334bd21d	f29e0936-5075-4959-9f3a-8e0631322a56	50ml	10000	10
25830e0f-1ac9-411b-a374-6b482f868a21	f29e0936-5075-4959-9f3a-8e0631322a56	100ml	16000	10
8cff106d-09f7-408f-8d30-a0bfedb5a606	f29e0936-5075-4959-9f3a-8e0631322a56	200ml	28000	10
fe3f2f99-2e8b-44d7-89d3-05df303b26a5	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	50ml	10000	10
d895375f-55c7-41b7-8e9a-51a640ab9815	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	100ml	16000	10
1dc20211-cc23-4875-bad8-81472879c8bb	13fa70e8-af8d-4dc6-9dc0-209dadc113ad	200ml	28000	10
81279cf5-a820-4264-95b1-01d6ee92ab66	39d50a82-2cdd-434d-86a0-697a11b8b4e8	50ml	10000	10
abac6a84-f740-4cda-bf25-a34d19c4ef2b	39d50a82-2cdd-434d-86a0-697a11b8b4e8	100ml	16000	10
5c0340a3-85a4-459f-9aa7-f6485d76509d	39d50a82-2cdd-434d-86a0-697a11b8b4e8	200ml	28000	10
8b45ff87-3b73-4721-861a-681ba826195b	6ca38c24-ff0b-4de6-bb02-7728da1a152c	50ml	10000	10
763f8302-641a-45c8-b733-50b722997a96	6ca38c24-ff0b-4de6-bb02-7728da1a152c	100ml	16000	10
8d561341-dbf6-434a-94ae-328d0dda6f98	6ca38c24-ff0b-4de6-bb02-7728da1a152c	200ml	28000	10
79045166-f69b-409c-aada-0fcf7ea8fb42	891f007b-b216-4b69-82ae-7bba793fa2d2	50ml	10000	10
bb38f10e-6b56-406a-83de-546d6fcad3e8	891f007b-b216-4b69-82ae-7bba793fa2d2	100ml	16000	10
7a75a423-a383-49d9-a90e-eba17b2920b8	891f007b-b216-4b69-82ae-7bba793fa2d2	200ml	28000	10
68611fff-4ee1-4b79-aa6e-9585251e6411	c9b4438b-d77e-4678-8ea5-0986c8de862e	50ml	10000	10
c2977415-39a1-4e85-8272-00e4b707819b	c9b4438b-d77e-4678-8ea5-0986c8de862e	100ml	16000	10
630ebbe8-b574-4014-9474-a92042d2dff3	c9b4438b-d77e-4678-8ea5-0986c8de862e	200ml	28000	10
cc9fc1df-7379-42a2-af5b-dec197782ce0	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	50ml	10000	10
e5ec2857-3a22-4e7a-a8d3-32ec0c38ba64	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	100ml	16000	10
3901370d-3d25-4b64-9e2f-df3b42e8fad3	4be392bc-6e58-405d-b73f-b6cc1f74d1ef	200ml	28000	10
1e74e693-a135-490c-be22-a88af588dabe	145289af-7463-4277-a429-6bf5c918586f	50ml	10000	10
0cad0969-22bf-4ed0-a526-91f3c6e675c3	145289af-7463-4277-a429-6bf5c918586f	100ml	16000	10
d8fa349e-7ebc-4eb3-b19e-4f5640726a74	145289af-7463-4277-a429-6bf5c918586f	200ml	28000	10
6e4ecdfe-9d5d-4db6-b2ff-7da2264fa138	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	50ml	10000	10
4a2425ce-95c2-4103-92d7-8cff23ddbb92	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	100ml	16000	10
5b839cf8-00d0-4743-a000-5f914d4baa9f	bc9d5a4d-b5ac-4ba5-a58e-5c5b43dd3a49	200ml	28000	10
35c46509-ff54-4439-9ecd-ed4dc108f660	8241db8f-cd01-4e71-a0df-4be5525223fe	50ml	10000	10
71942eb0-beb7-4eb7-8e57-3d6a46351cd9	8241db8f-cd01-4e71-a0df-4be5525223fe	100ml	16000	10
631d6702-3a18-4893-9b40-e8e849b3c57b	8241db8f-cd01-4e71-a0df-4be5525223fe	200ml	28000	10
8d48e72a-4afa-4729-907d-33d429cc1584	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	50ml	10000	10
eea6111a-6480-4a1a-be21-d2d8d92a7910	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	100ml	16000	10
72e2ef01-2f9d-4b34-8295-090a841b6e6c	837a351b-724f-4d47-8a3f-5dbd5e4ad8a8	200ml	28000	10
ad7bc707-7c5b-4ed2-af37-e5f37cb97047	080c200f-9f88-4fb3-9aeb-c460331b4fad	50ml	10000	10
56ff9124-be49-4332-80bb-31bd815fb1e5	080c200f-9f88-4fb3-9aeb-c460331b4fad	100ml	16000	10
a426dd0f-251d-4f93-8cee-da12781788cf	080c200f-9f88-4fb3-9aeb-c460331b4fad	200ml	28000	10
61edc66e-4a03-4fb8-b99c-2672af345768	39f1b89f-b571-4834-92b4-cf83698fd761	50ml	10000	10
ab812ee0-f304-4f67-a646-b4f7216680bf	39f1b89f-b571-4834-92b4-cf83698fd761	100ml	16000	10
11bd5a24-6e27-4537-af4b-51380a6985e0	39f1b89f-b571-4834-92b4-cf83698fd761	200ml	28000	10
129f4c7e-2097-4763-8856-57c1fe19e8bf	6c1bcd69-500d-4906-96b0-e95132ffe395	50ml	10000	10
78be8562-155a-4fa5-8455-4a46fa18a081	6c1bcd69-500d-4906-96b0-e95132ffe395	100ml	16000	10
6ae51c58-ae14-43cd-87b8-ef8c5f4b2509	6c1bcd69-500d-4906-96b0-e95132ffe395	200ml	28000	10
43f49370-243c-44a3-876f-7db6701b8bcc	f716cb4e-a53b-4637-9305-15a4ae9cd578	50ml	10000	10
303f2522-9560-44be-8726-d694f0c44eb1	f716cb4e-a53b-4637-9305-15a4ae9cd578	100ml	16000	10
74086bb1-573d-4963-af11-5da1ab2262da	f716cb4e-a53b-4637-9305-15a4ae9cd578	200ml	28000	10
3483d95c-81b7-4b72-825c-e2d3af3f1888	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	50ml	10000	10
465af9db-e233-4ff4-b0a8-0ad0928df135	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	100ml	16000	10
d823cfa0-faec-44fc-ae91-682a58a537fc	3cf8faa8-ab96-4785-887c-7c02fb5e34ae	200ml	28000	10
da5df48d-4602-458f-b526-b17f87f4fa6d	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	50ml	10000	10
0e70437f-c26e-4593-94fb-26fa07ec0dd2	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	100ml	16000	10
a331d8ba-918c-4a4a-a1d2-5ab9b92e7d03	f77a3a8c-e1bd-4c84-9326-a1e3e7241100	200ml	28000	10
2ac87f83-4e6b-4133-b3a3-c23e4b828f28	3f1fea43-0c89-4a0f-9c85-69a142b7de27	50ml	10000	10
1353dac8-7c98-4908-995e-6a0b29e8372a	3f1fea43-0c89-4a0f-9c85-69a142b7de27	100ml	16000	10
c1570dfd-bb70-4fa5-af3d-edfaf8b1424a	3f1fea43-0c89-4a0f-9c85-69a142b7de27	200ml	28000	10
b7c6fbbd-0591-4f73-939f-01618b193832	826baa70-73c7-4b98-9be5-a081641317d9	50ml	10000	10
d40de161-dccd-4c67-b8ae-02a1d1cd95c3	826baa70-73c7-4b98-9be5-a081641317d9	100ml	16000	10
31980e83-fb06-4fd2-81a8-8e39cfa6544b	826baa70-73c7-4b98-9be5-a081641317d9	200ml	28000	10
7a21e9d5-133c-4697-b2cd-645a96dc5c48	1116477c-81da-486d-98a7-5e92c071c2e4	50ml	10000	10
634578ba-c127-4f2a-bdfd-bf3cc55a83e8	1116477c-81da-486d-98a7-5e92c071c2e4	100ml	16000	10
405e60fa-9748-4cfe-8656-9135cc37d0e6	1116477c-81da-486d-98a7-5e92c071c2e4	200ml	28000	10
77eea968-8733-4563-8aa8-23ca0be93d9f	83315f2e-fe15-4968-8917-05e6d7106235	50ml	10000	10
13ef8bbb-b894-422d-a969-999a2f9fad86	83315f2e-fe15-4968-8917-05e6d7106235	100ml	16000	10
2a810857-9276-4edb-ac2c-12c9d2c90b7e	83315f2e-fe15-4968-8917-05e6d7106235	200ml	28000	10
a56a65f0-a13c-4d52-b661-03d64d14002c	9b38d053-84d0-4542-924b-51079e6d990c	50ml	10000	10
b83243fb-6c6b-4bd2-8201-1024f6b0292b	9b38d053-84d0-4542-924b-51079e6d990c	100ml	16000	10
86716d0b-76c6-4541-856f-1a8cc5f416d2	9b38d053-84d0-4542-924b-51079e6d990c	200ml	28000	10
6381c1fb-a9d8-433a-8762-6a5c845b529c	5e8816d8-42f1-4315-aced-83173f06eb1b	50ml	10000	10
a532c6d8-6dcb-4736-8025-4e2b82f2ff71	5e8816d8-42f1-4315-aced-83173f06eb1b	100ml	16000	10
511e4c34-fe71-4f82-8bc4-e9850d4d5fd6	5e8816d8-42f1-4315-aced-83173f06eb1b	200ml	28000	10
83cc2dca-e98d-432b-a36e-2d59f2e53d11	b7a6b456-f7db-4152-849b-b3ff6487805f	50ml	10000	10
7237010b-0e80-40df-85b5-431f271c46b6	b7a6b456-f7db-4152-849b-b3ff6487805f	100ml	16000	10
82d00faa-4e13-473b-b263-78f12d6347c4	b7a6b456-f7db-4152-849b-b3ff6487805f	200ml	28000	10
c6500f1e-ff5f-4aff-ab09-513c324209cf	ce254908-2739-4993-89ec-7e9dc4379ee2	50ml	10000	10
4f028a21-fc69-47d2-bc4a-b3fc2c1908e4	ce254908-2739-4993-89ec-7e9dc4379ee2	100ml	16000	10
9bb41457-a98f-4004-ad9e-490d4c0017cd	ce254908-2739-4993-89ec-7e9dc4379ee2	200ml	28000	10
2340951c-8613-4459-9cd8-15f276ad6d91	eb056ab6-5177-4883-88e7-ea202e37c92a	50ml	10000	10
0e95953e-e7d1-47a4-a6ca-1d21f46ea06e	eb056ab6-5177-4883-88e7-ea202e37c92a	100ml	16000	10
37607cb8-2cbe-49ea-9ba7-11d79d3afb21	eb056ab6-5177-4883-88e7-ea202e37c92a	200ml	28000	10
62f506b3-a693-4d54-bcca-8156bc7b2d4d	81d4b029-3dec-4b52-87f2-ff106b930076	50ml	10000	10
1db6b60e-fea0-48d9-bf77-b1c85fa9e278	81d4b029-3dec-4b52-87f2-ff106b930076	100ml	16000	10
60f11c06-15a6-4715-9ca0-87ded8c91430	81d4b029-3dec-4b52-87f2-ff106b930076	200ml	28000	10
aa7e8528-f094-4f3e-8ca0-88cca05d40c9	67338e16-a200-4937-a647-72f4a7218d40	50ml	10000	10
93abfcaa-b67e-4e6a-9290-e41bf295aa4f	67338e16-a200-4937-a647-72f4a7218d40	100ml	16000	10
401450bc-5af2-4414-aab0-e4836b15480a	67338e16-a200-4937-a647-72f4a7218d40	200ml	28000	10
637cb45b-dec4-42f9-af72-f27e45372616	3cb20ea9-d992-44b2-8df1-4966c40fa52f	50ml	10000	10
92410d75-571a-45ca-abba-0a5e706224f1	3cb20ea9-d992-44b2-8df1-4966c40fa52f	100ml	16000	10
de70b898-678d-4d2e-8bc4-1c50c51b8670	3cb20ea9-d992-44b2-8df1-4966c40fa52f	200ml	28000	10
14881982-529a-40ce-ac6f-8aae9283e586	135c0949-7a6a-4655-83bd-b5620476af5d	50ml	10000	10
e8903930-e5b5-4595-8c1f-716644e0cd36	135c0949-7a6a-4655-83bd-b5620476af5d	100ml	16000	10
a7f68eaf-f5ac-4476-97ea-46ec685fffce	135c0949-7a6a-4655-83bd-b5620476af5d	200ml	28000	10
a16b2d11-3c9f-4269-8e8b-6466ca512626	699d15ea-c9f1-46ad-961e-caafd8417ec7	50ml	10000	10
97b61762-ee6f-4445-8283-bc3283535753	699d15ea-c9f1-46ad-961e-caafd8417ec7	100ml	16000	10
e1437bc6-5a69-4c74-a1aa-59091d437a60	699d15ea-c9f1-46ad-961e-caafd8417ec7	200ml	28000	10
aef590c0-cec0-46f9-8429-bbc070b6139c	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	50ml	10000	10
10ff34be-af19-4c48-b193-6b86a62d3b3b	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	100ml	16000	10
dcd8fa9d-a7f8-498e-b411-7a2ce022196a	931cf7ac-5c5a-479a-8f5c-de4aeceb027a	200ml	28000	10
9c74edf5-c2f9-41ff-9fec-eb2b6c4e045e	d38eaac4-f66c-4e17-b50e-b26128346195	50ml	10000	10
f4016ad1-71d6-4dea-ac80-125e02b752ea	d38eaac4-f66c-4e17-b50e-b26128346195	100ml	16000	10
0d974eec-f97a-46a5-8273-177287a3ec4f	d38eaac4-f66c-4e17-b50e-b26128346195	200ml	28000	10
df1a3e36-1a3d-4970-93ea-d9f19264193e	b3b64900-2aec-410f-81ce-c6472e1d0e3b	50ml	10000	10
791dc063-c854-4b11-ba55-ccd1e8047a82	b3b64900-2aec-410f-81ce-c6472e1d0e3b	100ml	16000	10
f30f06e7-24d7-4649-91e0-79843e0929db	b3b64900-2aec-410f-81ce-c6472e1d0e3b	200ml	28000	10
420d6a54-2de9-4a35-920f-faf5496c3306	131577eb-5549-4503-853c-f6aa2cc8fffb	50ml	10000	10
089775da-63ed-4066-83ed-dbf201e65b56	131577eb-5549-4503-853c-f6aa2cc8fffb	100ml	16000	10
fb36c082-b399-4f0a-ac86-e5cd744d8ffd	131577eb-5549-4503-853c-f6aa2cc8fffb	200ml	28000	10
7a4c89d4-ad9b-427d-b1b8-92497fabd8ca	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	50ml	10000	10
5b96c8b2-0e0a-408d-9d75-0cb7af7669d8	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	100ml	16000	10
16ca5481-1442-4d13-87d6-c1eef89a32c5	f3c0cd36-278f-41b9-a9ef-07385dc8bb45	200ml	28000	10
26dca692-a1b7-4f00-a021-9e12cd9db50f	23c96d2c-f0bc-44c6-985d-ae133ff60463	50ml	10000	10
0485b102-0e72-4bb8-b40b-b16fc76b3154	23c96d2c-f0bc-44c6-985d-ae133ff60463	100ml	16000	10
bca012c0-6810-433c-af0d-8e8a01586f31	23c96d2c-f0bc-44c6-985d-ae133ff60463	200ml	28000	10
6d0eac88-e9c1-485b-94a7-14cf462ac668	b24c1163-1aa1-48a2-939f-384c7fdb54b8	50ml	10000	10
e1b29516-bf04-462d-9437-969b710d9752	b24c1163-1aa1-48a2-939f-384c7fdb54b8	100ml	16000	10
d0a8d4ff-4a95-4d86-9afe-22426cb94d5a	b24c1163-1aa1-48a2-939f-384c7fdb54b8	200ml	28000	10
3ffed0a5-77f9-4263-8559-8aa129a24dcc	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	50ml	10000	10
48cc640d-ad9f-4b06-86d8-f3f77f869e3a	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	100ml	16000	10
84d78d3c-a714-4b95-bf0f-ead96c2307ad	f71c8ba0-3a40-48ff-9ea4-e90a0c94bf9a	200ml	28000	10
d59d24ca-399b-4406-b8d3-6e68a1e2f5d5	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	50ml	10000	10
d87af94b-6ff0-484a-aa86-b86511122793	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	100ml	16000	10
7eb2852b-3937-4a06-a190-7d428303b437	6e1bf9ce-9bae-4e23-acd2-50975712ed7c	200ml	28000	10
cc1452db-ad6f-4254-b877-95de58e50702	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	50ml	10000	10
ea4e409b-a764-4315-a4d2-d3c0371780ed	d241c3dc-53d9-49c0-9ba4-4f3021379bd6	100ml	16000	10
84abf345-9539-4dca-80ec-3cb378ca1662	2a473ea8-80a8-4e61-b9d4-90934b86b7af	50ml	10000	10
d67621e2-993f-4384-b59e-a68959ba8195	2a473ea8-80a8-4e61-b9d4-90934b86b7af	100ml	16000	10
6259cdd7-df4b-46c2-bd89-6361064d07df	2a473ea8-80a8-4e61-b9d4-90934b86b7af	200ml	28000	10
87f62b15-cd1d-4f07-88d6-58f96c1d11d9	56e35a49-ecda-4caa-b0fd-415b90d4da83	50ml	10000	10
1c33a522-5573-476f-afa0-04d07d91cb15	56e35a49-ecda-4caa-b0fd-415b90d4da83	100ml	16000	10
d47f41d5-e3a7-4171-b8ee-755f93162e6e	56e35a49-ecda-4caa-b0fd-415b90d4da83	200ml	28000	10
f1387879-401a-474b-bd05-baf4e2c414c7	f5fee43d-13f3-43bb-8508-b08bda80dd2c	50ml	10000	20
77a3d07a-bb60-4838-a2fb-f34aa09b8922	767bc26f-f467-4b3f-9e70-f66c29c51718	100ml	16000	20
7fb2893b-ecfb-467a-b840-a6e562127914	ec08e506-0d25-4292-933a-7e77d056197c	50ml	10000	20
f1f9d58c-7119-46a4-95cf-bf932be78433	7f1cb136-a5b1-4306-9704-62588862fbc2	50ml	10000	20
129725a9-6c5b-4c54-a03b-09aadb7f50ae	0d8cc034-6fc7-4e4e-be73-3e250babb0fb	200ml	28000	20
619c6077-c290-432d-b999-1590a1a01c3f	5ff2b307-6c42-4108-926a-6e6fa1fac47b	200ml	28000	20
0d334db1-57c7-427e-a4d2-8ff031422ea4	f5fee43d-13f3-43bb-8508-b08bda80dd2c	200ml	28000	30
\.


--
-- Data for Name: Sale; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sale" (id, invoice_number, "employeeId", seller_user_id, seller_name_snapshot, seller_role_snapshot, sale_source, subtotal, discount_total, total, amount_received, change_amount, payment_method, status, notes, employee_note, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: SaleItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SaleItem" (id, "saleId", "productId", product_name_ar, product_name_en, product_sku, quantity, unit_price, total_price, volume) FROM stdin;
\.


--
-- Data for Name: SecurityEvent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SecurityEvent" (id, ip_address, event_type, details, is_blocked, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SiteSettings" (id, key, value, value_type, category, label_ar, label_en, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-07-04 15:34:42
20211116045059	2026-07-04 15:34:44
20211116050929	2026-07-04 15:34:44
20211116051442	2026-07-04 15:34:45
20211116212300	2026-07-04 15:34:46
20211116213355	2026-07-04 15:34:46
20211116213934	2026-07-04 15:34:47
20211116214523	2026-07-04 15:34:48
20211122062447	2026-07-04 15:34:49
20211124070109	2026-07-04 15:34:50
20211202204204	2026-07-04 15:34:50
20211202204605	2026-07-04 15:34:51
20211210212804	2026-07-04 15:34:53
20211228014915	2026-07-04 15:34:54
20220107221237	2026-07-04 15:34:55
20220228202821	2026-07-04 15:34:55
20220312004840	2026-07-04 15:34:56
20220603231003	2026-07-04 15:34:57
20220603232444	2026-07-04 15:34:58
20220615214548	2026-07-04 15:34:59
20220712093339	2026-07-04 15:34:59
20220908172859	2026-07-04 15:35:00
20220916233421	2026-07-04 15:35:01
20230119133233	2026-07-04 15:35:01
20230128025114	2026-07-04 15:35:02
20230128025212	2026-07-04 15:35:03
20230227211149	2026-07-04 15:35:04
20230228184745	2026-07-04 15:35:04
20230308225145	2026-07-04 15:35:05
20230328144023	2026-07-04 15:35:06
20231018144023	2026-07-04 15:35:07
20231204144023	2026-07-04 15:35:08
20231204144024	2026-07-04 15:35:08
20231204144025	2026-07-04 15:35:09
20240108234812	2026-07-04 15:35:10
20240109165339	2026-07-04 15:35:10
20240227174441	2026-07-04 15:35:12
20240311171622	2026-07-04 15:35:13
20240321100241	2026-07-04 15:35:14
20240401105812	2026-07-04 15:35:16
20240418121054	2026-07-04 15:35:17
20240523004032	2026-07-04 15:35:20
20240618124746	2026-07-04 15:35:20
20240801235015	2026-07-04 15:35:21
20240805133720	2026-07-04 15:35:22
20240827160934	2026-07-04 15:35:22
20240919163303	2026-07-04 15:35:23
20240919163305	2026-07-04 15:35:24
20241019105805	2026-07-04 15:35:25
20241030150047	2026-07-04 15:35:27
20241108114728	2026-07-04 15:35:28
20241121104152	2026-07-04 15:35:29
20241130184212	2026-07-04 15:35:30
20241220035512	2026-07-04 15:35:30
20241220123912	2026-07-04 15:35:31
20241224161212	2026-07-04 15:35:32
20250107150512	2026-07-04 15:35:32
20250110162412	2026-07-04 15:35:33
20250123174212	2026-07-04 15:35:34
20250128220012	2026-07-04 15:35:35
20250506224012	2026-07-04 15:35:35
20250523164012	2026-07-04 15:35:36
20250714121412	2026-07-04 15:35:36
20250905041441	2026-07-04 15:35:37
20251103001201	2026-07-04 15:35:38
20251120212548	2026-07-04 15:35:39
20251120215549	2026-07-04 15:35:39
20260218120000	2026-07-04 15:35:40
20260326120000	2026-07-04 15:35:41
20260514120000	2026-07-04 15:35:42
20260527120000	2026-07-04 15:35:43
20260528120000	2026-07-04 15:35:45
20260603120000	2026-07-04 15:35:45
20260605120000	2026-07-04 15:35:46
20260606110000	2026-07-04 15:35:47
20260616120000	2026-07-04 15:35:50
20260624120000	2026-07-04 15:35:51
20260626120000	2026-07-04 15:35:54
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter, selected_columns) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-07-04 14:31:15.880463
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-07-04 14:31:15.941295
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-07-04 14:31:15.950689
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-07-04 14:31:15.982903
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-07-04 14:31:16.013104
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-07-04 14:31:16.023345
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-07-04 14:31:16.033389
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-07-04 14:31:16.043331
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-07-04 14:31:16.05573
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-07-04 14:31:16.065413
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-07-04 14:31:16.076864
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-07-04 14:31:16.086548
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-07-04 14:31:16.096527
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-07-04 14:31:16.106984
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-07-04 14:31:16.119042
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-07-04 14:31:16.175637
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-07-04 14:31:16.185702
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-07-04 14:31:16.197233
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-07-04 14:31:16.207398
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-07-04 14:31:16.220167
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-07-04 14:31:16.234769
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-07-04 14:31:16.248186
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-07-04 14:31:16.269038
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-07-04 14:31:16.299632
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-07-04 14:31:16.309909
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-07-04 14:31:16.324262
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-07-04 14:31:16.334196
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-07-04 14:31:16.343772
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-07-04 14:31:16.352605
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-07-04 14:31:16.364208
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-07-04 14:31:16.374201
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-07-04 14:31:16.384462
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-07-04 14:31:16.393922
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-07-04 14:31:16.404303
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-07-04 14:31:16.413749
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-07-04 14:31:16.426142
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-07-04 14:31:16.435712
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-07-04 14:31:16.44522
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-07-04 14:31:16.456422
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-07-04 14:31:16.484136
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-07-04 14:31:16.495324
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-07-04 14:31:16.50477
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-07-04 14:31:16.513829
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-07-04 14:31:16.522712
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-07-04 14:31:16.531455
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-07-04 14:31:16.542519
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-07-04 14:31:16.559379
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-07-04 14:31:16.57013
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-07-04 14:31:16.579577
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-07-04 14:31:16.623716
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-07-04 14:31:16.637104
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-07-04 14:31:16.687299
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-07-04 14:31:16.691217
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-07-04 14:31:16.709374
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-07-04 14:31:16.714466
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-07-04 14:31:16.717744
56	fix-optimized-search-function	b823ed1e418101032fa01374edc9a436e54e3ed4	2026-07-04 14:31:16.735057
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-07-04 14:31:16.747959
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-07-04 14:31:16.760041
59	drop-unused-functions	38456f13e39691c2bbb4b5151d0d1cdbabd4a8c4	2026-07-04 14:31:16.771374
60	optimize-existing-functions-again	db35e1c91a9201e59f4fef8d972c2f277d68b157	2026-07-04 14:31:16.782567
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- Name: BlockedIP BlockedIP_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlockedIP"
    ADD CONSTRAINT "BlockedIP_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: ContactInquiry ContactInquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactInquiry"
    ADD CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY (id);


--
-- Name: Discount Discount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount"
    ADD CONSTRAINT "Discount_pkey" PRIMARY KEY (id);


--
-- Name: EmployeePermission EmployeePermission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmployeePermission"
    ADD CONSTRAINT "EmployeePermission_pkey" PRIMARY KEY (id);


--
-- Name: Employee Employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (id);


--
-- Name: GlobalPricingSettings GlobalPricingSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GlobalPricingSettings"
    ADD CONSTRAINT "GlobalPricingSettings_pkey" PRIMARY KEY (id);


--
-- Name: InventoryMovement InventoryMovement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InventoryMovement"
    ADD CONSTRAINT "InventoryMovement_pkey" PRIMARY KEY (id);


--
-- Name: LoginAttempt LoginAttempt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginAttempt"
    ADD CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY (id);


--
-- Name: ProductAccord ProductAccord_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductAccord"
    ADD CONSTRAINT "ProductAccord_pkey" PRIMARY KEY (id);


--
-- Name: ProductFamilyTag ProductFamilyTag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductFamilyTag"
    ADD CONSTRAINT "ProductFamilyTag_pkey" PRIMARY KEY (id);


--
-- Name: ProductVariant ProductVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: SaleItem SaleItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_pkey" PRIMARY KEY (id);


--
-- Name: Sale Sale_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_pkey" PRIMARY KEY (id);


--
-- Name: SecurityEvent SecurityEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SecurityEvent"
    ADD CONSTRAINT "SecurityEvent_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: messages messages_payload_exclusive; Type: CHECK CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages
    ADD CONSTRAINT messages_payload_exclusive CHECK (((payload IS NULL) OR (binary_payload IS NULL))) NOT VALID;


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: idx_users_created_at_desc; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_users_created_at_desc ON auth.users USING btree (created_at DESC);


--
-- Name: idx_users_email; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_users_email ON auth.users USING btree (email);


--
-- Name: idx_users_last_sign_in_at_desc; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_users_last_sign_in_at_desc ON auth.users USING btree (last_sign_in_at DESC);


--
-- Name: idx_users_name; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_users_name ON auth.users USING btree (((raw_user_meta_data ->> 'name'::text))) WHERE ((raw_user_meta_data ->> 'name'::text) IS NOT NULL);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- Name: BlockedIP_ip_address_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlockedIP_ip_address_idx" ON public."BlockedIP" USING btree (ip_address);


--
-- Name: BlockedIP_ip_address_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BlockedIP_ip_address_key" ON public."BlockedIP" USING btree (ip_address);


--
-- Name: Category_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Category_is_active_idx" ON public."Category" USING btree (is_active);


--
-- Name: Category_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Category_slug_idx" ON public."Category" USING btree (slug);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: ContactInquiry_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ContactInquiry_created_at_idx" ON public."ContactInquiry" USING btree (created_at);


--
-- Name: ContactInquiry_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ContactInquiry_status_idx" ON public."ContactInquiry" USING btree (status);


--
-- Name: ContactInquiry_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ContactInquiry_type_idx" ON public."ContactInquiry" USING btree (type);


--
-- Name: Discount_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Discount_is_active_idx" ON public."Discount" USING btree (is_active);


--
-- Name: Discount_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Discount_productId_idx" ON public."Discount" USING btree ("productId");


--
-- Name: EmployeePermission_employeeId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "EmployeePermission_employeeId_key" ON public."EmployeePermission" USING btree ("employeeId");


--
-- Name: Employee_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Employee_is_active_idx" ON public."Employee" USING btree (is_active);


--
-- Name: Employee_username_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Employee_username_idx" ON public."Employee" USING btree (username);


--
-- Name: Employee_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Employee_username_key" ON public."Employee" USING btree (username);


--
-- Name: InventoryMovement_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "InventoryMovement_created_at_idx" ON public."InventoryMovement" USING btree (created_at);


--
-- Name: InventoryMovement_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "InventoryMovement_productId_idx" ON public."InventoryMovement" USING btree ("productId");


--
-- Name: LoginAttempt_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LoginAttempt_created_at_idx" ON public."LoginAttempt" USING btree (created_at);


--
-- Name: LoginAttempt_ip_address_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LoginAttempt_ip_address_idx" ON public."LoginAttempt" USING btree (ip_address);


--
-- Name: LoginAttempt_user_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LoginAttempt_user_type_idx" ON public."LoginAttempt" USING btree (user_type);


--
-- Name: ProductAccord_name_ar_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductAccord_name_ar_idx" ON public."ProductAccord" USING btree (name_ar);


--
-- Name: ProductAccord_productId_position_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductAccord_productId_position_key" ON public."ProductAccord" USING btree ("productId", "position");


--
-- Name: ProductFamilyTag_productId_tag_ar_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductFamilyTag_productId_tag_ar_key" ON public."ProductFamilyTag" USING btree ("productId", tag_ar);


--
-- Name: ProductFamilyTag_tag_ar_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductFamilyTag_tag_ar_idx" ON public."ProductFamilyTag" USING btree (tag_ar);


--
-- Name: ProductVariant_productId_volume_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductVariant_productId_volume_key" ON public."ProductVariant" USING btree ("productId", volume);


--
-- Name: Product_categoryId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_categoryId_idx" ON public."Product" USING btree ("categoryId");


--
-- Name: Product_featured_on_frontend_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_featured_on_frontend_idx" ON public."Product" USING btree (featured_on_frontend);


--
-- Name: Product_gender_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_gender_idx" ON public."Product" USING btree (gender);


--
-- Name: Product_main_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_main_category_idx" ON public."Product" USING btree (main_category);


--
-- Name: Product_needs_review_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_needs_review_idx" ON public."Product" USING btree (needs_review);


--
-- Name: Product_season_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_season_idx" ON public."Product" USING btree (season);


--
-- Name: Product_sku_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_sku_idx" ON public."Product" USING btree (sku);


--
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- Name: Product_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_slug_idx" ON public."Product" USING btree (slug);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: Product_source_excel_row_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_source_excel_row_key" ON public."Product" USING btree (source_excel_row);


--
-- Name: Product_visible_on_website_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_visible_on_website_idx" ON public."Product" USING btree (visible_on_website);


--
-- Name: SaleItem_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SaleItem_productId_idx" ON public."SaleItem" USING btree ("productId");


--
-- Name: SaleItem_saleId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SaleItem_saleId_idx" ON public."SaleItem" USING btree ("saleId");


--
-- Name: Sale_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Sale_created_at_idx" ON public."Sale" USING btree (created_at);


--
-- Name: Sale_employeeId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Sale_employeeId_idx" ON public."Sale" USING btree ("employeeId");


--
-- Name: Sale_invoice_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Sale_invoice_number_idx" ON public."Sale" USING btree (invoice_number);


--
-- Name: Sale_invoice_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Sale_invoice_number_key" ON public."Sale" USING btree (invoice_number);


--
-- Name: Sale_sale_source_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Sale_sale_source_idx" ON public."Sale" USING btree (sale_source);


--
-- Name: Sale_seller_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Sale_seller_user_id_idx" ON public."Sale" USING btree (seller_user_id);


--
-- Name: Sale_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Sale_status_idx" ON public."Sale" USING btree (status);


--
-- Name: SecurityEvent_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SecurityEvent_created_at_idx" ON public."SecurityEvent" USING btree (created_at);


--
-- Name: SecurityEvent_ip_address_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SecurityEvent_ip_address_idx" ON public."SecurityEvent" USING btree (ip_address);


--
-- Name: SecurityEvent_is_blocked_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SecurityEvent_is_blocked_idx" ON public."SecurityEvent" USING btree (is_blocked);


--
-- Name: SiteSettings_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SiteSettings_category_idx" ON public."SiteSettings" USING btree (category);


--
-- Name: SiteSettings_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SiteSettings_key_idx" ON public."SiteSettings" USING btree (key);


--
-- Name: SiteSettings_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SiteSettings_key_key" ON public."SiteSettings" USING btree (key);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_selec; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_selec ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter, COALESCE(selected_columns, '{}'::text[]));


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: Discount Discount_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount"
    ADD CONSTRAINT "Discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EmployeePermission EmployeePermission_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmployeePermission"
    ADD CONSTRAINT "EmployeePermission_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: InventoryMovement InventoryMovement_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InventoryMovement"
    ADD CONSTRAINT "InventoryMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LoginAttempt LoginAttempt_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginAttempt"
    ADD CONSTRAINT "LoginAttempt_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProductAccord ProductAccord_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductAccord"
    ADD CONSTRAINT "ProductAccord_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductFamilyTag ProductFamilyTag_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductFamilyTag"
    ADD CONSTRAINT "ProductFamilyTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductVariant ProductVariant_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SaleItem SaleItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SaleItem SaleItem_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sale"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Sale Sale_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION pg_reload_conf(); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_reload_conf() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO dashboard_user;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION send_binary(payload bytea, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION wal2json_escape_identifier(name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.wal2json_escape_identifier(name text) TO postgres;
GRANT ALL ON FUNCTION realtime.wal2json_escape_identifier(name text) TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE custom_oauth_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.custom_oauth_providers TO postgres;
GRANT ALL ON TABLE auth.custom_oauth_providers TO dashboard_user;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_client_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_client_states TO postgres;
GRANT ALL ON TABLE auth.oauth_client_states TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE webauthn_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_challenges TO postgres;
GRANT ALL ON TABLE auth.webauthn_challenges TO dashboard_user;


--
-- Name: TABLE webauthn_credentials; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_credentials TO postgres;
GRANT ALL ON TABLE auth.webauthn_credentials TO dashboard_user;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict 5twnLfOrqeMdTpNCZvLLIerHV3qPNp6x1gXa8KHxpBP8Z51ReguZ33TkFEgVl5n

