<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Site Name
	|--------------------------------------------------------------------------
	|
	| The name of the web site.
	|
	*/

	'site_name' => 'Website',

	/*
	|--------------------------------------------------------------------------
	| Support Email
	|--------------------------------------------------------------------------
	|
	| Email address for support.
	|
	*/

	'support_email' => 'support@website.com',

	/*
	|--------------------------------------------------------------------------
	| Sales Email
	|--------------------------------------------------------------------------
	|
	| Email address for sales.
	|
	*/

	'sales_email' => 'sales@website.com',

	/*
	|--------------------------------------------------------------------------
	| Public Email
	|--------------------------------------------------------------------------
	|
	| Email addresses for contact page.
	|
	*/

	'public_email' => array(
		'support@website.com' => 'Support',
		'sales@website.com'   => 'Sales',
	),

	/*
	|--------------------------------------------------------------------------
	| Prazo para pagar pedido avulso
	|--------------------------------------------------------------------------
	|
	| Quantos DIAS após o pedido ser feito deve ser a data de vencimento
	| da respectiva fatura.
	|
	*/

	'prazo_para_pagar_pedido_avulso' => 30,

	/*
	|--------------------------------------------------------------------------
	| Prazo para pagar assinatura que é desativada
	|--------------------------------------------------------------------------
	|
	| Quantos DIAS após a desativação deve ser a data de vencimento
	| da respectiva fatura.
	|
	*/

	'prazo_para_pagar_assinatura' => 3,

	/*
	|--------------------------------------------------------------------------
	| Prazo para pagar mensalidade
	|--------------------------------------------------------------------------
	|
	| Quantos DIAS após o encerramento do ciclo deve ser a data de vencimento
	| da respectiva fatura.
	|
	*/

	'prazo_para_pagar_mensalidade' => 10,

	/*
	|--------------------------------------------------------------------------
	| Email confirmation link expiration time
	|--------------------------------------------------------------------------
	|
	| How many MINUTES the email verification link sent by email will be valid.
	|
	*/

	'verify_email_expires' => 1440,

	/*
	|--------------------------------------------------------------------------
	| Forgot password code expiration time
	|--------------------------------------------------------------------------
	|
	| How many MINUTES the password recovery link sent by email will be valid.
	|
	*/

	'forgot_password_expires' => 30,

	/*
	|--------------------------------------------------------------------------
	| Enable Master Key
	|--------------------------------------------------------------------------
	|
	| Enable the "master key" (password to authenticate as any user).
	|
	*/

	'enable_master_key' => true,

	/*
	|--------------------------------------------------------------------------
	| Master Key
	|--------------------------------------------------------------------------
	|
	| Password to authenticate as any user.
	|
	*/

	'master_key' => 'this-is-the-most-important-secret-of-all',

	/*
	|--------------------------------------------------------------------------
	| New Relic License Key
	|--------------------------------------------------------------------------
	|
	| License Key for New Relic
	|
	*/

	'newrelic_key' => 'new-relic-key-here-please',

);
