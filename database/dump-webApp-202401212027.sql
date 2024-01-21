--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2024-01-21 20:27:33

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
-- TOC entry 5 (class 2615 OID 33834)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 33835)
-- Name: follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follow (
    seguito character varying NOT NULL,
    seguace character varying NOT NULL,
    stato boolean NOT NULL
);


ALTER TABLE public.follow OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 33840)
-- Name: iscrizione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iscrizione (
    utente character varying NOT NULL,
    torneo bigint NOT NULL,
    id bigint NOT NULL,
    punteggio integer NOT NULL
);


ALTER TABLE public.iscrizione OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 33845)
-- Name: iscrizione_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.iscrizione_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.iscrizione_sequence OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 33846)
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
    pgn text,
    privacy character varying NOT NULL
);


ALTER TABLE public.partita OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33851)
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
-- TOC entry 220 (class 1259 OID 33852)
-- Name: torneo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.torneo (
    id bigint NOT NULL,
    nome character varying NOT NULL,
    data_inizio date NOT NULL,
    data_fine date NOT NULL,
    luogo character varying NOT NULL,
    stato character varying NOT NULL,
    vincitore character varying
);


ALTER TABLE public.torneo OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33857)
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
-- TOC entry 222 (class 1259 OID 33858)
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    nome character varying NOT NULL,
    cognome character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    data_nascita date NOT NULL,
    "nazionalità" character varying NOT NULL,
    admin boolean NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public.utente OWNER TO postgres;

--
-- TOC entry 4811 (class 0 OID 33835)
-- Dependencies: 215
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follow (seguito, seguace, stato) FROM stdin;
MartinaRusso	LorenzoRossi	t
LorenzoRossi	MartinaRusso	t
AlessandroMarino	FrancescoFerrari	t
FrancescoFerrari	AlessandroMarino	t
FrancescoRicci	MattiaColombo	t
MattiaColombo	FrancescoRicci	t
GretaMarino	ChiaraRomano	t
ChiaraRomano	GretaMarino	t
AliceRicci	LeonardoEsposito	t
LeonardoEsposito	AliceRicci	t
SaraGreco	GiuliaEsposito	t
GiuliaEsposito	SaraGreco	t
TommasoRicci	AndreaRomano	t
AndreaRomano	TommasoRicci	t
AlessandroRusso	TommasoRicci	t
TommasoRicci	AlessandroRusso	t
FrancescoEsposito	LorenzoRossi	t
LorenzoRossi	FrancescoEsposito	t
MattiaColombo	GiuliaFerrari	t
GiuliaFerrari	MattiaColombo	t
EmmaFerrari	AuroraRossi	t
AuroraRossi	EmmaFerrari	t
AlessandroRicci	LorenzoFerrari	t
LorenzoFerrari	AlessandroRicci	t
GabrieleRusso	ChiaraRossi	t
ChiaraRossi	GabrieleRusso	t
GinevraRicci	GinevraBianchi	t
GinevraBianchi	GinevraRicci	t
GiuliaRicci	FrancescoFerrari	t
FrancescoFerrari	GiuliaRicci	t
AuroraFerrari	SofiaRusso	t
SofiaRusso	AuroraFerrari	t
TommasoRusso	GiuliaBianchi	t
GiuliaBianchi	TommasoRusso	t
GinevraMarino	GiuliaRicci	t
GiuliaRicci	GinevraMarino	t
SofiaColombo	FrancescoBianchi	t
FrancescoBianchi	SofiaColombo	t
GretaRusso	AndreaGreco	t
AndreaGreco	GretaRusso	t
AlessandroRossi	AuroraFerrari	t
AuroraFerrari	AlessandroRossi	t
SofiaRossi	FrancescoRicci	t
FrancescoRicci	SofiaRossi	t
GretaRusso	TommasoRicci	t
TommasoRicci	GretaRusso	t
AuroraEsposito	GabrieleFerrari	t
GabrieleFerrari	AuroraEsposito	t
GinevraFerrari	MatteoMarino	t
MatteoMarino	GinevraFerrari	t
AliceRicci	AuroraRossi	t
AuroraRossi	AliceRicci	t
AndreaRusso	AuroraEsposito	t
AuroraEsposito	AndreaRusso	t
MatteoRomano	AlessandroEsposito	t
AlessandroEsposito	MatteoRomano	t
GretaGreco	AndreaMarino	t
AndreaMarino	GretaGreco	t
TommasoEsposito	FrancescoRomano	t
FrancescoRomano	TommasoEsposito	t
GiuliaRusso	SofiaRossi	t
SofiaRossi	GiuliaRusso	t
GretaMarino	MatteoColombo	t
MatteoColombo	GretaMarino	t
MatteoColombo	MatteoFerrari	t
MatteoFerrari	MatteoColombo	t
AlessandroGreco	AndreaMarino	t
AndreaMarino	AlessandroGreco	t
ChiaraRomano	GretaFerrari	t
GretaFerrari	ChiaraRomano	t
MattiaColombo	AlessandroGreco	t
AlessandroGreco	MattiaColombo	t
FrancescoRicci	SofiaRusso	t
SofiaRusso	FrancescoRicci	t
SofiaRomano	GretaColombo	t
GretaColombo	SofiaRomano	t
MattiaRusso	SaraRicci	t
SaraRicci	MattiaRusso	t
FrancescoFerrari	GiuliaFerrari	t
GiuliaFerrari	FrancescoFerrari	t
LorenzoRusso	AliceRomano	t
AliceRomano	LorenzoRusso	t
RiccardoRomano	GiuliaRusso	t
GiuliaRusso	RiccardoRomano	t
AliceRusso	EmmaGreco	t
EmmaGreco	AliceRusso	t
SofiaRusso	AuroraMarino	t
AuroraMarino	SofiaRusso	t
SofiaRomano	AlessandroMarino	t
AlessandroMarino	SofiaRomano	t
AndreaEsposito	MattiaColombo	t
MattiaColombo	AndreaEsposito	t
GiuliaEsposito	MattiaRusso	t
MattiaRusso	GiuliaEsposito	t
AuroraMarino	MatteoMarino	t
MatteoMarino	AuroraMarino	t
MattiaRossi	GinevraRicci	t
GinevraRicci	MattiaRossi	t
ChiaraRomano	SofiaRusso	t
SofiaRusso	ChiaraRomano	t
AlessandroRomano	GabrieleGreco	t
GabrieleGreco	AlessandroRomano	t
GinevraMarino	MartinaEsposito	t
MartinaEsposito	GinevraMarino	t
LeonardoEsposito	SaraGreco	t
SaraGreco	LeonardoEsposito	t
AndreaGreco	FrancescoRomano	t
FrancescoRomano	AndreaGreco	t
GretaColombo	MatteoFerrari	t
MatteoFerrari	GretaColombo	t
MartinaEsposito	EmmaEsposito	t
EmmaEsposito	MartinaEsposito	t
EmmaRicci	AliceFerrari	t
AliceFerrari	EmmaRicci	t
GretaRusso	LeonardoRossi	t
LeonardoRossi	GretaRusso	t
AliceFerrari	GinevraRusso	t
GinevraRusso	AliceFerrari	t
GiuliaBianchi	AndreaMarino	t
AndreaMarino	GiuliaBianchi	t
AuroraMarino	ChiaraRomano	t
ChiaraRomano	AuroraMarino	t
MattiaMarino	AlessandroRusso	t
AlessandroRusso	MattiaMarino	t
LorenzoFerrari	GretaColombo	t
GretaColombo	LorenzoFerrari	t
TommasoRicci	LeonardoBianchi	t
LeonardoBianchi	TommasoRicci	t
MartinaEsposito	GabrieleRomano	t
GabrieleRomano	MartinaEsposito	t
EmmaFerrari	RiccardoGreco	t
RiccardoGreco	EmmaFerrari	t
GinevraBianchi	EmmaFerrari	t
EmmaFerrari	GinevraBianchi	t
GinevraRusso	SofiaRicci	t
SofiaRicci	GinevraRusso	t
LeonardoEsposito	AliceFerrari	t
AliceFerrari	LeonardoEsposito	t
AuroraEsposito	FrancescoBianchi	t
FrancescoBianchi	AuroraEsposito	t
SaraEsposito	AlessandroBianchi	t
AlessandroBianchi	SaraEsposito	t
LorenzoRossi	AndreaColombo	t
AndreaColombo	LorenzoRossi	t
AuroraRossi	GabrieleRomano	t
GabrieleRomano	AuroraRossi	t
GabrieleFerrari	AndreaGreco	t
AndreaGreco	GabrieleFerrari	t
GinevraRusso	MatteoRomano	t
MatteoRomano	GinevraRusso	t
SaraEsposito	SaraGreco	t
SaraGreco	SaraEsposito	t
SaraRicci	GabrieleFerrari	t
GabrieleFerrari	SaraRicci	t
GiuliaColombo	MartinaFerrari	t
MartinaFerrari	GiuliaColombo	t
GiuliaFerrari	GinevraRomano	t
GinevraRomano	GiuliaFerrari	t
MartinaBianchi	SofiaRomano	t
SofiaRomano	MartinaBianchi	t
GiuliaBianchi	GretaMarino	t
GretaMarino	GiuliaBianchi	t
ChiaraGreco	EmmaFerrari	t
EmmaFerrari	ChiaraGreco	t
MatteoMarino	GinevraRusso	t
GinevraRusso	MatteoMarino	t
GiuliaBianchi	AlessandroEsposito	t
AlessandroEsposito	GiuliaBianchi	t
AndreaRomano	MatteoMarino	t
MatteoMarino	AndreaRomano	t
AuroraGreco	MartinaEsposito	t
MartinaEsposito	AuroraGreco	t
GiuliaEsposito	EmmaEsposito	t
EmmaEsposito	GiuliaEsposito	t
MattiaColombo	LeonardoRossi	t
LeonardoRossi	MattiaColombo	t
RiccardoRossi	AliceRusso	t
AliceRusso	RiccardoRossi	t
SofiaRicci	MattiaRossi	t
MattiaRossi	SofiaRicci	t
MatteoColombo	MattiaMarino	t
MattiaMarino	MatteoColombo	t
AndreaEsposito	LeonardoRossi	t
LeonardoRossi	AndreaEsposito	t
RiccardoColombo	LorenzoFerrari	t
LorenzoFerrari	RiccardoColombo	t
TommasoRicci	AliceRusso	t
AliceRusso	TommasoRicci	t
TommasoRicci	GiuliaEsposito	t
GiuliaEsposito	TommasoRicci	t
FrancescoEsposito	AuroraRossi	t
AuroraRossi	FrancescoEsposito	t
SaraFerrari	AliceFerrari	t
AliceFerrari	SaraFerrari	t
GabrieleGreco	SofiaRomano	t
SofiaRomano	GabrieleGreco	t
itsmexp	GabrieleFerrari	f
\.


--
-- TOC entry 4812 (class 0 OID 33840)
-- Dependencies: 216
-- Data for Name: iscrizione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.iscrizione (utente, torneo, id, punteggio) FROM stdin;
AndreaRomano	17	1	0
MartinaEsposito	13	2	0
FrancescoRicci	1	3	0
GretaFerrari	14	4	0
EmmaEsposito	13	5	0
MatteoGreco	10	6	0
SaraRusso	9	7	0
GinevraBianchi	1	8	0
SofiaColombo	8	9	0
MartinaBianchi	13	10	0
SaraBianchi	20	11	0
SofiaRossi	13	12	0
RiccardoColombo	20	14	0
AuroraEsposito	1	15	0
GiuliaFerrari	1	17	0
TommasoRusso	8	18	0
AlessandroRusso	3	19	0
GinevraFerrari	17	20	0
GinevraMarino	7	21	0
AlessandroRicci	10	22	0
AliceGreco	13	23	0
LeonardoFerrari	3	24	0
EmmaGreco	14	25	0
FrancescoRicci	1	27	0
AliceMarino	10	28	0
FrancescoRicci	12	29	0
EmmaRicci	15	30	0
AuroraRossi	3	31	0
GinevraRossi	15	32	0
MattiaColombo	14	33	0
ChiaraRossi	18	34	0
GretaRomano	9	36	0
MattiaMarino	12	37	0
GretaFerrari	12	38	0
LorenzoRossi	17	40	0
GinevraRomano	12	41	0
GabrieleRossi	8	43	0
GinevraRicci	18	45	0
SaraRicci	3	46	0
AlessandroRossi	13	47	0
GretaRusso	13	48	0
MattiaRusso	18	51	0
RiccardoRomano	3	52	0
FrancescoRomano	20	53	0
AlessandroRicci	1	54	0
AlessandroGreco	20	56	0
MatteoGreco	9	57	0
MatteoGreco	10	59	0
LeonardoGreco	7	60	0
SaraBianchi	6	61	0
SaraGreco	5	62	0
ChiaraGreco	5	63	0
GretaRomano	20	64	0
GiuliaColombo	6	65	0
SaraRusso	1	66	0
AlessandroEsposito	14	68	0
SaraRicci	8	69	0
LorenzoRusso	6	70	0
GinevraRusso	3	71	0
MatteoMarino	7	72	0
SofiaRomano	5	73	0
RiccardoRossi	9	74	0
GabrieleFerrari	8	76	0
AuroraMarino	5	77	0
GinevraBianchi	18	78	0
MartinaFerrari	10	79	0
AuroraFerrari	18	80	0
AliceRicci	7	81	0
MattiaFerrari	5	82	0
TommasoRusso	1	83	0
RiccardoColombo	5	84	0
GiuliaBianchi	1	85	0
AndreaRusso	1	86	0
MartinaRicci	15	88	0
EmmaRicci	12	91	0
GabrieleRomano	3	92	0
LeonardoEsposito	6	93	0
GiuliaEsposito	15	96	0
AlessandroMarino	8	98	0
AuroraGreco	10	99	0
AndreaColombo	12	100	0
AlessandroEsposito	5	102	0
GabrieleRossi	1	103	0
GabrieleRusso	3	105	0
AliceFerrari	7	106	0
SaraEsposito	9	107	0
ChiaraGreco	14	108	0
MatteoRomano	8	110	0
AlessandroRomano	5	111	0
EmmaEsposito	8	112	0
LeonardoEsposito	7	113	0
AuroraEsposito	7	114	0
MatteoFerrari	14	116	0
GinevraEsposito	17	117	0
GretaColombo	13	119	0
GiuliaColombo	5	42	0
MartinaRicci	5	44	1
AndreaEsposito	16	94	0
RiccardoColombo	16	13	1
FrancescoFerrari	10	121	0
MartinaRusso	3	122	0
AlessandroRusso	8	124	0
GretaColombo	18	126	0
FrancescoMarino	7	128	0
LeonardoRossi	9	131	0
MatteoColombo	6	132	0
AuroraMarino	14	134	0
SofiaRicci	15	135	0
AndreaGreco	8	136	0
SofiaRossi	8	137	0
AliceRicci	12	138	0
AndreaMarino	3	139	0
EmmaColombo	10	142	0
TommasoRicci	5	143	0
MartinaRicci	6	144	0
GretaMarino	15	145	0
AliceRusso	6	147	0
RiccardoGreco	13	148	0
LorenzoFerrari	6	149	0
AndreaColombo	6	150	0
AndreaRicci	6	152	0
SaraGreco	15	153	0
TommasoRusso	5	155	0
ChiaraRusso	14	156	0
SofiaColombo	7	157	0
GretaGreco	14	158	0
AlessandroRomano	15	159	0
MartinaFerrari	6	160	0
AndreaMarino	6	161	0
AndreaRusso	3	162	0
AliceRomano	15	163	0
AlessandroMarino	14	164	0
LeonardoBianchi	20	165	0
TommasoRicci	10	167	0
ChiaraRomano	10	168	0
EmmaColombo	7	169	0
GinevraRomano	17	171	0
EmmaFerrari	9	172	0
FrancescoBianchi	20	173	0
AuroraRusso	6	175	0
MatteoEsposito	10	179	0
AlessandroBianchi	17	181	0
GabrieleGreco	17	183	0
EmmaEsposito	1	184	0
MattiaFerrari	20	185	0
AliceRusso	20	186	0
SofiaRusso	13	187	0
AlessandroRusso	14	188	0
AndreaMarino	15	189	0
SaraBianchi	17	190	0
GiuliaRusso	18	192	0
AlessandroRusso	12	193	0
FrancescoBianchi	14	195	0
AlessandroRusso	12	196	0
LeonardoRicci	18	198	0
AlessandroBianchi	18	199	0
MattiaRossi	5	39	3
GiuliaRicci	5	194	0
FrancescoEsposito	5	178	3
AndreaEsposito	5	170	1
SaraFerrari	16	191	3
GretaColombo	16	154	1
FrancescoFerrari	16	197	4
AndreaMarino	16	97	3
LeonardoBianchi	16	140	1
TommasoEsposito	19	176	5
GinevraRossi	19	120	2
GinevraRusso	19	129	4
GabrieleFerrari	19	182	5
itsmexp	19	201	10
\.


--
-- TOC entry 4814 (class 0 OID 33846)
-- Dependencies: 218
-- Data for Name: partita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partita (id, giocatore1, giocatore2, torneo, data, esito, turno, pgn, privacy) FROM stdin;
1	GinevraRicci	AlessandroBianchi	18	2024-02-09	0	1		pubblica
2	MattiaRusso	LeonardoRicci	18	2024-02-09	0	1		pubblica
3	GinevraBianchi	GiuliaRusso	18	2024-02-09	0	1		pubblica
4	AuroraFerrari	GretaColombo	18	2024-02-09	0	1		pubblica
5	ChiaraRossi	AlessandroBianchi	18	2024-02-10	0	2		pubblica
6	GinevraRicci	GiuliaRusso	18	2024-02-10	0	2		pubblica
7	MattiaRusso	GretaColombo	18	2024-02-10	0	2		pubblica
8	GinevraBianchi	AuroraFerrari	18	2024-02-10	0	2		pubblica
9	ChiaraRossi	LeonardoRicci	18	2024-02-12	0	3		pubblica
10	AlessandroBianchi	GiuliaRusso	18	2024-02-12	0	3		pubblica
11	GinevraRicci	AuroraFerrari	18	2024-02-12	0	3		pubblica
12	MattiaRusso	GinevraBianchi	18	2024-02-12	0	3		pubblica
13	ChiaraRossi	GiuliaRusso	18	2024-02-13	0	4		pubblica
14	LeonardoRicci	GretaColombo	18	2024-02-13	0	4		pubblica
15	AlessandroBianchi	AuroraFerrari	18	2024-02-13	0	4		pubblica
16	GinevraRicci	MattiaRusso	18	2024-02-13	0	4		pubblica
17	ChiaraRossi	GretaColombo	18	2024-02-14	0	5		pubblica
18	GiuliaRusso	AuroraFerrari	18	2024-02-14	0	5		pubblica
19	LeonardoRicci	GinevraBianchi	18	2024-02-14	0	5		pubblica
20	AlessandroBianchi	MattiaRusso	18	2024-02-14	0	5		pubblica
21	ChiaraRossi	AuroraFerrari	18	2024-02-16	0	6		pubblica
22	GretaColombo	GinevraBianchi	18	2024-02-16	0	6		pubblica
23	GiuliaRusso	MattiaRusso	18	2024-02-16	0	6		pubblica
24	LeonardoRicci	GinevraRicci	18	2024-02-16	0	6		pubblica
25	ChiaraRossi	GinevraBianchi	18	2024-02-17	0	7		pubblica
26	AuroraFerrari	MattiaRusso	18	2024-02-17	0	7		pubblica
27	GretaColombo	GinevraRicci	18	2024-02-17	0	7		pubblica
28	LeonardoRicci	AlessandroBianchi	18	2024-02-17	0	7		pubblica
29	ChiaraRossi	MattiaRusso	18	2024-02-18	0	8		pubblica
30	GinevraBianchi	GinevraRicci	18	2024-02-18	0	8		pubblica
31	GretaColombo	AlessandroBianchi	18	2024-02-18	0	8		pubblica
32	GiuliaRusso	LeonardoRicci	18	2024-02-18	0	8		pubblica
33	ChiaraRossi	GinevraRicci	18	2024-02-20	0	9		pubblica
34	GinevraBianchi	AlessandroBianchi	18	2024-02-20	0	9		pubblica
35	AuroraFerrari	LeonardoRicci	18	2024-02-20	0	9		pubblica
36	GretaColombo	GiuliaRusso	18	2024-02-20	0	9		pubblica
37	GiuliaColombo	AuroraRusso	6	2024-01-28	0	1		pubblica
38	LorenzoRusso	AndreaMarino	6	2024-01-28	0	1		pubblica
39	LeonardoEsposito	MartinaFerrari	6	2024-01-28	0	1		pubblica
40	MatteoColombo	AndreaRicci	6	2024-01-28	0	1		pubblica
41	MartinaRicci	AndreaColombo	6	2024-01-28	0	1		pubblica
42	AliceRusso	LorenzoFerrari	6	2024-01-28	0	1		pubblica
43	SaraBianchi	AuroraRusso	6	2024-01-31	0	2		pubblica
44	GiuliaColombo	MartinaFerrari	6	2024-01-31	0	2		pubblica
45	LorenzoRusso	AndreaRicci	6	2024-01-31	0	2		pubblica
46	LeonardoEsposito	AndreaColombo	6	2024-01-31	0	2		pubblica
47	MatteoColombo	LorenzoFerrari	6	2024-01-31	0	2		pubblica
48	MartinaRicci	AliceRusso	6	2024-01-31	0	2		pubblica
49	SaraBianchi	AndreaMarino	6	2024-02-03	0	3		pubblica
50	AuroraRusso	MartinaFerrari	6	2024-02-03	0	3		pubblica
51	GiuliaColombo	AndreaColombo	6	2024-02-03	0	3		pubblica
52	LorenzoRusso	LorenzoFerrari	6	2024-02-03	0	3		pubblica
53	LeonardoEsposito	AliceRusso	6	2024-02-03	0	3		pubblica
54	MatteoColombo	MartinaRicci	6	2024-02-03	0	3		pubblica
55	SaraBianchi	MartinaFerrari	6	2024-02-06	0	4		pubblica
56	AndreaMarino	AndreaRicci	6	2024-02-06	0	4		pubblica
57	AuroraRusso	AndreaColombo	6	2024-02-06	0	4		pubblica
58	GiuliaColombo	AliceRusso	6	2024-02-06	0	4		pubblica
59	LorenzoRusso	MartinaRicci	6	2024-02-06	0	4		pubblica
60	LeonardoEsposito	MatteoColombo	6	2024-02-06	0	4		pubblica
61	SaraBianchi	AndreaRicci	6	2024-02-08	0	5		pubblica
62	MartinaFerrari	AndreaColombo	6	2024-02-08	0	5		pubblica
63	AndreaMarino	LorenzoFerrari	6	2024-02-08	0	5		pubblica
64	AuroraRusso	AliceRusso	6	2024-02-08	0	5		pubblica
65	GiuliaColombo	MatteoColombo	6	2024-02-08	0	5		pubblica
66	LorenzoRusso	LeonardoEsposito	6	2024-02-08	0	5		pubblica
67	SaraBianchi	AndreaColombo	6	2024-02-11	0	6		pubblica
68	AndreaRicci	LorenzoFerrari	6	2024-02-11	0	6		pubblica
69	MartinaFerrari	AliceRusso	6	2024-02-11	0	6		pubblica
70	AndreaMarino	MartinaRicci	6	2024-02-11	0	6		pubblica
71	AuroraRusso	MatteoColombo	6	2024-02-11	0	6		pubblica
72	GiuliaColombo	LorenzoRusso	6	2024-02-11	0	6		pubblica
73	SaraBianchi	LorenzoFerrari	6	2024-02-14	0	7		pubblica
74	AndreaColombo	AliceRusso	6	2024-02-14	0	7		pubblica
75	AndreaRicci	MartinaRicci	6	2024-02-14	0	7		pubblica
76	MartinaFerrari	MatteoColombo	6	2024-02-14	0	7		pubblica
77	AndreaMarino	LeonardoEsposito	6	2024-02-14	0	7		pubblica
78	AuroraRusso	LorenzoRusso	6	2024-02-14	0	7		pubblica
79	SaraBianchi	AliceRusso	6	2024-02-17	0	8		pubblica
80	LorenzoFerrari	MartinaRicci	6	2024-02-17	0	8		pubblica
81	AndreaColombo	MatteoColombo	6	2024-02-17	0	8		pubblica
82	AndreaRicci	LeonardoEsposito	6	2024-02-17	0	8		pubblica
83	MartinaFerrari	LorenzoRusso	6	2024-02-17	0	8		pubblica
84	AndreaMarino	GiuliaColombo	6	2024-02-17	0	8		pubblica
85	SaraBianchi	MartinaRicci	6	2024-02-19	0	9		pubblica
86	AliceRusso	MatteoColombo	6	2024-02-19	0	9		pubblica
87	LorenzoFerrari	LeonardoEsposito	6	2024-02-19	0	9		pubblica
88	AndreaColombo	LorenzoRusso	6	2024-02-19	0	9		pubblica
89	AndreaRicci	GiuliaColombo	6	2024-02-19	0	9		pubblica
90	AndreaMarino	AuroraRusso	6	2024-02-19	0	9		pubblica
91	SaraBianchi	MatteoColombo	6	2024-02-22	0	10		pubblica
92	MartinaRicci	LeonardoEsposito	6	2024-02-22	0	10		pubblica
93	AliceRusso	LorenzoRusso	6	2024-02-22	0	10		pubblica
94	LorenzoFerrari	GiuliaColombo	6	2024-02-22	0	10		pubblica
95	AndreaRicci	AuroraRusso	6	2024-02-22	0	10		pubblica
96	MartinaFerrari	AndreaMarino	6	2024-02-22	0	10		pubblica
97	SaraBianchi	LeonardoEsposito	6	2024-02-25	0	11		pubblica
98	MatteoColombo	LorenzoRusso	6	2024-02-25	0	11		pubblica
99	MartinaRicci	GiuliaColombo	6	2024-02-25	0	11		pubblica
100	LorenzoFerrari	AuroraRusso	6	2024-02-25	0	11		pubblica
101	AndreaColombo	AndreaMarino	6	2024-02-25	0	11		pubblica
102	AndreaRicci	MartinaFerrari	6	2024-02-25	0	11		pubblica
103	SaraBianchi	LorenzoRusso	6	2024-02-28	0	12		pubblica
104	LeonardoEsposito	GiuliaColombo	6	2024-02-28	0	12		pubblica
105	MartinaRicci	AuroraRusso	6	2024-02-28	0	12		pubblica
106	AliceRusso	AndreaMarino	6	2024-02-28	0	12		pubblica
107	LorenzoFerrari	MartinaFerrari	6	2024-02-28	0	12		pubblica
108	AndreaColombo	AndreaRicci	6	2024-02-28	0	12		pubblica
109	SaraBianchi	GiuliaColombo	6	2024-03-01	0	13		pubblica
110	LeonardoEsposito	AuroraRusso	6	2024-03-01	0	13		pubblica
111	MatteoColombo	AndreaMarino	6	2024-03-01	0	13		pubblica
112	MartinaRicci	MartinaFerrari	6	2024-03-01	0	13		pubblica
113	AliceRusso	AndreaRicci	6	2024-03-01	0	13		pubblica
114	LorenzoFerrari	AndreaColombo	6	2024-03-01	0	13		pubblica
115	GretaRomano	EmmaFerrari	9	2024-02-16	0	1		pubblica
116	MatteoGreco	LeonardoRossi	9	2024-02-16	0	1		pubblica
117	RiccardoRossi	SaraEsposito	9	2024-02-16	0	1		pubblica
118	SaraRusso	EmmaFerrari	9	2024-02-18	0	2		pubblica
119	GretaRomano	SaraEsposito	9	2024-02-18	0	2		pubblica
120	MatteoGreco	RiccardoRossi	9	2024-02-18	0	2		pubblica
121	SaraRusso	LeonardoRossi	9	2024-02-21	0	3		pubblica
122	EmmaFerrari	SaraEsposito	9	2024-02-21	0	3		pubblica
123	GretaRomano	MatteoGreco	9	2024-02-21	0	3		pubblica
124	SaraRusso	SaraEsposito	9	2024-02-23	0	4		pubblica
125	LeonardoRossi	RiccardoRossi	9	2024-02-23	0	4		pubblica
126	EmmaFerrari	MatteoGreco	9	2024-02-23	0	4		pubblica
127	SaraRusso	RiccardoRossi	9	2024-02-26	0	5		pubblica
128	SaraEsposito	MatteoGreco	9	2024-02-26	0	5		pubblica
129	LeonardoRossi	GretaRomano	9	2024-02-26	0	5		pubblica
130	SaraRusso	MatteoGreco	9	2024-02-28	0	6		pubblica
131	RiccardoRossi	GretaRomano	9	2024-02-28	0	6		pubblica
132	LeonardoRossi	EmmaFerrari	9	2024-02-28	0	6		pubblica
133	SaraRusso	GretaRomano	9	2024-03-01	0	7		pubblica
134	RiccardoRossi	EmmaFerrari	9	2024-03-01	0	7		pubblica
135	SaraEsposito	LeonardoRossi	9	2024-03-01	0	7		pubblica
139	SaraGreco	TommasoRusso	5	2024-02-14	0	1		pubblica
140	ChiaraGreco	TommasoRicci	5	2024-02-14	0	1		pubblica
141	SofiaRomano	AlessandroRomano	5	2024-02-14	0	1		pubblica
142	AuroraMarino	AlessandroEsposito	5	2024-02-14	0	1		pubblica
143	MattiaFerrari	RiccardoColombo	5	2024-02-14	0	1		pubblica
144	MattiaRossi	FrancescoEsposito	5	2024-02-15	0	2		pubblica
145	GiuliaRicci	AndreaEsposito	5	2024-02-15	0	2		pubblica
146	GiuliaColombo	TommasoRusso	5	2024-02-15	0	2		pubblica
147	MartinaRicci	TommasoRicci	5	2024-02-15	0	2		pubblica
148	SaraGreco	AlessandroRomano	5	2024-02-15	0	2		pubblica
149	ChiaraGreco	AlessandroEsposito	5	2024-02-15	0	2		pubblica
150	SofiaRomano	RiccardoColombo	5	2024-02-15	0	2		pubblica
151	AuroraMarino	MattiaFerrari	5	2024-02-15	0	2		pubblica
152	MattiaRossi	AndreaEsposito	5	2024-02-16	0	3		pubblica
153	FrancescoEsposito	TommasoRusso	5	2024-02-16	0	3		pubblica
154	GiuliaRicci	TommasoRicci	5	2024-02-16	0	3		pubblica
155	GiuliaColombo	AlessandroRomano	5	2024-02-16	0	3		pubblica
156	MartinaRicci	AlessandroEsposito	5	2024-02-16	0	3		pubblica
157	SaraGreco	RiccardoColombo	5	2024-02-16	0	3		pubblica
158	ChiaraGreco	MattiaFerrari	5	2024-02-16	0	3		pubblica
159	SofiaRomano	AuroraMarino	5	2024-02-16	0	3		pubblica
160	MattiaRossi	TommasoRusso	5	2024-02-16	0	4		pubblica
161	AndreaEsposito	TommasoRicci	5	2024-02-16	0	4		pubblica
162	FrancescoEsposito	AlessandroRomano	5	2024-02-16	0	4		pubblica
163	GiuliaRicci	AlessandroEsposito	5	2024-02-16	0	4		pubblica
164	GiuliaColombo	RiccardoColombo	5	2024-02-16	0	4		pubblica
165	MartinaRicci	MattiaFerrari	5	2024-02-16	0	4		pubblica
166	SaraGreco	AuroraMarino	5	2024-02-16	0	4		pubblica
167	ChiaraGreco	SofiaRomano	5	2024-02-16	0	4		pubblica
168	MattiaRossi	TommasoRicci	5	2024-02-17	0	5		pubblica
169	TommasoRusso	AlessandroRomano	5	2024-02-17	0	5		pubblica
170	AndreaEsposito	AlessandroEsposito	5	2024-02-17	0	5		pubblica
171	FrancescoEsposito	RiccardoColombo	5	2024-02-17	0	5		pubblica
172	GiuliaRicci	MattiaFerrari	5	2024-02-17	0	5		pubblica
173	GiuliaColombo	AuroraMarino	5	2024-02-17	0	5		pubblica
174	MartinaRicci	SofiaRomano	5	2024-02-17	0	5		pubblica
175	SaraGreco	ChiaraGreco	5	2024-02-17	0	5		pubblica
176	MattiaRossi	AlessandroRomano	5	2024-02-18	0	6		pubblica
177	TommasoRicci	AlessandroEsposito	5	2024-02-18	0	6		pubblica
178	TommasoRusso	RiccardoColombo	5	2024-02-18	0	6		pubblica
179	AndreaEsposito	MattiaFerrari	5	2024-02-18	0	6		pubblica
180	FrancescoEsposito	AuroraMarino	5	2024-02-18	0	6		pubblica
181	GiuliaRicci	SofiaRomano	5	2024-02-18	0	6		pubblica
182	GiuliaColombo	ChiaraGreco	5	2024-02-18	0	6		pubblica
183	MartinaRicci	SaraGreco	5	2024-02-18	0	6		pubblica
184	MattiaRossi	AlessandroEsposito	5	2024-02-18	0	7		pubblica
185	AlessandroRomano	RiccardoColombo	5	2024-02-18	0	7		pubblica
186	TommasoRicci	MattiaFerrari	5	2024-02-18	0	7		pubblica
187	TommasoRusso	AuroraMarino	5	2024-02-18	0	7		pubblica
188	AndreaEsposito	SofiaRomano	5	2024-02-18	0	7		pubblica
189	FrancescoEsposito	ChiaraGreco	5	2024-02-18	0	7		pubblica
190	GiuliaRicci	SaraGreco	5	2024-02-18	0	7		pubblica
191	GiuliaColombo	MartinaRicci	5	2024-02-18	0	7		pubblica
192	MattiaRossi	RiccardoColombo	5	2024-02-19	0	8		pubblica
193	AlessandroEsposito	MattiaFerrari	5	2024-02-19	0	8		pubblica
194	AlessandroRomano	AuroraMarino	5	2024-02-19	0	8		pubblica
195	TommasoRicci	SofiaRomano	5	2024-02-19	0	8		pubblica
196	TommasoRusso	ChiaraGreco	5	2024-02-19	0	8		pubblica
197	AndreaEsposito	SaraGreco	5	2024-02-19	0	8		pubblica
198	FrancescoEsposito	MartinaRicci	5	2024-02-19	0	8		pubblica
199	GiuliaRicci	GiuliaColombo	5	2024-02-19	0	8		pubblica
200	MattiaRossi	MattiaFerrari	5	2024-02-20	0	9		pubblica
201	RiccardoColombo	AuroraMarino	5	2024-02-20	0	9		pubblica
202	AlessandroEsposito	SofiaRomano	5	2024-02-20	0	9		pubblica
203	AlessandroRomano	ChiaraGreco	5	2024-02-20	0	9		pubblica
204	TommasoRicci	SaraGreco	5	2024-02-20	0	9		pubblica
205	TommasoRusso	MartinaRicci	5	2024-02-20	0	9		pubblica
206	AndreaEsposito	GiuliaColombo	5	2024-02-20	0	9		pubblica
207	FrancescoEsposito	GiuliaRicci	5	2024-02-20	0	9		pubblica
208	MattiaRossi	AuroraMarino	5	2024-02-20	0	10		pubblica
209	MattiaFerrari	SofiaRomano	5	2024-02-20	0	10		pubblica
210	RiccardoColombo	ChiaraGreco	5	2024-02-20	0	10		pubblica
211	AlessandroEsposito	SaraGreco	5	2024-02-20	0	10		pubblica
212	AlessandroRomano	MartinaRicci	5	2024-02-20	0	10		pubblica
213	TommasoRicci	GiuliaColombo	5	2024-02-20	0	10		pubblica
214	TommasoRusso	GiuliaRicci	5	2024-02-20	0	10		pubblica
215	AndreaEsposito	FrancescoEsposito	5	2024-02-20	0	10		pubblica
216	MattiaRossi	SofiaRomano	5	2024-02-21	0	11		pubblica
217	AuroraMarino	ChiaraGreco	5	2024-02-21	0	11		pubblica
218	MattiaFerrari	SaraGreco	5	2024-02-21	0	11		pubblica
219	RiccardoColombo	MartinaRicci	5	2024-02-21	0	11		pubblica
220	AlessandroEsposito	GiuliaColombo	5	2024-02-21	0	11		pubblica
221	AlessandroRomano	GiuliaRicci	5	2024-02-21	0	11		pubblica
222	TommasoRicci	FrancescoEsposito	5	2024-02-21	0	11		pubblica
223	TommasoRusso	AndreaEsposito	5	2024-02-21	0	11		pubblica
224	MattiaRossi	ChiaraGreco	5	2024-02-22	0	12		pubblica
225	SofiaRomano	SaraGreco	5	2024-02-22	0	12		pubblica
226	AuroraMarino	MartinaRicci	5	2024-02-22	0	12		pubblica
227	MattiaFerrari	GiuliaColombo	5	2024-02-22	0	12		pubblica
228	RiccardoColombo	GiuliaRicci	5	2024-02-22	0	12		pubblica
229	AlessandroEsposito	FrancescoEsposito	5	2024-02-22	0	12		pubblica
230	AlessandroRomano	AndreaEsposito	5	2024-02-22	0	12		pubblica
231	TommasoRicci	TommasoRusso	5	2024-02-22	0	12		pubblica
232	MattiaRossi	SaraGreco	5	2024-02-22	0	13		pubblica
233	ChiaraGreco	MartinaRicci	5	2024-02-22	0	13		pubblica
234	SofiaRomano	GiuliaColombo	5	2024-02-22	0	13		pubblica
235	AuroraMarino	GiuliaRicci	5	2024-02-22	0	13		pubblica
236	MattiaFerrari	FrancescoEsposito	5	2024-02-22	0	13		pubblica
237	RiccardoColombo	AndreaEsposito	5	2024-02-22	0	13		pubblica
238	AlessandroEsposito	TommasoRusso	5	2024-02-22	0	13		pubblica
239	AlessandroRomano	TommasoRicci	5	2024-02-22	0	13		pubblica
240	MattiaRossi	MartinaRicci	5	2024-02-23	0	14		pubblica
241	SaraGreco	GiuliaColombo	5	2024-02-23	0	14		pubblica
242	ChiaraGreco	GiuliaRicci	5	2024-02-23	0	14		pubblica
243	SofiaRomano	FrancescoEsposito	5	2024-02-23	0	14		pubblica
244	AuroraMarino	AndreaEsposito	5	2024-02-23	0	14		pubblica
245	MattiaFerrari	TommasoRusso	5	2024-02-23	0	14		pubblica
246	RiccardoColombo	TommasoRicci	5	2024-02-23	0	14		pubblica
247	AlessandroEsposito	AlessandroRomano	5	2024-02-23	0	14		pubblica
248	MattiaRossi	GiuliaColombo	5	2024-02-24	0	15		pubblica
249	MartinaRicci	GiuliaRicci	5	2024-02-24	0	15		pubblica
250	SaraGreco	FrancescoEsposito	5	2024-02-24	0	15		pubblica
251	ChiaraGreco	AndreaEsposito	5	2024-02-24	0	15		pubblica
252	SofiaRomano	TommasoRusso	5	2024-02-24	0	15		pubblica
253	AuroraMarino	TommasoRicci	5	2024-02-24	0	15		pubblica
254	MattiaFerrari	AlessandroRomano	5	2024-02-24	0	15		pubblica
255	RiccardoColombo	AlessandroEsposito	5	2024-02-24	0	15		pubblica
260	AndreaEsposito	GretaColombo	16	2024-02-15	0	2		pubblica
262	RiccardoColombo	SaraFerrari	16	2024-02-19	0	3		pubblica
263	FrancescoFerrari	GretaColombo	16	2024-02-19	0	3		pubblica
264	AndreaEsposito	AndreaMarino	16	2024-02-19	0	3		pubblica
265	RiccardoColombo	GretaColombo	16	2024-02-23	0	4		pubblica
266	SaraFerrari	LeonardoBianchi	16	2024-02-23	0	4		pubblica
267	FrancescoFerrari	AndreaMarino	16	2024-02-23	0	4		pubblica
268	RiccardoColombo	LeonardoBianchi	16	2024-02-27	0	5		pubblica
269	GretaColombo	AndreaMarino	16	2024-02-27	0	5		pubblica
270	SaraFerrari	AndreaEsposito	16	2024-02-27	0	5		pubblica
271	RiccardoColombo	AndreaMarino	16	2024-03-02	0	6		pubblica
272	LeonardoBianchi	AndreaEsposito	16	2024-03-02	0	6		pubblica
273	SaraFerrari	FrancescoFerrari	16	2024-03-02	0	6		pubblica
274	RiccardoColombo	AndreaEsposito	16	2024-03-05	0	7		pubblica
275	LeonardoBianchi	FrancescoFerrari	16	2024-03-05	0	7		pubblica
276	GretaColombo	SaraFerrari	16	2024-03-05	0	7		pubblica
-1	custom	custom	-1	2021-01-01	-1	0		public
136	MattiaRossi	GiuliaRicci	5	2024-02-14	1	1	[Event "Festival di Bologna 7° edizione"]\n[Site "Bologna"]\n[Date "2024-02-14"]\n[Round "1"]\n[Result "1-0"]\n[White "RossiMattia"]\n[Black "RicciGiulia"]\n\n1. e3 e5 2. Nc3 Nf6 3. Bc4 Nc6 4. Nf3 Bb4 5. O-O Bxc3 6. dxc3 O-O 7. e4 h6 8. Re1 Re8 9. Bd2 b6 10. Qc1 Kh7 11. Nh4 d6 12. g3 Be6 13. Bxe6 fxe6 14. f4 exf4 15. Bxf4 Nh5 16. Ng2 Nxf4 17. Qxf4 Rf8 18. Qg4 Ne5 19. Qxe6 Nf3+ 20. Kh1 Nxe1 21. Rxe1 Qf6 22. Qd7 Qf1+ 1-0	pubblica
137	GiuliaColombo	FrancescoEsposito	5	2024-02-14	2	1	[Event "Festival di Bologna 7° edizione"]\n[Site "Bologna"]\n[Date "2024-02-14"]\n[Round "1"]\n[Result "0-1"]\n[White "ColomboGiulia"]\n[Black "EspositoFrancesco"]\n\n1. d4 d5 2. c4 Nf6 3. Nc3 c6 4. Nf3 Bg4 5. e3 Nbd7 6. cxd5 Nxd5 7. Be2 Nxc3 8. bxc3 Bxf3 9. Bxf3 e5 10. e4 exd4 11. cxd4 Bb4+ 12. Bd2 Qa5 13. Bxb4 Qxb4+ 14. Qd2 Qxd2+ 15. Kxd2 O-O-O 16. Ke2 Rhe8 17. Rhe1 Nf6 18. e5 Rxd4 19. Kf1 Ng4 20. Rad1 Nxh2+ 21. Kg1 Nxf3+ 22. gxf3 Rxd1 23. Rxd1 Rxe5 24. Rd4 Rf5 25. Kg2 Kc7 26. Re4 Kd6 27. Rg4 g6 28. Ra4 a6 29. Rb4 b5 30. Rh4 h5 31. Rd4+ Rd5 32. Re4 Re5 33. Rf4 f5 34. Rh4 Re2 35. Rh1 Rxa2 36. Rd1+ Ke7 37. Rd3 Ra4 38. Rc3 Kd6 39. Re3 Ra2 40. Re8 g5 41. Rg8 g4 42. Rg6+ Ke5 43. Rxc6 gxf3+ 44. Kxf3 Ra3+ 45. Kg2 Kf4 46. Rh6 Kg5 47. Rd6 h4 48. Rd8 h3+ 49. Kh2 Kf4 50. Rh8 Ke4 51. Rh4+ Ke5 52. Rh8 f4 53. Re8+ Kf5 54. Rf8+ Kg4 55. Rg8+ Kf3 56. Kxh3 Kxf2+ 57. Kg4 Rg3+ 58. Kh4 Rxg8 59. Kh3 Kf3 60. Kh2 Rg7 61. Kh3 Rh7# 0-1	pubblica
138	MartinaRicci	AndreaEsposito	5	2024-02-14	3	1	[Event "Festival di Bologna 7° edizione"]\n[Site "Bologna"]\n[Date "2024-02-14"]\n[Round "1"]\n[Result "1/2-1/2"]\n[White "RicciMartina"]\n[Black "EspositoAndrea"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. O-O Bd7 5. Bxc6 Bxc6 6. d3 Nf6 7. Nc3 Qd7 8. Re1 g6 9. Bg5 Bg7 10. Bxf6 Bxf6 11. d4 exd4 12. Nxd4 O-O 13. Nxc6 Qxc6 14. Qd3 Rfe8 15. Rab1 a6 16. Nd5 Bg7 17. c3 Qd7 18. Qf3 c6 19. Nf6+ Bxf6 20. Qxf6 Qe6 21. Qxe6 Rxe6 22. Rbd1 Rae8 23. f3 d5 24. Rd4 dxe4 25. Rdxe4 Rxe4 26. Rxe4 Rxe4 27. fxe4 f6 28. Kf2 Kf7 29. Ke3 Ke6 30. g4 Ke5 31. h3 g5 32. Kf3 b5 33. b3 c5 34. a3 c4 35. b4 h6 36. Ke3 Ke6 37. Kf3 Ke5 38. Ke3 Ke6 39. Kf3 Ke5 40. Ke3 1/2-1/2	pubblica
277	GinevraRusso	itsmexp	19	2024-02-17	2	1	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-17"]\n[Round "1"]\n[Result "0-1"]\n[White "RussoGinevra"]\n[Black "GalardoEmanuele"]\n\n1. d4 d5 2. Nf3 Nf6 3. Bf4 g6 4. h3 Bg7 5. e3 b6 6. Be2 c5 7. b3 cxd4 8. Nxd4 Ne4 9. Nd2 Nc3 10. Qb1 Nxb1 11. Rxb1 e5 12. Bb5+ Bd7 0-1	pubblica
278	TommasoEsposito	GabrieleFerrari	19	2024-02-17	3	1	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-17"]\n[Round "1"]\n[Result "1/2-1/2"]\n[White "EspositoTommaso"]\n[Black "FerrariGabriele"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. O-O Bd7 5. Bxc6 Bxc6 6. d3 Nf6 7. Nc3 Qd7 8. Re1 g6 9. Bg5 Bg7 10. Bxf6 Bxf6 11. d4 exd4 12. Nxd4 O-O 13. Nxc6 Qxc6 14. Qd3 Rfe8 15. Rab1 a6 16. Nd5 Bg7 17. c3 Qd7 18. Qf3 c6 19. Nf6+ Bxf6 20. Qxf6 Qe6 21. Qxe6 Rxe6 22. Rbd1 Rae8 23. f3 d5 24. Rd4 dxe4 25. Rdxe4 Rxe4 26. Rxe4 Rxe4 27. fxe4 f6 28. Kf2 Kf7 29. Ke3 Ke6 30. g4 Ke5 31. h3 g5 32. Kf3 b5 33. b3 c5 34. a3 c4 35. b4 h6 36. Ke3 Ke6 37. Kf3 Ke5 38. Ke3 Ke6 39. Kf3 Ke5 40. Ke3 1/2-1/2	pubblica
279	GinevraRossi	itsmexp	19	2024-02-21	2	2	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-21"]\n[Round "2"]\n[Result "0-1"]\n[White "RossiGinevra"]\n[Black "GalardoEmanuele"]\n\n1. e3 e5 2. Nc3 Nf6 3. Bc4 Nc6 4. Nf3 Bb4 5. O-O Bxc3 6. dxc3 O-O 7. e4 h6 8. Re1 Re8 9. Bd2 b6 10. Qc1 Kh7 11. Nh4 d6 12. g3 Be6 13. Bxe6 fxe6 14. f4 exf4 15. Bxf4 Nh5 16. Ng2 Nxf4 17. Qxf4 Rf8 18. Qg4 Ne5 19. Qxe6 Nf3+ 20. Kh1 Nxe1 21. Rxe1 Qf6 22. Qd7 Qf1+ 0-1	pubblica
284	GabrieleFerrari	GinevraRusso	19	2024-02-28	2	4	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-28"]\n[Round "4"]\n[Result "0-1"]\n[White "FerrariGabriele"]\n[Black "RussoGinevra"]\n\n1. e3 e5 2. Nc3 Nf6 3. Bc4 Nc6 4. Nf3 Bb4 5. O-O Bxc3 6. dxc3 O-O 7. e4 h6 8. Re1 Re8 9. Bd2 b6 10. Qc1 Kh7 11. Nh4 d6 12. g3 Be6 13. Bxe6 fxe6 14. f4 exf4 15. Bxf4 Nh5 16. Ng2 Nxf4 17. Qxf4 Rf8 18. Qg4 Ne5 19. Qxe6 Nf3+ 20. Kh1 Nxe1 21. Rxe1 Qf6 22. Qd7 Qf1+ 0-1	pubblica
256	AndreaEsposito	FrancescoFerrari	16	2024-02-11	2	1	[Event "Campionato di Palermo 13° edizione"]\n[Site "Palermo"]\n[Date "2024-02-11"]\n[Round "1"]\n[Result "0-1"]\n[White "EspositoAndrea"]\n[Black "FerrariFrancesco"]\n\n1. e3 e5 2. Nc3 Nf6 3. Bc4 Nc6 4. Nf3 Bb4 5. O-O Bxc3 6. dxc3 O-O 7. e4 h6 8. Re1 Re8 9. Bd2 b6 10. Qc1 Kh7 11. Nh4 d6 12. g3 Be6 13. Bxe6 fxe6 14. f4 exf4 15. Bxf4 Nh5 16. Ng2 Nxf4 17. Qxf4 Rf8 18. Qg4 Ne5 19. Qxe6 Nf3+ 20. Kh1 Nxe1 21. Rxe1 Qf6 22. Qd7 Qf1+ 0-1	pubblica
280	GinevraRusso	TommasoEsposito	19	2024-02-21	2	2	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-21"]\n[Round "2"]\n[Result "0-1"]\n[White "RussoGinevra"]\n[Black "EspositoTommaso"]\n\n1. d4 d5 2. c4 Nf6 3. Nc3 c6 4. Nf3 Bg4 5. e3 Nbd7 6. cxd5 Nxd5 7. Be2 Nxc3 8. bxc3 Bxf3 9. Bxf3 e5 10. e4 exd4 11. cxd4 Bb4+ 12. Bd2 Qa5 13. Bxb4 Qxb4+ 14. Qd2 Qxd2+ 15. Kxd2 O-O-O 16. Ke2 Rhe8 17. Rhe1 Nf6 18. e5 Rxd4 19. Kf1 Ng4 20. Rad1 Nxh2+ 21. Kg1 Nxf3+ 22. gxf3 Rxd1 23. Rxd1 Rxe5 24. Rd4 Rf5 25. Kg2 Kc7 26. Re4 Kd6 27. Rg4 g6 28. Ra4 a6 29. Rb4 b5 30. Rh4 h5 31. Rd4+ Rd5 32. Re4 Re5 33. Rf4 f5 34. Rh4 Re2 35. Rh1 Rxa2 36. Rd1+ Ke7 37. Rd3 Ra4 38. Rc3 Kd6 39. Re3 Ra2 40. Re8 g5 41. Rg8 g4 42. Rg6+ Ke5 43. Rxc6 gxf3+ 44. Kxf3 Ra3+ 45. Kg2 Kf4 46. Rh6 Kg5 47. Rd6 h4 48. Rd8 h3+ 49. Kh2 Kf4 50. Rh8 Ke4 51. Rh4+ Ke5 52. Rh8 f4 53. Re8+ Kf5 54. Rf8+ Kg4 55. Rg8+ Kf3 56. Kxh3 Kxf2+ 57. Kg4 Rg3+ 58. Kh4 Rxg8 59. Kh3 Kf3 60. Kh2 Rg7 61. Kh3 Rh7# 0-1	pubblica
281	GinevraRossi	GabrieleFerrari	19	2024-02-24	2	3	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-24"]\n[Round "3"]\n[Result "0-1"]\n[White "RossiGinevra"]\n[Black "FerrariGabriele"]\n\n1. d4 d5 2. c4 Nf6 3. Nc3 c6 4. Nf3 Bg4 5. e3 Nbd7 6. cxd5 Nxd5 7. Be2 Nxc3 8. bxc3 Bxf3 9. Bxf3 e5 10. e4 exd4 11. cxd4 Bb4+ 12. Bd2 Qa5 13. Bxb4 Qxb4+ 14. Qd2 Qxd2+ 15. Kxd2 O-O-O 16. Ke2 Rhe8 17. Rhe1 Nf6 18. e5 Rxd4 19. Kf1 Ng4 20. Rad1 Nxh2+ 21. Kg1 Nxf3+ 22. gxf3 Rxd1 23. Rxd1 Rxe5 24. Rd4 Rf5 25. Kg2 Kc7 26. Re4 Kd6 27. Rg4 g6 28. Ra4 a6 29. Rb4 b5 30. Rh4 h5 31. Rd4+ Rd5 32. Re4 Re5 33. Rf4 f5 34. Rh4 Re2 35. Rh1 Rxa2 36. Rd1+ Ke7 37. Rd3 Ra4 38. Rc3 Kd6 39. Re3 Ra2 40. Re8 g5 41. Rg8 g4 42. Rg6+ Ke5 43. Rxc6 gxf3+ 44. Kxf3 Ra3+ 45. Kg2 Kf4 46. Rh6 Kg5 47. Rd6 h4 48. Rd8 h3+ 49. Kh2 Kf4 50. Rh8 Ke4 51. Rh4+ Ke5 52. Rh8 f4 53. Re8+ Kf5 54. Rf8+ Kg4 55. Rg8+ Kf3 56. Kxh3 Kxf2+ 57. Kg4 Rg3+ 58. Kh4 Rxg8 59. Kh3 Kf3 60. Kh2 Rg7 61. Kh3 Rh7# 0-1	pubblica
282	itsmexp	TommasoEsposito	19	2024-02-24	1	3	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-24"]\n[Round "3"]\n[Result "1-0"]\n[White "GalardoEmanuele"]\n[Black "EspositoTommaso"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Nge7 4. O-O a6 5. Bxc6 Nxc6 6. Nc3 Bc5 7. d3 d6 8. Be3 Ba7 9. Qd2 Be6 10. a3 h6 11. Rad1 Bg4 12. h3 Bxf3 13. gxf3 Qh4 14. Kh2 Nd4 15. Bxd4 Bxd4 16. Nd5 O-O-O 17. c3 Ba7 18. f4 g5 19. fxe5 dxe5 20. Ne7+ Kb8 21. Nf5 Qh5 22. Ng3 Qg6 23. Qe2 h5 24. b4 g4 25. h4 Qf6 26. Nf5 Rhg8 27. Rg1 Rg6 28. Rg3 Qc6 29. Ne7 Qf6 30. Nxg6 fxg6 31. f3 Qxh4+ 32. Kg2 Rf8 33. Rf1 gxf3+ 34. Rfxf3 Rf4 35. Rxg6 Rg4+ 36. Rxg4 Qxg4+ 37. Kh2 Qg1+ 38. Kh3 Qg4+ 39. Kh2 Qg1+ 40. Kh3 Qg4+ 41. Kh2 Bg1+ 42. Kh1 h4 43. Qg2 1-0	pubblica
283	GinevraRossi	TommasoEsposito	19	2024-02-28	3	4	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-02-28"]\n[Round "4"]\n[Result "1/2-1/2"]\n[White "RossiGinevra"]\n[Black "EspositoTommaso"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. O-O Bd7 5. Bxc6 Bxc6 6. d3 Nf6 7. Nc3 Qd7 8. Re1 g6 9. Bg5 Bg7 10. Bxf6 Bxf6 11. d4 exd4 12. Nxd4 O-O 13. Nxc6 Qxc6 14. Qd3 Rfe8 15. Rab1 a6 16. Nd5 Bg7 17. c3 Qd7 18. Qf3 c6 19. Nf6+ Bxf6 20. Qxf6 Qe6 21. Qxe6 Rxe6 22. Rbd1 Rae8 23. f3 d5 24. Rd4 dxe4 25. Rdxe4 Rxe4 26. Rxe4 Rxe4 27. fxe4 f6 28. Kf2 Kf7 29. Ke3 Ke6 30. g4 Ke5 31. h3 g5 32. Kf3 b5 33. b3 c5 34. a3 c4 35. b4 h6 36. Ke3 Ke6 37. Kf3 Ke5 38. Ke3 Ke6 39. Kf3 Ke5 40. Ke3 1/2-1/2	pubblica
285	GinevraRossi	GinevraRusso	19	2024-03-03	3	5	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-03-03"]\n[Round "5"]\n[Result "1/2-1/2"]\n[White "RossiGinevra"]\n[Black "RussoGinevra"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. O-O Bd7 5. Bxc6 Bxc6 6. d3 Nf6 7. Nc3 Qd7 8. Re1 g6 9. Bg5 Bg7 10. Bxf6 Bxf6 11. d4 exd4 12. Nxd4 O-O 13. Nxc6 Qxc6 14. Qd3 Rfe8 15. Rab1 a6 16. Nd5 Bg7 17. c3 Qd7 18. Qf3 c6 19. Nf6+ Bxf6 20. Qxf6 Qe6 21. Qxe6 Rxe6 22. Rbd1 Rae8 23. f3 d5 24. Rd4 dxe4 25. Rdxe4 Rxe4 26. Rxe4 Rxe4 27. fxe4 f6 28. Kf2 Kf7 29. Ke3 Ke6 30. g4 Ke5 31. h3 g5 32. Kf3 b5 33. b3 c5 34. a3 c4 35. b4 h6 36. Ke3 Ke6 37. Kf3 Ke5 38. Ke3 Ke6 39. Kf3 Ke5 40. Ke3 1/2-1/2	pubblica
286	GabrieleFerrari	itsmexp	19	2024-03-03	3	5	[Event "Coppa di Venezia 10° edizione"]\n[Site "Venezia"]\n[Date "2024-03-03"]\n[Round "5"]\n[Result "1/2-1/2"]\n[White "FerrariGabriele"]\n[Black "GalardoEmanuele"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. O-O Bd7 5. Bxc6 Bxc6 6. d3 Nf6 7. Nc3 Qd7 8. Re1 g6 9. Bg5 Bg7 10. Bxf6 Bxf6 11. d4 exd4 12. Nxd4 O-O 13. Nxc6 Qxc6 14. Qd3 Rfe8 15. Rab1 a6 16. Nd5 Bg7 17. c3 Qd7 18. Qf3 c6 19. Nf6+ Bxf6 20. Qxf6 Qe6 21. Qxe6 Rxe6 22. Rbd1 Rae8 23. f3 d5 24. Rd4 dxe4 25. Rdxe4 Rxe4 26. Rxe4 Rxe4 27. fxe4 f6 28. Kf2 Kf7 29. Ke3 Ke6 30. g4 Ke5 31. h3 g5 32. Kf3 b5 33. b3 c5 34. a3 c4 35. b4 h6 36. Ke3 Ke6 37. Kf3 Ke5 38. Ke3 Ke6 39. Kf3 Ke5 40. Ke3 1/2-1/2	pubblica
287	GabrieleFerrari	custom	-1	2024-01-18	2	0	[Result "0-1"]\n[White "Ferrari Gabriele"]\n[Black "Lupo Lucio"]\n\n1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 d5 5. exd5 Qxd5 6. Bxc6+ Qxc6 7. Nxe5 Qe6 8. d4 c5 9. O-O cxd4 10. Qxd4 {ops...} Bd6 11. Nc6 {Ho sbagliato.} bxc6 12. Qxd6 {Ho sbagliato totalmente... Abbandono} 0-1	pubblica
288	GabrieleFerrari	custom	-1	2024-01-19	3	1	[Event "Sanremo 2023"]\n[Site "Sanremo"]\n[Date "2023-02-12"]\n[Round "1"]\n[Result "1/2-1/2"]\n[White "Ferrari Gabriele"]\n[Black "Castoldi Marco"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Bb4 4. O-O 1/2-1/2	pubblica
290	GabrieleFerrari	custom	-1	2024-01-19	3	0	[Result "1/2-1/2"]\n[White "Ferrari Gabriele"]\n[Black "Sattei Mara"]\n\n1. e4 e5 {Patta di accordo} 1/2-1/2	privata
291	EmmaRicci	custom	-1	2024-01-19	1	0	[Result "1-0"]\n[White "Ricci Emma"]\n[Black "Ricci Piero"]\n\n1. e4 f6 2. f4 g5 3. Qh5# 1-0	amici
257	AndreaMarino	SaraFerrari	16	2024-02-11	2	1	[Event "Campionato di Palermo 13° edizione"]\n[Site "Palermo"]\n[Date "2024-02-11"]\n[Round "1"]\n[Result "0-1"]\n[White "MarinoAndrea"]\n[Black "FerrariSara"]\n\n1. d4 d5 2. c4 Nf6 3. Nc3 c6 4. Nf3 Bg4 5. e3 Nbd7 6. cxd5 Nxd5 7. Be2 Nxc3 8. bxc3 Bxf3 9. Bxf3 e5 10. e4 exd4 11. cxd4 Bb4+ 12. Bd2 Qa5 13. Bxb4 Qxb4+ 14. Qd2 Qxd2+ 15. Kxd2 O-O-O 16. Ke2 Rhe8 17. Rhe1 Nf6 18. e5 Rxd4 19. Kf1 Ng4 20. Rad1 Nxh2+ 21. Kg1 Nxf3+ 22. gxf3 Rxd1 23. Rxd1 Rxe5 24. Rd4 Rf5 25. Kg2 Kc7 26. Re4 Kd6 27. Rg4 g6 28. Ra4 a6 29. Rb4 b5 30. Rh4 h5 31. Rd4+ Rd5 32. Re4 Re5 33. Rf4 f5 34. Rh4 Re2 35. Rh1 Rxa2 36. Rd1+ Ke7 37. Rd3 Ra4 38. Rc3 Kd6 39. Re3 Ra2 40. Re8 g5 41. Rg8 g4 42. Rg6+ Ke5 43. Rxc6 gxf3+ 44. Kxf3 Ra3+ 45. Kg2 Kf4 46. Rh6 Kg5 47. Rd6 h4 48. Rd8 h3+ 49. Kh2 Kf4 50. Rh8 Ke4 51. Rh4+ Ke5 52. Rh8 f4 53. Re8+ Kf5 54. Rf8+ Kg4 55. Rg8+ Kf3 56. Kxh3 Kxf2+ 57. Kg4 Rg3+ 58. Kh4 Rxg8 59. Kh3 Kf3 60. Kh2 Rg7 61. Kh3 Rh7# 0-1	pubblica
258	LeonardoBianchi	GretaColombo	16	2024-02-11	3	1	[Event "Campionato di Palermo 13° edizione"]\n[Site "Palermo"]\n[Date "2024-02-11"]\n[Round "1"]\n[Result "1/2-1/2"]\n[White "BianchiLeonardo"]\n[Black "ColomboGreta"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. O-O Bd7 5. Bxc6 Bxc6 6. d3 Nf6 7. Nc3 Qd7 8. Re1 g6 9. Bg5 Bg7 10. Bxf6 Bxf6 11. d4 exd4 12. Nxd4 O-O 13. Nxc6 Qxc6 14. Qd3 Rfe8 15. Rab1 a6 16. Nd5 Bg7 17. c3 Qd7 18. Qf3 c6 19. Nf6+ Bxf6 20. Qxf6 Qe6 21. Qxe6 Rxe6 22. Rbd1 Rae8 23. f3 d5 24. Rd4 dxe4 25. Rdxe4 Rxe4 26. Rxe4 Rxe4 27. fxe4 f6 28. Kf2 Kf7 29. Ke3 Ke6 30. g4 Ke5 31. h3 g5 32. Kf3 b5 33. b3 c5 34. a3 c4 35. b4 h6 36. Ke3 Ke6 37. Kf3 Ke5 38. Ke3 Ke6 39. Kf3 Ke5 40. Ke3 1/2-1/2	pubblica
259	RiccardoColombo	FrancescoFerrari	16	2024-02-15	3	2	[Event "Campionato di Palermo 13° edizione"]\n[Site "Palermo"]\n[Date "2024-02-15"]\n[Round "2"]\n[Result "1/2-1/2"]\n[White "ColomboRiccardo"]\n[Black "FerrariFrancesco"]\n\n1. d4 d5 2. Nf3 Nf6 3. Bf4 g6 4. h3 Bg7 5. e3 b6 6. Be2 c5 7. b3 cxd4 8. Nxd4 Ne4 9. Nd2 Nc3 10. Qb1 Nxb1 11. Rxb1 e5 12. Bb5+ Bd7 1/2-1/2	pubblica
261	AndreaMarino	LeonardoBianchi	16	2024-02-15	1	2	[Event "Campionato di Palermo 13° edizione"]\n[Site "Palermo"]\n[Date "2024-02-15"]\n[Round "2"]\n[Result "1-0"]\n[White "MarinoAndrea"]\n[Black "BianchiLeonardo"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Nge7 4. O-O a6 5. Bxc6 Nxc6 6. Nc3 Bc5 7. d3 d6 8. Be3 Ba7 9. Qd2 Be6 10. a3 h6 11. Rad1 Bg4 12. h3 Bxf3 13. gxf3 Qh4 14. Kh2 Nd4 15. Bxd4 Bxd4 16. Nd5 O-O-O 17. c3 Ba7 18. f4 g5 19. fxe5 dxe5 20. Ne7+ Kb8 21. Nf5 Qh5 22. Ng3 Qg6 23. Qe2 h5 24. b4 g4 25. h4 Qf6 26. Nf5 Rhg8 27. Rg1 Rg6 28. Rg3 Qc6 29. Ne7 Qf6 30. Nxg6 fxg6 31. f3 Qxh4+ 32. Kg2 Rf8 33. Rf1 gxf3+ 34. Rfxf3 Rf4 35. Rxg6 Rg4+ 36. Rxg4 Qxg4+ 37. Kh2 Qg1+ 38. Kh3 Qg4+ 39. Kh2 Qg1+ 40. Kh3 Qg4+ 41. Kh2 Bg1+ 42. Kh1 h4 43. Qg2 1-0	pubblica
292	itsmexp	custom	-1	2024-01-19	3	0	[Result "1/2-1/2"]\n[White "Galardo Emanuele"]\n[Black "Pirrò Davide"]\n\n1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 1/2-1/2	amici
\.


--
-- TOC entry 4816 (class 0 OID 33852)
-- Dependencies: 220
-- Data for Name: torneo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.torneo (id, nome, data_inizio, data_fine, luogo, stato, vincitore) FROM stdin;
10	Torneo di Bari 14° edizione	2024-01-26	2024-02-18	Bari	prossimo	\N
1	Torneo di Torino 8° edizione	2024-02-05	2024-02-25	Torino	prossimo	\N
20	Memorial di Milano 12° edizione	2024-02-03	2024-02-18	Milano	prossimo	\N
13	Festival di Bari 3° edizione	2024-02-15	2024-02-18	Bari	prossimo	\N
15	Coppa di Roma 7° edizione	2024-02-08	2024-03-02	Roma	prossimo	\N
8	Memorial di Roma 17° edizione	2024-02-13	2024-02-28	Roma	prossimo	\N
14	Torneo di Venezia 16° edizione	2024-02-14	2024-03-12	Venezia	prossimo	\N
12	Coppa di Palermo 12° edizione	2024-02-03	2024-02-29	Palermo	prossimo	\N
17	Campionato di Milano 13° edizione	2024-01-18	2024-03-06	Milano	prossimo	\N
18	Coppa di Venezia 11° edizione	2024-02-08	2024-02-20	Venezia	inCorso	\N
6	Torneo di Napoli 14° edizione	2024-01-26	2024-03-02	Napoli	inCorso	\N
3	Campionato di Genova 18° edizione	2024-02-07	2024-02-23	Genova	prossimo	\N
9	Campionato di Napoli 14° edizione	2024-02-14	2024-03-02	Napoli	inCorso	\N
5	Festival di Bologna 7° edizione	2024-02-14	2024-02-24	Bologna	inCorso	\N
16	Campionato di Palermo 13° edizione	2024-02-08	2024-03-06	Palermo	inCorso	\N
7	Memorial di Genova 4° edizione	2024-01-27	2024-03-07	Genova	prossimo	\N
-1	Partite fuori torneo	2021-01-01	2021-01-02	Arcavacata (Rende)	fuoriTorneo	\N
19	Coppa di Venezia 10° edizione	2024-02-14	2024-03-03	Venezia	passato	itsmexp
\.


--
-- TOC entry 4818 (class 0 OID 33858)
-- Dependencies: 222
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (nome, cognome, username, password, data_nascita, "nazionalità", admin, email) FROM stdin;
Sofia	Rossi	SofiaRossi	$2a$10$g/wA84XwvEFbtqNDCgr1n.9ppZDY3Xe4zM5BEGIfRpQ.QFTAchvVW	1971-01-18	fr	f	Sofia.Rossi@hotmail.it
Sofia	Russo	SofiaRusso	$2a$10$dHsSN3PJcdYL3o0dnCqWBObwovfNKjRbx7scB9ro/09.aejif1czq	1970-01-18	fr	f	Sofia.Russo@libero.it
Sofia	Romano	SofiaRomano	$2a$10$PhKeigD/HOuwlb8w55NNlO5sWkNjzZ6Ox0c.ZOQndQHY9AaysL60a	1986-01-18	es	f	Sofia.Romano@hotmail.it
Sofia	Colombo	SofiaColombo	$2a$10$5iPao5rr3p9879q3Ned2xeZx9../bVllJEEFiHKhVwBNODO.u.oyS	1978-01-18	it	f	Sofia.Colombo@outlook.it
Giulia	Russo	GiuliaRusso	$2a$10$qK1efJupQ.Jmx65oKqttOulo8gvOWLsQ21ybICSq.HH2i.F1IevPa	2002-01-18	es	f	Giulia.Russo@gmail.com
Giulia	Ferrari	GiuliaFerrari	$2a$10$mo7Bfvxn4M80pWns0gGcL.EGm78h0D9wKQZ/Dc6pHFx12PaUilNwK	1982-01-18	fr	f	Giulia.Ferrari@outlook.it
Giulia	Esposito	GiuliaEsposito	$2a$10$YNrXvARrWuX2d4RkU0hoU.aZNbD0pCn2o7mGsbdM.XQwXJhUz3hYm	2007-01-18	it	f	Giulia.Esposito@outlook.it
Sofia	Ricci	SofiaRicci	$2a$10$uneh9nSm4guQVYQOTeTVZuxZtsA8nT.IXppV6kPWgNDLSMNR52sRu	1985-01-18	gb	f	Sofia.Ricci@libero.it
Martina	Esposito	MartinaEsposito	$2a$10$rcnN.NJig6/PAHoNNIOoweEtH0s8WmFmSVPFuXHoI/1O05JHGizCm	1979-01-18	fr	f	Martina.Esposito@libero.it
Martina	Bianchi	MartinaBianchi	$2a$10$kPWR.lxr.tZ/sTC2oPGMQuz5vlyYe9cq5SHwW6l65QAd6OSyf38N6	1969-01-18	de	f	Martina.Bianchi@outlook.it
Giulia	Bianchi	GiuliaBianchi	$2a$10$ePqhCqUYYof5yUJtTZXHvu.mQVoDXLB8eN.p2xhIh0.31Gk.n2BVO	1981-01-18	gb	f	Giulia.Bianchi@hotmail.it
Giulia	Colombo	GiuliaColombo	$2a$10$LNxmSh4kgKxAqh.XbLyRxeoN4X.2SMLzqIyGPvntgTXceV5sRyvrm	1986-01-18	gb	f	Giulia.Colombo@hotmail.it
Martina	Ricci	MartinaRicci	$2a$10$50KSnizCBbBB16aEbbebyOWnuDTfVRuDfkj9TW9OuuTMO3a3qYGqG	1980-01-18	de	f	Martina.Ricci@libero.it
Giulia	Ricci	GiuliaRicci	$2a$10$WbSDSPgj0m.mBfmSk.qPQuPuSaHImbQLL5Hfdmnj0LDqPXNfMOWX2	2002-01-18	gb	f	Giulia.Ricci@outlook.it
Martina	Russo	MartinaRusso	$2a$10$rU4IHLJztoX8eknfG1vx2uVQwRpEyI0NEVj39i6xd/7ihve/fK2RG	1992-01-18	gb	f	Martina.Russo@hotmail.it
Aurora	Rossi	AuroraRossi	$2a$10$wwBYWGcWkXFs48gCSaqX7uM2xgospcPylFUJFhCTHK3KmKkfj8YFy	1976-01-18	de	f	Aurora.Rossi@hotmail.it
Aurora	Russo	AuroraRusso	$2a$10$YD4P4XsoqZXCW1Cd.14LDOUIBxDRUS6G8r3RwuVsPsvASmmttgmR2	2004-01-18	de	f	Aurora.Russo@outlook.it
Aurora	Ferrari	AuroraFerrari	$2a$10$Tt8bdXQnN2MAOifA4X3fIu8EZHlEglMq2JTIPFj68C43CCt55dLNa	2003-01-18	de	f	Aurora.Ferrari@yahoo.it
Aurora	Esposito	AuroraEsposito	$2a$10$kZpMGtqrJs2.FITEMWeNI.WcSKr/6Lz5ukMzAs1bD7C6I.eoutway	1997-01-18	fr	f	Aurora.Esposito@yahoo.it
Martina	Ferrari	MartinaFerrari	$2a$10$GXJK6oBv4/WoRBF7sZ7dZuhupNaQqGT/YpKv61N3RsJjQcZcM0BMK	1991-01-18	gb	f	Martina.Ferrari@yahoo.it
Alice	Marino	AliceMarino	$2a$10$QjnAwTC4OcDLcl3PxJJsKOExF/eEL5z9ncVTtWu72GjhXpNylsKKa	1974-01-18	gb	f	Alice.Marino@yahoo.it
Alice	Greco	AliceGreco	$2a$10$/HzRk97Gb6kSzwlEJZJkE.TVzOTpJZgEf9LSzar24jyTzvWfYSRdW	1992-01-18	gb	f	Alice.Greco@libero.it
Aurora	Marino	AuroraMarino	$2a$10$e5M6cbuD7LyYiCmIrSMnYOJLDMrj4XLgQCoVDiR8Cx2u9Q71oVwGy	2001-01-18	de	f	Aurora.Marino@yahoo.it
Aurora	Greco	AuroraGreco	$2a$10$hl5yA4QrwITWN30MHGdlgu2eQIEwZMaGLk29dSAMbZorF4m3WAwme	1971-01-18	fr	f	Aurora.Greco@yahoo.it
Alice	Russo	AliceRusso	$2a$10$9CoMPO6.vI00uQs3wsv75e7gTF47zJEhUqeSZbHIKrouelF9PH2jq	1978-01-18	es	f	Alice.Russo@hotmail.it
Alice	Ferrari	AliceFerrari	$2a$10$PdAysVJ8.sqUOj2dez7cUedBZTZgfBkPfLofTB7XKVKfzBUkx4Vqy	2006-01-18	de	f	Alice.Ferrari@yahoo.it
Alice	Romano	AliceRomano	$2a$10$o8zuSfFFegg7RAxdsgUCSOppVwXb.Zb/MjK3EUI9xgZr2knSeF3QO	2004-01-18	fr	f	Alice.Romano@hotmail.it
Alice	Ricci	AliceRicci	$2a$10$K7Gkpj86jeAJCoLgbr49C.jk1i8oyqCQliFLQn8qNXd5Z6XsPELCy	2008-01-18	fr	f	Alice.Ricci@yahoo.it
Ginevra	Rossi	GinevraRossi	$2a$10$KvO7ScqJ8fvWPo9uV62vqeLpTy2HcQAD1KKQT4Bf71LehNojuqkqe	1968-01-18	it	f	Ginevra.Rossi@outlook.it
Ginevra	Russo	GinevraRusso	$2a$10$Xwga82e23xcskw7W4stnkepJdYOZHMkFrzjuvF.hXonerOnyTkCMG	1992-01-18	fr	f	Ginevra.Russo@libero.it
Ginevra	Ferrari	GinevraFerrari	$2a$10$599C1Kn80bFhsg7nNi4uQuCIbSzYaUjqjgay4Rms1U74TLBG49L7y	1969-01-18	de	f	Ginevra.Ferrari@libero.it
Ginevra	Esposito	GinevraEsposito	$2a$10$G102ZcH1i6uX/05d/Dhs5efErxXMbTaBEjCWnQdtmnUjzVGDM8VSy	2008-01-18	es	f	Ginevra.Esposito@outlook.it
Ginevra	Bianchi	GinevraBianchi	$2a$10$vtjk/.kV0jChJ6t/LxROyerEJkPVnw/afkmVb.10ryMu58pRwEU42	1997-01-18	it	f	Ginevra.Bianchi@outlook.it
Ginevra	Ricci	GinevraRicci	$2a$10$Xv86/bWgLUspAF4.ta2FkuHrcj1hyqjwNPtrtHDOr4YZSBvx/ClCm	2004-01-18	fr	f	Ginevra.Ricci@libero.it
Ginevra	Marino	GinevraMarino	$2a$10$TxmCGLa9bELYdsi8gBylRO4.iU4g5FyeX129qqExzVhu6hDx2CdYW	1968-01-18	it	f	Ginevra.Marino@yahoo.it
Emma	Ferrari	EmmaFerrari	$2a$10$N8Pk/9k2Yv1LB6FedIwmYONSY46FW/57ojfC5tZLbEG.Z3NdhJIDG	1973-01-18	it	f	Emma.Ferrari@hotmail.it
Emma	Esposito	EmmaEsposito	$2a$10$.DworvbEljehR5CuGyeaWedVEE7XcO4cgA9HlNPb8.t6AzAWqTkrm	1988-01-18	fr	f	Emma.Esposito@gmail.com
Emma	Colombo	EmmaColombo	$2a$10$MRmduGcs.KWoY.YkH8hBTehYkw.KglYf31MrmrNNGUH/Y9OIdZymG	2004-01-18	de	f	Emma.Colombo@libero.it
Emma	Ricci	EmmaRicci	$2a$10$Wsj.K4knM8YtO7WP4nSeYelHJFCBkN99s1N9P7S.R.59uFuHYPbjK	1980-01-18	de	f	Emma.Ricci@gmail.com
Emma	Greco	EmmaGreco	$2a$10$69tbmp1ZmTgqbOKFjfGcp./JJxy1BVDBk7uMp8Oa7IbnWxRvm7NJi	1985-01-18	es	f	Emma.Greco@yahoo.it
Ginevra	Romano	GinevraRomano	$2a$10$2Potx9IltO1Sb3vGfw1iueNoXv/sbCd/wYA6auSdAQ8MyDKnS2wY2	1969-01-18	gb	f	Ginevra.Romano@libero.it
Greta	Russo	GretaRusso	$2a$10$dq1XACy5oYRNNUU.Wiix5uOTN2VPDD3agyiqF8Pig0RE2ftoaC2aK	2005-01-18	it	f	Greta.Russo@hotmail.it
Greta	Ferrari	GretaFerrari	$2a$10$bNKVy7xM6wXVYLJL0/W5I.8RUHBlFfDZXiS7Xbgm4wgsL/9XcpJbK	1983-01-18	gb	f	Greta.Ferrari@libero.it
Greta	Greco	GretaGreco	$2a$10$Zy9FPAVVe.2qxBg5/Ufa3u9FNNFtkZC1aOztX4p9uJEAGugFhHXM2	1981-01-18	gb	f	Greta.Greco@gmail.com
Greta	Romano	GretaRomano	$2a$10$U7XxL9WDR/i7Vm8Nf/JBAukk/yCXtR6IeqN40eO/Qp2egC5hAu2ku	1968-01-18	es	f	Greta.Romano@hotmail.it
Greta	Colombo	GretaColombo	$2a$10$2huGUsOb50I0V4iNm2tKN.2qIzyjQIjIZh2RoAFLDlr/MDaVwI0Cq	1995-01-18	it	f	Greta.Colombo@hotmail.it
Sara	Esposito	SaraEsposito	$2a$10$pyE8JPdTlBbSnqg71Qm4t.W8eGCAValKDnlVvUNixwBh9p8OZ7lwG	1998-01-18	gb	f	Sara.Esposito@yahoo.it
Greta	Marino	GretaMarino	$2a$10$MWlYSYnjIYFPLhNDsYPjWOU9UK8hKOaE63LdzKrlp4nePpwwjfNme	1991-01-18	es	f	Greta.Marino@yahoo.it
Chiara	Rossi	ChiaraRossi	$2a$10$Xfq4JDS.ker20KixRY4.2uFf82a7Iv.8yOSKrJYntsFIpglVI6G7u	1981-01-18	it	f	Chiara.Rossi@outlook.it
Chiara	Russo	ChiaraRusso	$2a$10$EIz9R1e6vHKNVCG8NEEHF.RScG6kHOhEYaXFljRhC83NrSyETWKbO	2008-01-18	it	f	Chiara.Russo@outlook.it
Sara	Bianchi	SaraBianchi	$2a$10$6YVbn2xkPzCVqRHZ8ryWMevMRw1NcncswPQOY8jn2Ni1603I9Efqu	1985-01-18	gb	f	Sara.Bianchi@yahoo.it
Francesco	Marino	FrancescoMarino	$2a$10$Dz92P56lV56nNUy4vWn1JeezrjGQL422IaSBoX2oXFFp2ZYnp8/Ru	1992-01-18	gb	f	Francesco.Marino@hotmail.it
Chiara	Romano	ChiaraRomano	$2a$10$z.PkmksMbXlKNk.zJTg5/.PdjOz2Fn9yRp6gjsMwo6piCJ/Nm73dW	1969-01-18	de	f	Chiara.Romano@outlook.it
Chiara	Greco	ChiaraGreco	$2a$10$ZpmNbi7h85MIoUoWoZmEReqFaCHmutlP8P.wGceV5WIOfoW7wxMYi	1968-01-18	de	f	Chiara.Greco@libero.it
Sara	Ricci	SaraRicci	$2a$10$3FmNAEaAWpOq9cWVau.Hi.CmA8FcYkBDy.XwXLk0kAh6cGa6Kn2KG	1992-01-18	es	f	Sara.Ricci@outlook.it
Sara	Greco	SaraGreco	$2a$10$I9u7fRvjGmouqtsnjtZ1oe/Pbz.NNjYJaxNldO8WdtOuXBFSvHtWe	1976-01-18	fr	f	Sara.Greco@hotmail.it
Francesco	Ferrari	FrancescoFerrari	$2a$10$VplQQCx4DtT9ErZ9jvtIPOa47o2sJWuPJsVI9phJI/0pZYrhlpb1W	1969-01-18	fr	f	Francesco.Ferrari@libero.it
Francesco	Esposito	FrancescoEsposito	$2a$10$xqp21kwHNuPtr1tKVHDYDud6ZudbG/kTp1AWq9MG.VEF9/p1jZdYS	1970-01-18	it	f	Francesco.Esposito@hotmail.it
Francesco	Bianchi	FrancescoBianchi	$2a$10$.TLgT9dnIUGtvCq8FwMmOOkmTC6Mzfi6EDw./dU66uhyBm6tqQd6W	1972-01-18	de	f	Francesco.Bianchi@gmail.com
Francesco	Romano	FrancescoRomano	$2a$10$3Wh9k.AwkP/4CyqB8ZlmCu9JzaF8Esd7N9mI5iAcmY9oPQB4wiR7K	2000-01-18	fr	f	Francesco.Romano@libero.it
Sara	Ferrari	SaraFerrari	$2a$10$FbxTV3VY.OgDo1nwqaRZkO//QLshOr7dnE6LgNZMXmv0D1.8/KfnO	1983-01-18	de	t	Sara.Ferrari@outlook.it
Francesco	Ricci	FrancescoRicci	$2a$10$iLJ6O/JIGIu4XvA3y//d3.XH0OFinNWzCzKqD/BE71d/6L7Q9GABy	2003-01-18	es	f	Francesco.Ricci@libero.it
Alessandro	Rossi	AlessandroRossi	$2a$10$NvWGfTbPUwSPimsmm93WK.L4zKDNidubfv5dQm6INxzWY5UU57gea	2001-01-18	es	f	Alessandro.Rossi@libero.it
Alessandro	Esposito	AlessandroEsposito	$2a$10$BovYxjcVnYA5G7O3ciRPKOg69EYGRVRLQtrmHUkcB9dWNN57Sx7Py	2004-01-18	de	f	Alessandro.Esposito@libero.it
Alessandro	Bianchi	AlessandroBianchi	$2a$10$dCNKNdlF0ar7rM/pxxVnEum99sIHnf014/kD6vHHQ4fDMXFojGcWq	1976-01-18	fr	f	Alessandro.Bianchi@gmail.com
Alessandro	Ricci	AlessandroRicci	$2a$10$TLrH.wrKearO3JqPVPjohecKNztuI5nyOnVaJM7yxTt.ogQmMYgmq	1986-01-18	fr	f	Alessandro.Ricci@outlook.it
Alessandro	Marino	AlessandroMarino	$2a$10$L89e/62inosMUy8dvrwGy.2wCQK6Jp0cueh7UrA20KMiX2sQUhbcu	1988-01-18	de	f	Alessandro.Marino@libero.it
Lorenzo	Rossi	LorenzoRossi	$2a$10$IQPF5CqIEGd2nG2R25vRDuEVIbs08RfulcKDVpSzuEUQ6XGaBDX/C	1978-01-18	fr	f	Lorenzo.Rossi@outlook.it
Lorenzo	Russo	LorenzoRusso	$2a$10$6iLMR7L15yYYDDriHFiMu.rORUJbTGTmMbFj/Vys2yiQ4tc11yza6	1988-01-18	de	f	Lorenzo.Russo@hotmail.it
Lorenzo	Ferrari	LorenzoFerrari	$2a$10$axDpiAs0Lro4SOQLxYrw2uznruEk21JCWkuXHsCBV9rr0fb4Eujfu	1979-01-18	es	f	Lorenzo.Ferrari@outlook.it
Alessandro	Russo	AlessandroRusso	$2a$10$pjUnNUO3ASW4/lGcK0a60uS7m1Z1W68APHZPFJ9L4zNsqt3tZ8Tfy	1997-01-18	gb	f	Alessandro.Russo@libero.it
Alessandro	Romano	AlessandroRomano	$2a$10$pdePWZ/abDprAfT0tcJ6OeiV9OFRIiExc7Lhk8Nl98PHIgEgB.oVW	1992-01-18	gb	f	Alessandro.Romano@libero.it
Alessandro	Greco	AlessandroGreco	$2a$10$otKx/zK1qQmKB86Qhexm.OkdaCWteFvYsl0gWVw0MAo5GZMV8NhSO	2006-01-18	gb	f	Alessandro.Greco@libero.it
Mattia	Marino	MattiaMarino	$2a$10$pTa42oc9VVQK8VPaMGYRee1tgqvWM0uBllz1OhU4GtMD15j9iuuUO	2005-01-18	gb	f	Mattia.Marino@outlook.it
Andrea	Greco	AndreaGreco	$2a$10$tbZDPjkSx1v/j672Ok7b7ugF8raV52bLzGtIXYVUQMFJmCxqRmPA6	1970-01-18	gb	f	Andrea.Greco@libero.it
Leonardo	Rossi	LeonardoRossi	$2a$10$SaetQeXVJWx8ScWvWTi69en3u4pn6t/yKeLO2jAVRVdb./Q7JWz0a	1982-01-18	es	f	Leonardo.Rossi@yahoo.it
Leonardo	Ferrari	LeonardoFerrari	$2a$10$amqy2hbkqK/napzTbduyMewP136sBiLNIEuUh03BI1cXS8iq.7XKe	2008-01-18	it	f	Leonardo.Ferrari@gmail.com
Leonardo	Esposito	LeonardoEsposito	$2a$10$Ln19d1WAyEwttUntUH6xtO3d1OGTp492AWO4QNtUsQMc8i8C6mIoa	1987-01-18	de	f	Leonardo.Esposito@yahoo.it
Leonardo	Bianchi	LeonardoBianchi	$2a$10$ruwIuuhwxXhEV6sEp3pJH.E5jcx7ttiUq/DlWdsr0VZ3rrJzxma8m	1993-01-18	de	f	Leonardo.Bianchi@yahoo.it
Leonardo	Ricci	LeonardoRicci	$2a$10$FG6U.UWiDDc0OWNgVZ0Kue.o8epMxS1G4Gv617r3S0/7L/4DH2qha	1993-01-18	it	f	Leonardo.Ricci@yahoo.it
Leonardo	Greco	LeonardoGreco	$2a$10$MpQGHH1URo0JLTdH8aaojePYWWJzYUEYxKd5XTeCla6z8XVcplfvS	1973-01-18	es	f	Leonardo.Greco@outlook.it
Mattia	Rossi	MattiaRossi	$2a$10$hQvQYtoT4gOQ0T5VNa/CreHOHAwLvVwHPSghNQoismY5XAqvFYG3i	1997-01-18	es	f	Mattia.Rossi@outlook.it
Mattia	Russo	MattiaRusso	$2a$10$GjG4lOrYHUo.NQOhee7queWaHtiPh/xaMJh.egRAYoVfSwR4zXfi.	1991-01-18	it	f	Mattia.Russo@outlook.it
Mattia	Colombo	MattiaColombo	$2a$10$yx.mqFLFt2/nd6/6b0XCHeNzJdC4Ma2EncYG5lPkxyreGVLzVQtNK	1970-01-18	es	f	Mattia.Colombo@libero.it
Andrea	Russo	AndreaRusso	$2a$10$OTwH83A8XE4atG7eDuGZmuTnlNk3i6F2nOvguhCWMOuf1mXztzpbO	1970-01-18	fr	f	Andrea.Russo@outlook.it
Andrea	Esposito	AndreaEsposito	$2a$10$o6bHYS97bNYqvYdkZ1DwGu7pGmKnaH3gCY0X45qqZvvTsOmysWuKC	1987-01-18	it	f	Andrea.Esposito@outlook.it
Andrea	Romano	AndreaRomano	$2a$10$kcRrUU4apzOdsyslOfhUN.4.qDqXS4ogeWwHgewl52DTNxX9o3X8S	1973-01-18	it	f	Andrea.Romano@gmail.com
Andrea	Colombo	AndreaColombo	$2a$10$kqLcnKelXCQ.byMjCNy0SukpFAifl3lID62/8ZKI.NpzoSsvcPU/i	1972-01-18	de	f	Andrea.Colombo@libero.it
Andrea	Marino	AndreaMarino	$2a$10$NfqwARDF2PwaTuAWRcRrOudGjGK7LbNyS38cfT0H/hTd42MVyIufq	1992-01-18	es	f	Andrea.Marino@hotmail.it
Gabriele	Rossi	GabrieleRossi	$2a$10$j/4JRy5uvLHdCQNd/ow.T.Xp2Et5Roo8FhCP2TgRnUS0B0e9v/PkS	1991-01-18	es	f	Gabriele.Rossi@yahoo.it
Gabriele	Russo	GabrieleRusso	$2a$10$i.X3vil4IS0SgtmqcPtpouK2hIIimhJ52NzgF8NWLH/EbSsdVjZTG	1987-01-18	fr	f	Gabriele.Russo@yahoo.it
Gabriele	Ferrari	GabrieleFerrari	$2a$10$F6Z.khd2VjbTNKjuNBVxAOh7dooZHMSUZ2GzsjXCROOKyhUesLWUq	1997-01-18	fr	f	Gabriele.Ferrari@libero.it
Gabriele	Romano	GabrieleRomano	$2a$10$yK9HtQPcEPmHTmxnMjZQzuNDj2e0ItDOzQEdsMYIlBfqCz6tTJYD.	1992-01-18	fr	f	Gabriele.Romano@hotmail.it
Gabriele	Greco	GabrieleGreco	$2a$10$CRlc9nuryEcy22r.LcRW6OXsl5n3ufeLf3DH8wWPp4HfoF5lNw6A2	1973-01-18	gb	f	Gabriele.Greco@hotmail.it
Riccardo	Greco	RiccardoGreco	$2a$10$uLX0NC.fsh6XDnGFNTy40e1q2.zSnGLmhOd4bN7CUohT2QjGXMscS	2002-01-18	gb	f	Riccardo.Greco@libero.it
Riccardo	Rossi	RiccardoRossi	$2a$10$bmWw5Hby2POuogH0AtXhxel68qbnKfnTaTomN8728Dxsv1wA6izs6	1991-01-18	de	f	Riccardo.Rossi@yahoo.it
Matteo	Ferrari	MatteoFerrari	$2a$10$eAAM04enC8JpebWFqGRqNejMmKoBDCfsC9DPhMHXRi5DhMiJo.MKq	1994-01-18	gb	f	Matteo.Ferrari@gmail.com
Riccardo	Romano	RiccardoRomano	$2a$10$RC7fVoIZsUEbg.8iZ8CV9efoDY8IaFepLL89kWJ.hkoomAKpg1hma	1968-01-18	it	f	Riccardo.Romano@hotmail.it
Riccardo	Colombo	RiccardoColombo	$2a$10$3TknvfUAct0pROYl/w0XquEUkYtsgLU/3SN1WUiXSC7/jzke1Rwza	1972-01-18	de	f	Riccardo.Colombo@yahoo.it
Matteo	Romano	MatteoRomano	$2a$10$n/XChBxO6T6ELZDsvsdDjOtvofocfLnJlpdy5qtuVpYwBRWA91K6a	1986-01-18	de	f	Matteo.Romano@yahoo.it
Matteo	Colombo	MatteoColombo	$2a$10$L/pLessi0ynAgOFqBy4u4unuJmfWeiXLXd7naEeWo6CqfbQ7FtZQS	1984-01-18	it	f	Matteo.Colombo@gmail.com
Matteo	Marino	MatteoMarino	$2a$10$CmnSZYje4PjPbWOlcRhPDeI37K3NXEtc7JVTcKi4Z0N/H7iv4NJZy	1971-01-18	es	f	Matteo.Marino@hotmail.it
Matteo	Greco	MatteoGreco	$2a$10$R.ACMWU9WhnNtgs404vJ1Or4a3AjV5PFg1tqdgB7K9H2FUPwsjlxu	1994-01-18	fr	f	Matteo.Greco@yahoo.it
Tommaso	Russo	TommasoRusso	$2a$10$5gKu6WVsCOEm5TownDE8VOkrKhl686PDi4UqU4dT7UaM/Mt7obWve	1994-01-18	fr	f	Tommaso.Russo@hotmail.it
Tommaso	Ricci	TommasoRicci	$2a$10$ZS4hKQYDqBVDXHrrCcGka.ovvWrrevqlKzNGcIrHVQSVXTF9Tiwq.	1981-01-18	fr	f	Tommaso.Ricci@gmail.com
custom	custom	custom	custom	2021-01-01	custom	f	custom
Sara	Russo	SaraRusso	$2a$10$3d8Us8md8U0pqwSNG5Nn3.dZYs5iaJAyxJEuUb0fTls4IRi7o4DIy	1991-01-18	it	f	Sara.Russo@gmail.com
Tommaso	Esposito	TommasoEsposito	$2a$10$pTgy4AG39tHUDcwGovIvNuQgZDamsStYtA90SipylVOAYgb94N54G	1995-01-18	fr	f	Tommaso.Esposito@hotmail.it
Andrea	Ricci	AndreaRicci	$2a$10$LcttmDBy/HemppRj8V.pG..8ElzOWlLKkePxX2/O7sH5gQC3UcSRW	1996-01-18	es	f	Andrea.Ricci@yahoo.it
Mattia	Ferrari	MattiaFerrari	$2a$10$uurXJfv71AAiP68qQGyZRuNiWLoOvi7ivkRW.HrRhgJ5zeiGw48l.	1983-01-18	de	f	Mattia.Ferrari@outlook.it
Emanuele	Galardo	itsmexp	$2a$10$tyRer7e0//2cpg6KP6YI.e/p1TvtYbV3XWUlEY6wNPV3qqf4tjgWq	2002-11-30	it	t	galardo.emanuele@gmail.com
Matteo	Esposito	MatteoEsposito	$2a$10$dgwxA0Jlj/H7dN4/0RhiVuX6px7yMN9rEq.0KMGltg2CpcyJZ1a8G	1984-01-18	es	t	Matteo.Esposito@outlook.it
\.


--
-- TOC entry 4826 (class 0 OID 0)
-- Dependencies: 217
-- Name: iscrizione_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.iscrizione_sequence', 201, true);


--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 219
-- Name: partita_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partita_sequence', 292, true);


--
-- TOC entry 4828 (class 0 OID 0)
-- Dependencies: 221
-- Name: torneo_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.torneo_sequence', 20, true);


--
-- TOC entry 4653 (class 2606 OID 33864)
-- Name: follow follow_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pk PRIMARY KEY (seguito, seguace);


--
-- TOC entry 4655 (class 2606 OID 33866)
-- Name: iscrizione iscrizione_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_pk PRIMARY KEY (id);


--
-- TOC entry 4657 (class 2606 OID 33868)
-- Name: partita partita_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_pk PRIMARY KEY (id);


--
-- TOC entry 4659 (class 2606 OID 33870)
-- Name: torneo torneo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_pk PRIMARY KEY (id);


--
-- TOC entry 4661 (class 2606 OID 33872)
-- Name: utente utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pk PRIMARY KEY (username);


--
-- TOC entry 4662 (class 2606 OID 33873)
-- Name: iscrizione iscrizione_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk FOREIGN KEY (utente) REFERENCES public.utente(username);


--
-- TOC entry 4663 (class 2606 OID 33878)
-- Name: iscrizione iscrizione_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk_1 FOREIGN KEY (torneo) REFERENCES public.torneo(id);


--
-- TOC entry 4664 (class 2606 OID 33883)
-- Name: partita partita_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk FOREIGN KEY (giocatore1) REFERENCES public.utente(username);


--
-- TOC entry 4665 (class 2606 OID 33888)
-- Name: partita partita_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_1 FOREIGN KEY (giocatore2) REFERENCES public.utente(username);


--
-- TOC entry 4666 (class 2606 OID 33893)
-- Name: partita partita_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_2 FOREIGN KEY (torneo) REFERENCES public.torneo(id);


--
-- TOC entry 4667 (class 2606 OID 33898)
-- Name: torneo torneo_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_fk FOREIGN KEY (vincitore) REFERENCES public.utente(username);


--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-01-21 20:27:34

--
-- PostgreSQL database dump complete
--

