declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}

declare namespace Cloudflare { interface Env { LAB_ADMIN_EMAIL?: string; LAB_ADMIN_PASSWORD_HASH?: string; LAB_ADMIN_PASSWORD_SALT?: string; } }
