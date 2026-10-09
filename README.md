# LabITec POA — Blog

Blog responsivo em português, com página inicial, leitura de matérias, painel editorial e login próprio com e-mail e senha.

## Acesso inicial

O site permanece privado na plataforma Sites. Em /admin, a proprietária autenticada na plataforma configura o primeiro e-mail e senha do laboratório. A variável secreta LAB_SETUP_OWNER_EMAIL identifica a proprietária autorizada a fazer essa configuração. A conta inicial é única, criada atomicamente, sem senha padrão. Depois de criada, o painel exige a sessão própria do laboratório, inclusive quando o visitante já está conectado à plataforma.

Senhas usam PBKDF2-SHA256 com salt aleatório e 100.000 iterações. As sessões são aleatórias, guardadas por hash no D1, expiram em 8 horas e usam cookie HttpOnly, SameSite=Strict e Secure em HTTPS. Login tem limite de tentativas. APIs de matérias verificam a sessão no servidor. Sair revoga a sessão no banco.

Não há recuperação por e-mail nem cadastro público. Guarde a senha escolhida. Não remova a restrição privada da plataforma sem revisar a política de autenticação e de recuperação de conta.

## Desenvolvimento

Requer Node 22.13 ou superior. Instale com npm ci e inicie com npm run dev. Copie .env.example para .env e use apenas uma identidade local de teste em LAB_SETUP_OWNER_EMAIL. A prévia local oferece a identidade seedy@sites.test. Não versione .env, senhas, sessões ou arquivos de estado do banco.

## Banco de dados

Cloudflare D1, binding DB. Esquema em db/schema.ts e migrações incrementais em drizzle/. Gere alterações com npm run db:generate. A publicação via Sites aplica as migrações; a prévia local precisa aplicá-las com Wrangler, conforme documentação do starter. Uma matéria demonstrativa é criada em tempo de execução.

## Publicação

A hospedagem atual é gerenciada por Sites. O manifesto .openai/hosting.json conserva a identidade deste site. Repositório GitHub serve como cópia do código; enviar commits ao GitHub não publica automaticamente o blog.

## Identidade visual

Cores e logo baseados nas referências fornecidas. A foto ilustrativa está referenciada à Little Big Dairy no texto da matéria. Revise o conteúdo demonstrativo antes do uso institucional.

