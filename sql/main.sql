CREATE TABLE pcriskguide
(
    id bigserial,
    code integer NOT NULL,
    grade text,
    ebmethod text DEFAULT ''::text,
    cdnper integer,
    usper integer,
    mandatory boolean,
    effectivedate date DEFAULT now(),
    expirydate date DEFAULT '2075-12-31',
    CONSTRAINT main_pkey PRIMARY KEY (id)
);

CREATE INDEX main_code_idx
    ON main(code);

CREATE INDEX main_effectivedate_idx
    ON main(effectivedate);

CREATE INDEX main_expirydate_idx
    ON main(expirydate);
