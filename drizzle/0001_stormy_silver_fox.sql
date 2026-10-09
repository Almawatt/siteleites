CREATE TABLE `lab_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`salt` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lab_accounts_email_unique` ON `lab_accounts` (`email`);--> statement-breakpoint
CREATE TABLE `lab_attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`count` text NOT NULL,
	`window_start` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lab_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `lab_accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_lab_sessions_expires` ON `lab_sessions` (`expires_at`);