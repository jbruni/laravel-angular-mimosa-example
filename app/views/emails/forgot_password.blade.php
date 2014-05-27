Olá, {{ $name }} 

Obrigado por ser um assinante do {{ Config::get('business.site_name') }}.

Por favor, acesse a página abaixo para redefinir a sua senha de acesso:

{{ $url }} 

Lembre-se de criar uma senha difícil de descobrir. Sugerimos que use pelo menos 8 caracteres, incluindo um número e um símbolo.

Atenciosamente,

Equipe {{ Config::get('business.site_name') }} 
