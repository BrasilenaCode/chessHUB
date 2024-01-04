--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2024-01-04 17:28:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 25504)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 25566)
-- Name: follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follow (
    seguito character varying NOT NULL,
    seguace character varying NOT NULL,
    stato boolean NOT NULL
);


ALTER TABLE public.follow OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 25505)
-- Name: iscrizione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iscrizione (
    utente character varying NOT NULL,
    torneo bigint NOT NULL
);


ALTER TABLE public.iscrizione OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25510)
-- Name: partita; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partita (
    id bigint NOT NULL,
    giocatore1 character varying,
    giocatore2 character varying,
    torneo bigint NOT NULL,
    data date NOT NULL,
    esito character varying NOT NULL,
    turno integer NOT NULL,
    pgn text
);


ALTER TABLE public.partita OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25515)
-- Name: partita_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partita_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partita_sequence OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25516)
-- Name: torneo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.torneo (
    id bigint NOT NULL,
    nome character varying NOT NULL,
    data_inizio date NOT NULL,
    data_fine date NOT NULL,
    luogo character varying NOT NULL,
    stato character varying NOT NULL,
    vincitore character varying,
    numero_partecipanti integer NOT NULL
);


ALTER TABLE public.torneo OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25521)
-- Name: torneo_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.torneo_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.torneo_sequence OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25522)
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    nome character varying NOT NULL,
    cognome character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    data_nascita date NOT NULL,
    "nazionalità" character varying NOT NULL,
    admin boolean NOT NULL
);


ALTER TABLE public.utente OWNER TO postgres;

--
-- TOC entry 4814 (class 0 OID 25566)
-- Dependencies: 221
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follow (seguito, seguace, stato) FROM stdin;
\.


--
-- TOC entry 4808 (class 0 OID 25505)
-- Dependencies: 215
-- Data for Name: iscrizione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.iscrizione (utente, torneo) FROM stdin;
k	1
k1	1
k2	1
k3	1
k4	1
marghe	1
k6	2
\.


--
-- TOC entry 4809 (class 0 OID 25510)
-- Dependencies: 216
-- Data for Name: partita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partita (id, giocatore1, giocatore2, torneo, data, esito, turno, pgn) FROM stdin;
7	k	k4	1	2023-12-30	0	1	\N
9	k	k3	1	2023-12-30	0	2	\N
10	k4	k2	1	2023-12-30	0	2	\N
11	k	k2	1	2023-12-30	0	3	\N
12	k3	k1	1	2023-12-30	0	3	\N
13	k	k1	1	2023-12-30	0	4	\N
14	k2	k4	1	2023-12-30	0	4	\N
15	k	k4	1	2023-12-30	0	1	\N
16	k1	k3	1	2023-12-30	0	1	\N
17	k	k3	1	2023-12-30	0	2	\N
18	k4	k2	1	2023-12-30	0	2	\N
19	k	k2	1	2023-12-30	0	3	\N
20	k3	k1	1	2023-12-30	0	3	\N
21	k	k1	1	2023-12-30	0	4	\N
22	k2	k4	1	2023-12-30	0	4	\N
23	k	k4	1	2023-12-30	0	1	\N
24	k1	k3	1	2023-12-30	0	1	\N
25	k	k3	1	2023-12-30	0	2	\N
26	k4	k2	1	2023-12-30	0	2	\N
27	k	k2	1	2023-12-30	0	3	\N
28	k3	k1	1	2023-12-30	0	3	\N
29	k	k1	1	2023-12-30	0	4	\N
30	k2	k4	1	2023-12-30	0	4	\N
31	k	k4	1	2023-12-30	0	1	\N
32	k1	k3	1	2023-12-30	0	1	\N
33	k	k3	1	2023-12-30	0	2	\N
34	k4	k2	1	2023-12-30	0	2	\N
35	k	k2	1	2023-12-30	0	3	\N
36	k3	k1	1	2023-12-30	0	3	\N
37	k	k1	1	2023-12-30	0	4	\N
38	k2	k4	1	2023-12-30	0	4	\N
39	k	k4	1	2023-12-30	0	1	\N
40	k1	k3	1	2023-12-30	0	1	\N
41	k	k3	1	2023-12-30	0	2	\N
42	k4	k2	1	2023-12-30	0	2	\N
43	k	k2	1	2023-12-30	0	3	\N
44	k3	k1	1	2023-12-30	0	3	\N
45	k	k1	1	2023-12-30	0	4	\N
46	k2	k4	1	2023-12-30	0	4	\N
47	k	k4	1	2023-12-30	0	1	\N
48	k1	k3	1	2023-12-30	0	1	\N
49	k	k3	1	2023-12-30	0	2	\N
50	k4	k2	1	2023-12-30	0	2	\N
51	k	k2	1	2023-12-30	0	3	\N
52	k3	k1	1	2023-12-30	0	3	\N
53	k	k1	1	2023-12-30	0	4	\N
54	k2	k4	1	2023-12-30	0	4	\N
8	k1	k3	1	2023-12-30	0	1	1. e4 e5 2. Bc4 Bc5 3. Nf3 Nc6 4. O-O Nf6 5. Nc3 d6 6. d3 Bg4 7. Bg5
\.


--
-- TOC entry 4811 (class 0 OID 25516)
-- Dependencies: 218
-- Data for Name: torneo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.torneo (id, nome, data_inizio, data_fine, luogo, stato, vincitore, numero_partecipanti) FROM stdin;
8	Torneo di prova	2023-12-28	2023-12-28	milano	attuale	filo	10
11	Barollo	2023-12-07	2023-12-13	Milano	attuale	\N	0
7	Torneo di prova	2023-12-28	2023-12-28	milano	concluso	filo	10
9	Torneo di prova	2023-12-28	2023-12-28	milano	inCorso	filo	10
10	Torneo di prova	2023-12-28	2023-12-28	milano	inCorso	filo	10
1	ciao	2012-12-12	2012-12-12	k	prossimo	fili	5
2	ciao	2012-12-12	2012-12-12	k	prossimo	fili	1
\.


--
-- TOC entry 4813 (class 0 OID 25522)
-- Dependencies: 220
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (nome, cognome, username, password, data_nascita, "nazionalità", admin) FROM stdin;
Filippo	Filiberto	filo	lala	2023-12-28	italiano	f
filippo	s	j	k	2013-11-02	j	t
Filippo	Filiberto	fili	lala	2023-12-27	italiano	f
gianluca	s	k4	k	2013-11-02	j	t
gianluca	s	k6	k	2013-11-02	j	t
gianluca	s	k7	k	2013-11-02	j	t
gianluca	s	k8	k	2013-11-02	j	t
gianluca	s	k9	k	2013-11-02	j	t
gianluca	s	k10	k	2013-11-02	j	t
gianluca	s	k11	k	2013-11-02	j	t
gianluca	s	k12	k	2013-11-02	j	t
gianluca	s	k13	k	2013-11-02	j	t
gianluca	s	k14	k	2013-11-02	j	t
gianluca	s	k15	k	2013-11-02	j	t
gianluca	s	k16	k	2013-11-02	j	t
gianluca	s	k17	k	2013-11-02	j	t
gianluca	s	k18	k	2013-11-02	j	t
gianluca	s	k19	k	2013-11-02	j	t
gianluca	s	k20	k	2013-11-02	j	t
gianluca	s	k21	k	2013-11-02	j	t
gianluca	s	k22	k	2013-11-02	j	t
gianluca	s	k23	k	2013-11-02	j	t
gianluca	s	k	k	2013-11-02	j	t
gianluca	s	k1	k	2013-11-02	j	t
gianluca	s	k2	k	2013-11-02	j	t
gianluca	s	k5	k	2013-11-02	j	f
gianluca	s	k3	k	2013-11-02	j	t
Alessia	Martini	m	m	2023-12-27	italiana	f
l	l	l	k	2021-12-10	italiana	f
margherita	valente	marghe	2023	2023-12-13	Canadese	f
k	k	kl	k	2023-12-06	Cinese	f
eg	ge	itsmexp	k	2002-11-30	Italiana	f
\.


--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 217
-- Name: partita_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partita_sequence', 54, true);


--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 219
-- Name: torneo_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.torneo_sequence', 11, true);


--
-- TOC entry 4652 (class 2606 OID 25528)
-- Name: iscrizione iscrizione_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_pk PRIMARY KEY (utente, torneo);


--
-- TOC entry 4654 (class 2606 OID 25530)
-- Name: partita partita_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_pk PRIMARY KEY (id);


--
-- TOC entry 4656 (class 2606 OID 25532)
-- Name: torneo torneo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_pk PRIMARY KEY (id);


--
-- TOC entry 4658 (class 2606 OID 25534)
-- Name: utente utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pk PRIMARY KEY (username);


--
-- TOC entry 4659 (class 2606 OID 25535)
-- Name: iscrizione iscrizione_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk FOREIGN KEY (utente) REFERENCES public.utente(username);


--
-- TOC entry 4660 (class 2606 OID 25540)
-- Name: iscrizione iscrizione_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk_1 FOREIGN KEY (torneo) REFERENCES public.torneo(id);


--
-- TOC entry 4661 (class 2606 OID 25545)
-- Name: partita partita_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk FOREIGN KEY (giocatore1) REFERENCES public.utente(username);


--
-- TOC entry 4662 (class 2606 OID 25550)
-- Name: partita partita_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_1 FOREIGN KEY (giocatore2) REFERENCES public.utente(username);


--
-- TOC entry 4663 (class 2606 OID 25555)
-- Name: partita partita_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_2 FOREIGN KEY (torneo) REFERENCES public.torneo(id);


--
-- TOC entry 4664 (class 2606 OID 25560)
-- Name: torneo torneo_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_fk FOREIGN KEY (vincitore) REFERENCES public.utente(username);


--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-01-04 17:28:09

--
-- PostgreSQL database dump complete
--

