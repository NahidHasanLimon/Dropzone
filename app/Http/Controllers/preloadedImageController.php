<?php
 
namespace App\Http\Controllers;
 
use App\Upload;
use App\New_Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

 
class preloadedImageController extends Controller
{
 
    private $photos_path;
 
    public function __construct()
    {
        $this->photos_path = public_path('/images');
    }
 
    /**
     * Display all of the images.
     *
     * @return \Illuminate\Http\Response
     */
    public function index_preload()
    {
        $photos_new = New_Upload::all();
        return view('preload', compact('photos_new'));
    }
     public function preload_images()
    {
        $photos= New_Upload::all();
        foreach ($photos as $file) {
        $obj['name'] = $file['filename']; //get the filename in array
        $obj['size'] = filesize("images/".$file['filename']); //get the flesize in array
        $result[] = $obj; // copy it to another array
        }
         // echo json_encode($result);
      return response()->json($result);
         // dd($result);
    }
  
      public function destroy(Request $request)
    {
        $filename = $request->id;
        // dd($filename);
        // $uploaded_image = New_Upload::where('original_name', basename($filename))->first();
        $uploaded_image = New_Upload::where('filename', basename($filename))->first();
        // dd(  $uploaded_image   );
 
        if (empty($uploaded_image)) {
            return Response::json(['message' => 'Sorry file does not exist'], 400);
        }
 
        $file_path = $this->photos_path . '/' . $uploaded_image->filename;
        $resized_file = $this->photos_path . '/' . $uploaded_image->resized_name;
 
        if (file_exists($file_path)) {
            unlink($file_path);
        }
 
        if (file_exists($resized_file)) {
            unlink($resized_file);
        }
 
        if (!empty($uploaded_image)) {
            $uploaded_image->delete();
        }
 
        return Response::json(['message' => 'File successfully delete'], 200);
    }
 
    /**
     * Remove the images from the storage.
     *
     * @param Request $request
     */
    
}