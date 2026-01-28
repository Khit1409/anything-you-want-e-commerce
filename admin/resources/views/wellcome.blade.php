<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Any Thing You Want - Admin System</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif

</head>

<body>
    <main>
        <div>
            <h1 class="text-3xl">My System</h1>
            <p>Wellcome to my system, place of manager Anything in Anything You Want - ecommerce</p>
        </div>
        <div>
            <div>

            </div>
        </div>
    </main>

</body>

</html>