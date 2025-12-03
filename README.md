# PGE Miner — Portfólio

## Visão Geral
- Plataforma web de busca e gestão de documentos jurídicos da PGE-SC, com filtros avançados, leitura inline de PDFs e fluxos dedicados para pareceres, PROCON e SAF.
- Autenticação corporativa via LDAP (com fallback JWT) e controle de acesso integrado ao diretório interno.
- Busca full-text em Elasticsearch com filtros por datas, assinaturas, núcleos, tipos de citação/intimação e status de revisão.
- Conversões e manipulação de documentos (PDF/Word), revisão colaborativa e trilha de ações (revisar, marcar como revisado, excluir).

## Destaques Rápidos
- Pesquisas em alto volume com paginação e ordenação; visualização direta do inteiro teor (PDF).
- Módulo de pareceres com filtros SGPe, assinaturas, setores, intervalos de data e conversão para Word.
- Fluxos PROCON/SAF: gestão de “Dispensa de Recurso” com revisão e marcação rápida.
- Edição assistida de cadastro com formulário ao lado do PDF para ganho de produtividade.

## Arquitetura & Tecnologias
- **Backend:** Python 3, Django 3.2, Django REST Framework, SimpleJWT, CORS.
- **Pesquisa:** Elasticsearch 7.17 com django-elasticsearch-dsl/dsl-drf.
- **Bancos:** PostgreSQL (principal) e Oracle via `cx-Oracle` para integrações legadas.
- **Frontend:** Next.js 13 (React 18, TypeScript) com Chakra UI, React Table, React Hook Form, CKEditor 5, React-PDF-Viewer, React-Select, DatePicker, Toastify.
- **Docs/OCR:** PDFMiner, PyPDF2, pdf2image, pytesseract, pdf2docx, reportlab.
- **Infra/DevOps:** Docker/Docker Compose (dev/prod), Gunicorn (backend), servidor Node/Next (`start_prod`), variáveis de ambiente para APIs/bancos/LDAP.

## Integrações Principais
- SGPE (login, processo, tramitação, documentos via WSDL).
- EPROC 1G/2G (WSDL) para consulta e sincronização de processos judiciais.
- LDAP corporativo para autenticação e grupos.
- E-mail transacional para notificações de fluxo.

## Galeria de Telas
Imagens já organizadas em `images/` com nomes sequenciais:

- ![Login e onboarding](images/miner-01.png)
- ![Busca e filtros](images/miner-02.png)
- ![Consulta de pareceres](images/miner-03.png)
- ![Fluxos PROCON/SAF](images/miner-04.png)
- ![Dispensa de recurso](images/miner-05.png)
- ![Revisão lado a lado](images/miner-06.png)
- ![Visão adicional](images/miner-07.png)

## Como Rodar (Dev)
- Backend: `docker-compose up` em `backend-miner`; criar superusuário e indexar: `python3 manage.py search_index --rebuild`.
- Frontend: `yarn install` e `yarn dev` em `frontend-miner` (ou use o `docker-compose` da raiz para subir tudo).

## Observações
- Mantenha variáveis de ambiente sensíveis (SGPE/EPROC/LDAP/bancos) fora do repositório público.
- Reindexe o Elasticsearch com `python3 manage.py search_index --rebuild` ao ingerir novos dados.

---

# Plataforma PGE — Portfólio

## Visão Geral
- Hub unificado de ferramentas da PGE-SC: pautas de audiência, atos normativos, reservas de salas e integração com o Miner.
- Autenticação com JWT em cookies httpOnly e opção de LDAP corporativo; CORS/CSRF configurados.
- Dashboard com busca, categorias, favoritos e notificações; UI moderna (Radix/shadcn).
- Integrações SOAP (Zeep/xmltodict) parametrizadas por tribunal/serviço e logs estruturados.

## Stack Técnica
- **Backend:** Django + DRF, SimpleJWT, WhiteNoise, CORS, logging configurável.
- **Dados/Integrações:** PostgreSQL 16; Zeep/XML para webservices; Firebase (reservas em tempo real).
- **Frontend:** Next.js + React 18 (TypeScript), Radix UI/shadcn, lucide-react, react-hook-form, recharts.
- **Infra:** Docker Compose (dev/prod) com serviços separados para Postgres, backend e frontend; `.env` por ambiente.

## Funcionalidades em Destaque
- Hub de ferramentas com favoritos, recentes e filtros por categoria.
- Pautas de audiência com filtros (órgão, relator, assunto, tipo de sessão) e ranking por câmaras.
- Atos normativos com consulta/gestão em UI responsiva.
- Reserva de salas/auditórios com status em tempo real (Firebase) e verificação de conflito.
- Segurança: JWT httpOnly, suporte a LDAP, CORS/CSRF hardening.

## Galeria de Telas
Placeholders prontos em `images/` (substitua por capturas reais quando quiser).
- ![Login](images/plataforma-01.png)
- ![Dashboard](images/plataforma-02.png)
- ![Pautas de audiência](images/plataforma-03.png)
- ![Atos normativos](images/plataforma-04.png)
- ![Reserva de salas](images/plataforma-05.png)
- ![Integrações](images/plataforma-06.png)

## Como Rodar (Dev)
- `docker-compose -f docker-compose-dev.yml up` (sobe Postgres + backend + frontend).
- Backend: `DJANGO_SETTINGS_MODULE=config.settings.development`, migrações aplicadas no entrypoint.
- Frontend: `NEXT_PUBLIC_API_BASE_URL=http://localhost:8001`, roda em `3001`.

## Observações
- Guarde secrets (.env.prod) fora do repositório público.
- Ajuste CORS/CSRF/LDAP conforme ambiente.

## Portfólios
- Miner: `portfolio.html`
- Plataforma PGE: `plataformas.html`
