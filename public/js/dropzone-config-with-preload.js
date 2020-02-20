
 Dropzone.options.fileUpload = {
             url:"/images-save-new",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            acceptedFiles: "image/*",
            // addRemoveLinks: true,
             // previewTemplate: "<div></div>",
            headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
             init: function () {
  var wrapperThis = this;
 // var deleteBntDropzone = Dropzone.createElement("<button class='btn btn-sm dark m-1'>Delete</button>");
  var removeButton = Dropzone.createElement("<button class='btn btn-sm dark m-1'>Remove File</button>");

 $.getJSON('/preload-image', function(data) { // get the json response

            $.each(data, function(key,value){ //loop through it
       const deleteBntDropzone = Dropzone.createElement("<button class='btn btn-sm dark m-1'>Delete</button>");
                var mockFile = { name: value.name, size: value.size }; // here we get the file name and size as response 
                wrapperThis.options.addedfile.call(wrapperThis, mockFile);
                wrapperThis.options.thumbnail.call(wrapperThis, mockFile, "/images/"+value.name);//uploadsfolder is the folder where you have all those uploaded files
                mockFile.previewElement.append(deleteBntDropzone);
                mockFile.previewElement.classList.add('dz-success');
                mockFile.previewElement.classList.add('dz-complete');
            });

        });
 // end of loop
     // deleteBntDropzone.addEventListener("click", function (mockFile) {
     //                    // Make sure the button click doesn't submit the form:
     //                    e.preventDefault();
     //                    alert("delete");
     //                    // wrapperThis.removeFile(mockFile);
                      
     //                });










    //start  for new addedd images
                var submitButton = document.querySelector("#new_upload_submit_button");

                submitButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    wrapperThis.processQueue();
                });
                this.on("addedfile", function (file) {
                    // Create the remove button
                   
                    // Listen to the click event
                    removeButton.addEventListener("click", function (e) {
                        // Make sure the button click doesn't submit the form:
                        e.preventDefault();
                        e.stopPropagation();
                        // Remove the file preview.
                        wrapperThis.removeFile(file);
                        // If you want to the delete the file on the server as well,
                        // you can do the AJAX request here.
                    });
                    // Add the button to the file preview element.
                    file.previewElement.appendChild(removeButton);
                });
                this.on('sendingmultiple', function (data, xhr, formData) {
                    formData.append("name", $("#name").val());
                });
                this.on('queuecomplete', function( file ){
                      alert("Successfully uploaded all images!");
                     // wrapperThis.removeAllFiles(true);
                });  
                 $(document).on('click','#cancelButton',function(e){
                        alert("Are you sure to remove all form list ??") ;
                        wrapperThis.removeAllFiles(true);
                        }); 
                   // End of for new addedd images

            }
            // end of init
        };
        // end of dropzone
