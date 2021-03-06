<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('main');
// });
Route::get('/', 'UploadImagesController@create');

Route::post('/images-save', 'UploadImagesController@store');

Route::post('/images-delete', 'UploadImagesController@destroy');


Route::get('/images-show', 'UploadImagesController@index');



Route::get('/new', 'UploadImagesControllerNew@create');
Route::get('/images-show-new', 'UploadImagesControllerNew@index');
Route::post('/images-save-new', 'UploadImagesControllerNew@store');

Route::get('/preload', 'preloadedImageController@index_preload');
Route::get('/preload-image', 'preloadedImageController@preload_images');
Route::post('/images-delete-preload', 'preloadedImageController@destroy');