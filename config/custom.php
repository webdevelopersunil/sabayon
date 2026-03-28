<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Enable Custom LDAP/Bandhan Authentication
    |--------------------------------------------------------------------------
    |
    | If true, Fortify will use the custom authentication logic defined in
    | FortifyServiceProvider. If false, it will bypass it and use the default.
    |
    */
    'use_custom_auth' => env('USE_CUSTOM_AUTH', false),
];