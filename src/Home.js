import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./Home.css";

import img1 from "./Img/image-1.webp";
import img2 from "./Img/image-2.webp";
import img3 from "./Img/image-3.webp";
import img4 from "./Img/image-4.webp";
import img5 from "./Img/image-5.webp";
import img6 from "./Img/image-6.webp";
import img7 from "./Img/image-7.webp";
import img8 from "./Img/image-8.webp";
import img9 from "./Img/image-9.webp";
import img11 from "./Img/image-11.jpeg";
import img12 from "./Img/image-10.jpeg";

const items = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img12,
  img11,
];

class Home extends Component {
  state = {
    images: items,
    selectedImages: [],
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const images = [...this.state.images];
    const [reorderedItem] = images.splice(result.source.index, 1);
    images.splice(result.destination.index, 0, reorderedItem);

    this.setState({ images });
  };

  toggleImageSelection = (image) => {
    const selectedImages = [...this.state.selectedImages];

    if (selectedImages.includes(image)) {
      selectedImages.splice(selectedImages.indexOf(image), 1);
    } else {
      selectedImages.push(image);
    }

    this.setState({ selectedImages });
  };

  deleteSelectedImages = () => {
    const images = this.state.images.filter(
      (image) => !this.state.selectedImages.includes(image)
    );

    this.setState({
      images,
      selectedImages: [],
    });
  };

  handleImageSelect = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    this.setState({
      images: [...this.state.images, ...Array.from(files)],
    });
  };

  render() {
    const { selectedImages } = this.state;

    return (
      <div>
        <div className="homeHederBox">
          <h3 className="homeHederText">
            {" "}
            {selectedImages.length} File Selected
          </h3>
          <button
            className="homeHederButton"
            onClick={this.deleteSelectedImages}
          >
            Delete File
          </button>
        </div>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="imageGallery" direction="horizontal">
            {(provided) => (
              <div
                className="image-gallery"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state.images.map((image, index) => (
                  <Draggable key={image} draggableId={image} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={`image-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className={`image ${
                            this.state.selectedImages.includes(image)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => this.toggleImageSelection(image)}
                        >
                          <img height={100} src={image} alt={image} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                <input type="file" multiple onChange={this.handleImageSelect} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Home;
