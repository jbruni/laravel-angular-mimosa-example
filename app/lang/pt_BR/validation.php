<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Validation Language Lines
	|--------------------------------------------------------------------------
	|
	| The following language lines contain the default error messages used by
	| the validator class. Some of these rules have multiple versions such
	| such as the size rules. Feel free to tweak each of these messages.
	|
	*/

	"accepted"         => "O campo :attribute deve ser assinalado.",
	"active_url"       => "O campo :attribute não é um endereço URL válido.",
	"after"            => "O campo :attribute precisa ser uma data após :date.",
	"alpha"            => "O campo :attribute deve conter apenas letras.",
	"alpha_dash"       => "O campo :attribute deve conter apenas letras, números e traços.",
	"alpha_num"        => "O campo :attribute deve conter apenas letras e números.",
	"array"            => "O campo :attribute precisa ser um array.",
	"before"           => "O campo :attribute precisa ser uma data anterior a :date.",
	"between"          => array(
		"numeric" => "O campo :attribute precisa ter um valor entre :min e :max.",
		"file"    => "O campo :attribute precisa ser um arquivo de tamanho entre :min e :max kilobytes.",
		"string"  => "O campo :attribute precisa ter entre :min - :max caracteres.",
		"array"   => "O campo :attribute precisa conter entre :min - :max elementos.",
	),
	"confirmed"        => "O campo de confirmação de :attribute não confere.",
	"date"             => "O campo :attribute não é uma data válida.",
	"date_format"      => "O campo :attribute precisa ser uma data no formato :format.",
	"different"        => "Os campos :attribute e :other precisam ser diferentes.",
	"digits"           => "O campo :attribute precisa ter :digits dígitos.",
	"digits_between"   => "O campo :attribute precisa conter entre :min e :max dígitos.",
	"email"            => "O campo :attribute não é um endereço de e-mail válido.",
	"exists"           => "O campo :attribute especificado não existe no banco de dados.",
	"image"            => "O campo :attribute precisa ser uma imagem.",
	"in"               => "O valor selecionado para o campo :attribute não é válido.",
	"integer"          => "O campo :attribute precisa ser um número inteiro.",
	"ip"               => "O campo :attribute precisa ser um endereço IP válido.",
	"max"              => array(
		"numeric" => "O campo :attribute não pode ser maior que :max.",
		"file"    => "O campo :attribute não pode ter mais que :max kilobytes.",
		"string"  => "O campo :attribute não pode ter mais que :max caracteres.",
		"array"   => "O campo :attribute não pode ter mais que :max elementos.",
	),
	"mimes"            => "O campo :attribute precisa ser um arquivo do tipo: :values.",
	"min"              => array(
		"numeric" => "O campo :attribute não pode ser menor que :min.",
		"file"    => "O campo :attribute não pode ter menos que :min kilobytes.",
		"string"  => "O campo :attribute não pode ter menos que :min caracteres.",
		"array"   => "O campo :attribute não pode ter menos que :min elementos.",
	),
	"not_in"           => "O valor selecionado para o campo :attribute não é válido.",
	"numeric"          => "O campo :attribute precisa ser numérico.",
	"regex"            => "O formato do campo :attribute não é válido.",
	"required"         => "O campo :attribute é obrigatório.",
	"required_if"      => "O campo :attribute é obrigatório quando :other é :value.",
	"required_with"    => "O campo :attribute é obrigatório quando :values está definido.",
	"required_without" => "O campo :attribute é obrigatório quando :values não está definido.",
	"same"             => "Os campos :attribute e :other precisam ser iguais.",
	"size"             => array(
		"numeric" => "O campo :attribute precisa valer :size.",
		"file"    => "O campo :attribute precisa ter :size kilobytes.",
		"string"  => "O campo :attribute precisa ter :size caracteres.",
		"array"   => "O campo :attribute precisa conter :size elementos.",
	),
	"unique"           => "O valor especificado para o campo :attribute já está sendo utilizado.",
	"url"              => "O campo :attribute não é um endereço URL válido.",

	"after_than"       => "O campo :attribute precisa ter um valor depois de :other (:value).",
	"date_between"     => "O campo :attribute precisa estar entre :min e :max.",

	/*
	|--------------------------------------------------------------------------
	| Custom Validation Language Lines
	|--------------------------------------------------------------------------
	|
	| Here you may specify custom validation messages for attributes using the
	| convention "attribute.rule" to name the lines. This makes it quick to
	| specify a specific custom language line for a given attribute rule.
	|
	*/

	'custom' => array(
		'dias_de_entrega' => array(
			'dias_de_entrega' => 'O campo :attribute precisa conter dias de semana válidos.',
		),
	),

	/*
	|--------------------------------------------------------------------------
	| Custom Validation Attributes
	|--------------------------------------------------------------------------
	|
	| The following language lines are used to swap attribute place-holders
	| with something more reader friendly such as E-Mail Address instead
	| of "email". This simply helps us make messages a little cleaner.
	|
	*/

	'attributes' => array(),

);
