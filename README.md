# LabITec POA — Blog

Blog responsivo em português, com página inicial, leitura de matérias, painel editorial e login próprio com e-mail e senha.

## Acesso inicial

O site permanece privado na plataforma Sites. A rota /admin oferece somente login por e-mail e senha para a equipe que publica matérias. Não há tela de criação de conta nem endpoint de cadastro. A conta administrativa é provisionada por configuração secreta do servidor, sem senha padrão no código. Contas existentes são preservadas.

Senhas usam PBKDF2-SHA256 com salt aleatório e 100.000 iterações. As sessões são aleatórias, guardadas por hash no D1, expiram em 8 horas e usam cookie HttpOnly, SameSite=Strict e Secure em HTTPS. Login tem limite de tentativas. APIs de matérias verificam a sessão no servidor. Sair revoga a sessão no banco.

Não há recuperação por e-mail nem cadastro público. Guarde os dados de acesso fornecidos à equipe. Não remova a restrição privada da plataforma sem revisar a política de autenticação e de recuperação de conta.

## Desenvolvimento

Requer Node 22.13 ou superior. Instale com npm ci e inicie com npm run dev. Copie .env.example para .env e preencha LAB_ADMIN_EMAIL, LAB_ADMIN_PASSWORD_HASH e LAB_ADMIN_PASSWORD_SALT apenas no ambiente local. O hash deve usar PBKDF2-SHA256 com 100.000 iterações, 32 bytes de saída e salt textual hexadecimal de 64 caracteres. Nunca versione senhas, hashes de acesso, arquivos .env ou estado do banco. Na hospedagem, configure os valores como segredos em Sites.

## Banco de dados

Cloudflare D1, binding DB. Esquema em db/schema.ts e migrações incrementais em drizzle/. Gere alterações com npm run db:generate. A publicação via Sites aplica as migrações; a prévia local precisa aplicá-las com Wrangler, conforme documentação do starter. Uma matéria demonstrativa é criada em tempo de execução.

## Publicação

A hospedagem atual é gerenciada por Sites. O manifesto .openai/hosting.json conserva a identidade deste site. Repositório GitHub serve como cópia do código; enviar commits ao GitHub não publica automaticamente o blog.

## Identidade visual

Cores e logo baseados nas referências fornecidas. A foto ilustrativa está referenciada à Little Big Dairy no texto da matéria. Revise o conteúdo demonstrativo antes do uso institucional.
