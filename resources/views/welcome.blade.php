
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Batam Culture</title>

    <script>
        window.adminUser = @json(
            auth()->check()
                ? [
                    'name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                ]
                : null
        );
    </script>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
    <div id="app"></div>
</body>
</html>
