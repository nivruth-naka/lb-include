CREATE TABLE pcriskguidetrans
(
    id bigserial,
    mainid integer NOT NULL,
    segment jsonb,
    subsegment jsonb,
    cdnratebasis jsonb,
    usratebasis jsonb,
    CONSTRAINT trans_pkey PRIMARY KEY (id),
    CONSTRAINT trans_fkey FOREIGN KEY (mainid)
        REFERENCES main (id)
);

CREATE INDEX trans_segment_idx
    ON trans USING gin (segment);

CREATE INDEX trans_subsegment_idx
    ON trans USING gin (subsegment);
