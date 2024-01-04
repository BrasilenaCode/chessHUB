toc.dat                                                                                             0000600 0004000 0002000 00000020206 14545326221 0014443 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   9    2                 |            webApp    16.1    16.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    16459    webApp    DATABASE     {   CREATE DATABASE "webApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE "webApp";
                postgres    false                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false                    0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5                    0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   pg_database_owner    false    5         �            1259    16460 
   iscrizione    TABLE     f   CREATE TABLE public.iscrizione (
    utente character varying NOT NULL,
    torneo bigint NOT NULL
);
    DROP TABLE public.iscrizione;
       public         heap    postgres    false    5         �            1259    16465    partita    TABLE        CREATE TABLE public.partita (
    id bigint NOT NULL,
    giocatore1 character varying,
    giocatore2 character varying,
    torneo bigint NOT NULL,
    data date NOT NULL,
    esito character varying NOT NULL,
    turno integer NOT NULL,
    pgn text
);
    DROP TABLE public.partita;
       public         heap    postgres    false    5         �            1259    16470    partita_sequence    SEQUENCE     y   CREATE SEQUENCE public.partita_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.partita_sequence;
       public          postgres    false    5         �            1259    16471    torneo    TABLE     /  CREATE TABLE public.torneo (
    id bigint NOT NULL,
    nome character varying NOT NULL,
    data_inizio date NOT NULL,
    data_fine date NOT NULL,
    luogo character varying NOT NULL,
    stato character varying NOT NULL,
    vincitore character varying,
    numero_partecipanti integer NOT NULL
);
    DROP TABLE public.torneo;
       public         heap    postgres    false    5         �            1259    16476    torneo_sequence    SEQUENCE     x   CREATE SEQUENCE public.torneo_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.torneo_sequence;
       public          postgres    false    5         �            1259    16477    utente    TABLE     u  CREATE TABLE public.utente (
    nome character varying NOT NULL,
    cognome character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    data_nascita date NOT NULL,
    "nazionalità" character varying NOT NULL,
    punteggio integer NOT NULL,
    admin boolean NOT NULL,
    punteggio_settimanale integer NOT NULL
);
    DROP TABLE public.utente;
       public         heap    postgres    false    5         �          0    16460 
   iscrizione 
   TABLE DATA           4   COPY public.iscrizione (utente, torneo) FROM stdin;
    public          postgres    false    215       4858.dat �          0    16465    partita 
   TABLE DATA           ^   COPY public.partita (id, giocatore1, giocatore2, torneo, data, esito, turno, pgn) FROM stdin;
    public          postgres    false    216       4859.dat �          0    16471    torneo 
   TABLE DATA           p   COPY public.torneo (id, nome, data_inizio, data_fine, luogo, stato, vincitore, numero_partecipanti) FROM stdin;
    public          postgres    false    218       4861.dat �          0    16477    utente 
   TABLE DATA           �   COPY public.utente (nome, cognome, username, password, data_nascita, "nazionalità", punteggio, admin, punteggio_settimanale) FROM stdin;
    public          postgres    false    220       4863.dat            0    0    partita_sequence    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.partita_sequence', 54, true);
          public          postgres    false    217         	           0    0    torneo_sequence    SEQUENCE SET     >   SELECT pg_catalog.setval('public.torneo_sequence', 11, true);
          public          postgres    false    219         ^           2606    16483    iscrizione iscrizione_pk 
   CONSTRAINT     b   ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_pk PRIMARY KEY (utente, torneo);
 B   ALTER TABLE ONLY public.iscrizione DROP CONSTRAINT iscrizione_pk;
       public            postgres    false    215    215         `           2606    16485    partita partita_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.partita DROP CONSTRAINT partita_pk;
       public            postgres    false    216         b           2606    16487    torneo torneo_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.torneo DROP CONSTRAINT torneo_pk;
       public            postgres    false    218         d           2606    16489    utente utente_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pk PRIMARY KEY (username);
 :   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_pk;
       public            postgres    false    220         e           2606    16490    iscrizione iscrizione_fk    FK CONSTRAINT     }   ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk FOREIGN KEY (utente) REFERENCES public.utente(username);
 B   ALTER TABLE ONLY public.iscrizione DROP CONSTRAINT iscrizione_fk;
       public          postgres    false    215    220    4708         f           2606    16495    iscrizione iscrizione_fk_1    FK CONSTRAINT     y   ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk_1 FOREIGN KEY (torneo) REFERENCES public.torneo(id);
 D   ALTER TABLE ONLY public.iscrizione DROP CONSTRAINT iscrizione_fk_1;
       public          postgres    false    215    218    4706         g           2606    16520    partita partita_fk    FK CONSTRAINT     {   ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk FOREIGN KEY (giocatore1) REFERENCES public.utente(username);
 <   ALTER TABLE ONLY public.partita DROP CONSTRAINT partita_fk;
       public          postgres    false    4708    216    220         h           2606    16505    partita partita_fk_1    FK CONSTRAINT     }   ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_1 FOREIGN KEY (giocatore2) REFERENCES public.utente(username);
 >   ALTER TABLE ONLY public.partita DROP CONSTRAINT partita_fk_1;
       public          postgres    false    220    4708    216         i           2606    16510    partita partita_fk_2    FK CONSTRAINT     s   ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_2 FOREIGN KEY (torneo) REFERENCES public.torneo(id);
 >   ALTER TABLE ONLY public.partita DROP CONSTRAINT partita_fk_2;
       public          postgres    false    4706    218    216         j           2606    16515    torneo torneo_fk    FK CONSTRAINT     x   ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_fk FOREIGN KEY (vincitore) REFERENCES public.utente(username);
 :   ALTER TABLE ONLY public.torneo DROP CONSTRAINT torneo_fk;
       public          postgres    false    220    4708    218                                                                                                                                                                                                                                                                                                                                                                                                  4858.dat                                                                                            0000600 0004000 0002000 00000000053 14545326221 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        k	1
k1	1
k2	1
k3	1
k4	1
marghe	1
k6	2
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     4859.dat                                                                                            0000600 0004000 0002000 00000002634 14545326221 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        7	k	k4	1	2023-12-30	0	1	\N
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


                                                                                                    4861.dat                                                                                            0000600 0004000 0002000 00000000626 14545326221 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        8	Torneo di prova	2023-12-28	2023-12-28	milano	attuale	filo	10
11	Barollo	2023-12-07	2023-12-13	Milano	attuale	\N	0
7	Torneo di prova	2023-12-28	2023-12-28	milano	concluso	filo	10
9	Torneo di prova	2023-12-28	2023-12-28	milano	inCorso	filo	10
10	Torneo di prova	2023-12-28	2023-12-28	milano	inCorso	filo	10
1	ciao	2012-12-12	2012-12-12	k	prossimo	fili	5
2	ciao	2012-12-12	2012-12-12	k	prossimo	fili	1
\.


                                                                                                          4863.dat                                                                                            0000600 0004000 0002000 00000002274 14545326221 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        Filippo	Filiberto	filo	lala	2023-12-28	italiano	12	f	1
filippo	s	j	k	2013-11-02	j	5	t	2
Filippo	Filiberto	fili	lala	2023-12-27	italiano	6	f	5
gianluca	s	k4	k	2013-11-02	j	1	t	4
gianluca	s	k6	k	2013-11-02	j	1	t	4
gianluca	s	k7	k	2013-11-02	j	1	t	4
gianluca	s	k8	k	2013-11-02	j	1	t	4
gianluca	s	k9	k	2013-11-02	j	1	t	4
gianluca	s	k10	k	2013-11-02	j	1	t	4
gianluca	s	k11	k	2013-11-02	j	1	t	4
gianluca	s	k12	k	2013-11-02	j	1	t	4
gianluca	s	k13	k	2013-11-02	j	1	t	4
gianluca	s	k14	k	2013-11-02	j	1	t	4
gianluca	s	k15	k	2013-11-02	j	1	t	4
gianluca	s	k16	k	2013-11-02	j	1	t	4
gianluca	s	k17	k	2013-11-02	j	1	t	4
gianluca	s	k18	k	2013-11-02	j	1	t	4
gianluca	s	k19	k	2013-11-02	j	1	t	4
gianluca	s	k20	k	2013-11-02	j	1	t	4
gianluca	s	k21	k	2013-11-02	j	1	t	4
gianluca	s	k22	k	2013-11-02	j	1	t	4
gianluca	s	k23	k	2013-11-02	j	1	t	4
gianluca	s	k	k	2013-11-02	j	1	t	5
gianluca	s	k1	k	2013-11-02	j	1	t	5
gianluca	s	k2	k	2013-11-02	j	1	t	5
gianluca	s	k5	k	2013-11-02	j	1	f	4
gianluca	s	k3	k	2013-11-02	j	1	t	5
Alessia	Martini	m	m	2023-12-27	italiana	0	f	0
l	l	l	k	2021-12-10	italiana	0	f	0
margherita	valente	marghe	2023	2023-12-13	Canadese	0	f	0
k	k	kl	k	2023-12-06	Cinese	0	f	0
eg	ge	itsmexp	k	2002-11-30	Italiana	0	f	0
\.


                                                                                                                                                                                                                                                                                                                                    restore.sql                                                                                         0000600 0004000 0002000 00000016144 14545326221 0015376 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

DROP DATABASE "webApp";
--
-- Name: webApp; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "webApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';


ALTER DATABASE "webApp" OWNER TO postgres;

\connect "webApp"

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: iscrizione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iscrizione (
    utente character varying NOT NULL,
    torneo bigint NOT NULL
);


ALTER TABLE public.iscrizione OWNER TO postgres;

--
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
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    nome character varying NOT NULL,
    cognome character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    data_nascita date NOT NULL,
    "nazionalità" character varying NOT NULL,
    punteggio integer NOT NULL,
    admin boolean NOT NULL,
    punteggio_settimanale integer NOT NULL
);


ALTER TABLE public.utente OWNER TO postgres;

--
-- Data for Name: iscrizione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.iscrizione (utente, torneo) FROM stdin;
\.
COPY public.iscrizione (utente, torneo) FROM '$$PATH$$/4858.dat';

--
-- Data for Name: partita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partita (id, giocatore1, giocatore2, torneo, data, esito, turno, pgn) FROM stdin;
\.
COPY public.partita (id, giocatore1, giocatore2, torneo, data, esito, turno, pgn) FROM '$$PATH$$/4859.dat';

--
-- Data for Name: torneo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.torneo (id, nome, data_inizio, data_fine, luogo, stato, vincitore, numero_partecipanti) FROM stdin;
\.
COPY public.torneo (id, nome, data_inizio, data_fine, luogo, stato, vincitore, numero_partecipanti) FROM '$$PATH$$/4861.dat';

--
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (nome, cognome, username, password, data_nascita, "nazionalità", punteggio, admin, punteggio_settimanale) FROM stdin;
\.
COPY public.utente (nome, cognome, username, password, data_nascita, "nazionalità", punteggio, admin, punteggio_settimanale) FROM '$$PATH$$/4863.dat';

--
-- Name: partita_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partita_sequence', 54, true);


--
-- Name: torneo_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.torneo_sequence', 11, true);


--
-- Name: iscrizione iscrizione_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_pk PRIMARY KEY (utente, torneo);


--
-- Name: partita partita_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_pk PRIMARY KEY (id);


--
-- Name: torneo torneo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_pk PRIMARY KEY (id);


--
-- Name: utente utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pk PRIMARY KEY (username);


--
-- Name: iscrizione iscrizione_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk FOREIGN KEY (utente) REFERENCES public.utente(username);


--
-- Name: iscrizione iscrizione_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iscrizione
    ADD CONSTRAINT iscrizione_fk_1 FOREIGN KEY (torneo) REFERENCES public.torneo(id);


--
-- Name: partita partita_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk FOREIGN KEY (giocatore1) REFERENCES public.utente(username);


--
-- Name: partita partita_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_1 FOREIGN KEY (giocatore2) REFERENCES public.utente(username);


--
-- Name: partita partita_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partita
    ADD CONSTRAINT partita_fk_2 FOREIGN KEY (torneo) REFERENCES public.torneo(id);


--
-- Name: torneo torneo_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torneo
    ADD CONSTRAINT torneo_fk FOREIGN KEY (vincitore) REFERENCES public.utente(username);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            