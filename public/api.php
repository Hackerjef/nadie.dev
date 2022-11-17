<?php

require __DIR__ . '/../vendor/autoload.php';

app()->config('debug', false);
app()->setBasePath('/api');

app()->get("/", function () {
  response()->json(["endpt" => "/"]);
});

app()->run();