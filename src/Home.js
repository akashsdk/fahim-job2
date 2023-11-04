import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import "./Home.css";

const items = ["Image1.jpg", "Image2.jpg", "Image3.jpg", "Image4.jpg"];

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

    // Convert the FileList into an array and update the state
    this.setState({
      images: [...this.state.images, ...Array.from(files)],
    });
  };

  render() {
    const { selectedImages } = this.state;
    return (
      <div>
        <button onClick={this.deleteSelectedImages}>
          <FaTrash /> Delete Selected
        </button>
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
                          <img src={image} alt={image} />
                          
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <input type="file" multiple onChange={this.handleImageSelect} />
        <p>Selected Images: {selectedImages.length}</p>
      </div>
    );
  }
}

export default Home;
