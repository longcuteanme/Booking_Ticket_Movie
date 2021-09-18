import React, { Component } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { modalAction } from "../../redux/actions/actionCombine";

class ModalItem extends Component {
  closeModal = () => {
    const youtubeVideo = document.getElementById("youtubeVideo");
    // youtubeVideo.stopVideo='true';
    youtubeVideo.src = "";
    this.props.dispatch(modalAction.Creators.close());
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={() => {
          this.closeModal();
        }}
        footer={null}
        bodyStyle={{ padding: "0", height: "45vw" }}
        width="80vw"
        centered
        // closeIcon={<CloseOutlined />}
      >
        <iframe
          className="h-full w-full"
          id="youtubeVideo"
          src={this.props.src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Modal>
    );
  }
}
export default connect((state) => {
  return {
    src: state.modalReducer.src,
    visible: state.modalReducer.visible,
  };
})(ModalItem);
