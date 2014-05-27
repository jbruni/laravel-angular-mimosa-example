<?php 

/*
|--------------------------------------------------------------------------
| Global Helper Functions
|--------------------------------------------------------------------------
*/

/*
 * Similar to array_only (http://laravel.com/docs/helpers)
 * but this one always fill all keys, using a default value when key is absent
 */
function array_filled($array, $keys, $value = null)
{
	$keys         = array_values($keys);
	$array_keys   = array_fill_keys($keys, $value);
	$array_only   = array_only($array, $keys);
	$array_filled = $array_only + $array_keys;

	uksort($array_filled, function($a, $b) use($keys) { 
		return array_search($a, $keys) > array_search($b, $keys);
	});

	return $array_filled;
}

function dictionary($collection, $function = 'toArray', $json = false)
{
	$dictionary = array();

	if (substr(get_class($collection), -7) == 'Builder')
	{
		$collection = $collection->get();
	}

	foreach ($collection as $count => $value)
	{
		$key = method_exists($value, 'getKey') ? $value->getKey() : $count;

		$dictionary[$key] = $value->$function();
	}

	return $json ? json_encode($dictionary) : $dictionary;
}

function array_collection($collection, $function = 'toArray', $json = false)
{
	$result = array_values(dictionary($collection, $function));

	return $json ? json_encode($result) : $result;
}

function get_carbon($date = null, $format = 'Y-m-d')
{
	if (is_null($date))
	{
		$date = Carbon::now();
	}
	elseif (!is_object($date))
	{
		$date = Carbon::createFromFormat($format, $date);
	}
	else
	{
		$date = Carbon::instance($date);
	}

	return $date;
}

function newrelic($function)
{
	if (!extension_loaded ('newrelic'))
	{
		return '';
	}

	$function = 'newrelic_' . $function;

	$params = func_get_args();

	array_shift($params);

	return call_user_func_array($function, $params);
}

function format_cpf_cnpj($cpf_cnpj)
{
	return with(new Business\Boletos\BoletoExtension)->formatCpfCnpj($cpf_cnpj);
}

function draw_bar_code($sequencia)
{
	return with(new Business\Boletos\BoletoExtension)->drawBarCode($sequencia);
}

function app_number_format($value)
{
	return number_format($value, 2, '.', '');
}

function dirty_debug_db()
{
	DB::listen(function($sql, $bindings)
	{
		$params = array_map(function ($value) { return '"' . $value . '"'; }, $bindings);
		array_unshift($params, str_replace('?', '%s', $sql) . ';');
		echo '<pre>' . call_user_func_array('sprintf', $params) . '</pre>';
	});
}

function logged($role = '')
{
	return false; // Business\Security::hasAuthenticatedUser($role);
}

function depois_das_oito()
{
	$agora = new DateTime;
	return ($agora->format('H') >= 20);
}

function amanha()
{
	return hoje()->add(new DateInterval('P1D'));
}

function hoje()
{
	return defined('HOJE') ? DateTime::createFromFormat('d/m/Y', HOJE) : new DateTime;
}
