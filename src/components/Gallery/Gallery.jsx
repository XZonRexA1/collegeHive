const Gallery = () => {
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-golos text-gray-900 text-center mb-8">
          <div className="text-center mt-12 font-bold font-golos text-4xl">View our <span className="bg-black text-white p-2 rounded">Gallery</span></div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="relative">
              <img
                src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZHVhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'
                alt="Image 1"
                className="w-full h-auto rounded-lg"
              />
           
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1565034946487-077786996e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYWR1YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Image 2"
                className="w-full h-auto rounded-lg"
              />
      
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Image 3"
                className="w-full h-auto rounded-lg"
              />
        
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyYWR1YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Image 4"
                className="w-full h-auto rounded-lg"
              />
              
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                alt="Image 4"
                className="w-full h-auto rounded-lg"
              />
              
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Image 4"
                className="w-full h-auto rounded-lg"
              />
              
            </div>
            <div className="relative">
              <img
                src='https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60'
                alt="Image 1"
                className="w-full h-auto rounded-lg"
              />
           
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498079022511-d15614cb1c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGdyYWR1YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Image 4"
                className="w-full h-auto rounded-lg"
              />
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Gallery;
