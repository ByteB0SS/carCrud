-- Configurações básicas
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- TIPOS ENUM: só cria se não existir (CREATE TYPE não tem IF NOT EXISTS => usamos checagem)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fuel_enum') THEN
    CREATE TYPE public.fuel_enum AS ENUM (
      'Gasolina','Diesel','Flex','Elétrico','Híbrido','Outro'
    );
  END IF;
END;
$$;

ALTER TYPE public.fuel_enum OWNER TO postgres;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transmission_enum') THEN
    CREATE TYPE public.transmission_enum AS ENUM (
      'Manual','Automático','CVT','Semi-automático','Outro'
    );
  END IF;
END;
$$;

ALTER TYPE public.transmission_enum OWNER TO postgres;

SET default_tablespace = '';
SET default_table_access_method = heap;

-- TABELA ADMINS (cria só se não existir)
CREATE TABLE IF NOT EXISTS public.admins (
    id integer NOT NULL,
    admin_name character varying(50) NOT NULL,
    pass_word character varying(150) NOT NULL,
    role character varying(30) DEFAULT 'normal'::character varying NOT NULL
);
ALTER TABLE IF EXISTS public.admins OWNER TO postgres;

-- SEQUENCE ADMINS (cria se não existir)
CREATE SEQUENCE IF NOT EXISTS public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE IF EXISTS public.admins_id_seq OWNER TO postgres;
ALTER SEQUENCE IF EXISTS public.admins_id_seq OWNED BY public.admins.id;

-- TABELA CARS (cria só se não existir)
CREATE TABLE IF NOT EXISTS public.cars (
    id integer NOT NULL,
    brand character varying(150) NOT NULL,
    model character varying(150) NOT NULL,
    color character varying(30) NOT NULL,
    seating_capacity integer NOT NULL,
    fuel_type public.fuel_enum NOT NULL,
    wheelbase_cm real NOT NULL,
    transmission_type public.transmission_enum,
    license_plate character varying(150) NOT NULL,
    acquisition_year integer NOT NULL,
    engine_number character varying(150) NOT NULL,
    displacement_cc integer NOT NULL,
    chassis_number character varying(150) NOT NULL,
    tire_measurements character varying(150) NOT NULL,
    number_of_cylinders integer NOT NULL,
    gross_weight_kg integer NOT NULL,
    curb_weight_kg integer NOT NULL,
    custom_fuel_type character varying(100),
    custom_transmission_type character varying(100),
    vehicle_credential character varying(150) NOT NULL,
    vehicle_type character varying(50) NOT NULL,
    issued_at date NOT NULL,
    valid_until date NOT NULL,
    CONSTRAINT cars_fuel_type_check CHECK (
        (fuel_type)::text = ANY (ARRAY[
            'Gasolina'::text,'Diesel'::text,'Flex'::text,'Elétrico'::text,'Híbrido'::text,'Outro'::text
        ])
    ),
    CONSTRAINT cars_transmission_type_check CHECK (
        (transmission_type)::text = ANY (ARRAY[
            'Manual'::text,'Automático'::text,'CVT'::text,'Semi-automático'::text,'Outro'::text
        ])
    )
);
ALTER TABLE IF EXISTS public.cars OWNER TO postgres;

-- SEQUENCE CARS
CREATE SEQUENCE IF NOT EXISTS public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE IF EXISTS public.cars_id_seq OWNER TO postgres;
ALTER SEQUENCE IF EXISTS public.cars_id_seq OWNED BY public.cars.id;

-- DEFAULTS
ALTER TABLE IF EXISTS public.admins 
    ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);

ALTER TABLE IF EXISTS public.cars 
    ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);

-- INSERÇÃO DO ADMIN ROOT
INSERT INTO public.admins (id, admin_name, pass_word, role)
SELECT 5, 'root', '$2b$15$wnZAVOTVfOkkLWgF5GVlDO2Twxb7rfQDxySsYSTQY3ZNcIYo7i21K', 'root'
WHERE NOT EXISTS (SELECT 1 FROM public.admins WHERE admin_name = 'root');

-- Ajusta sequences para evitar colisão
SELECT pg_catalog.setval(
  'public.admins_id_seq',
  GREATEST(COALESCE((SELECT MAX(id) FROM public.admins), 1), 1),
  true
);

SELECT pg_catalog.setval(
  'public.cars_id_seq',
  GREATEST(COALESCE((SELECT MAX(id) FROM public.cars), 1), 1),
  true
);

-- CONSTRAINTS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'admins_admin_name_key') THEN
    ALTER TABLE IF EXISTS public.admins ADD CONSTRAINT admins_admin_name_key UNIQUE (admin_name);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'admins_pkey') THEN
    ALTER TABLE IF EXISTS public.admins ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cars_license_plate_key') THEN
    ALTER TABLE IF EXISTS public.cars ADD CONSTRAINT cars_license_plate_key UNIQUE (license_plate);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cars_pkey') THEN
    ALTER TABLE IF EXISTS public.cars ADD CONSTRAINT cars_pkey PRIMARY KEY (id);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cars_vehicle_credential_key') THEN
    ALTER TABLE IF EXISTS public.cars ADD CONSTRAINT cars_vehicle_credential_key UNIQUE (vehicle_credential);
  END IF;
END;
$$;
