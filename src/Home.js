import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      images: [], // Array to store selected images
    };
  }

  handleImageSelect = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    // Convert the FileList into an array and update the state
    this.setState({
      images: [...this.state.images, ...Array.from(files)],
    });
  };

  handleImageDelete = (index) => {
    const updatedImages = [...this.state.images];
    updatedImages.splice(index, 1);

    this.setState({
      images: updatedImages,
    });
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <input type="file" multiple onChange={this.handleImageSelect} />
        <div>
          {images.map((image, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
              <button onClick={() => this.handleImageDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
        <p>Selected Images: {images.length}</p>
      </div>
    );
  }
}

export default Home;
