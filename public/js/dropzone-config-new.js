
 Dropzone.options.fileUpload = {
             url:"/images-save-new",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            acceptedFiles: "image/*",
            headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
             init: function () {
                var submitButton = document.querySelector("#new_upload_submit_button");
                var wrapperThis = this;
                submitButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    wrapperThis.processQueue();
                });
                this.on("addedfile", function (file) {
                    // Create the remove button
                    var removeButton = Dropzone.createElement("<button class='btn btn-sm dark m-1'>Remove File</button>");
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

            }
            // end of init
        };
        // end of dropzone
