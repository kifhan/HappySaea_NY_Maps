import React, { Ref } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
// import Modal from "react-modal";

interface Props extends YouTubeProps {
  videoCode: string;
  height: number;
  width: number;
  videoref: Ref<YouTube>;
  // onPlay: (event: { target: YouTube }) => void;
  // onPause: (e: any) => void;
  // onEnd: (e: any) => void;
  // onError: (e: any) => void;
  // onStateChange: (e: any) => void;
  // onPlaybackRateChange: (e: any) => void;
  // onPlaybackQualityChange: (e: any) => void;
}

const Video = ({ videoCode, width, height, videoref, onPlay, onPause, onEnd, onStateChange, onReady, onPlaybackRateChange }: Props) => {
  // const [modalIsOpen, setModalIsOpen] = React.useState(false);
  // let videoCode;
  // if (videoUrl) {
  //   videoCode = videoUrl.split("v=")[1].split("&")[0];
  // }

  // const checkElapsedTime = (e: any) => {
  //   console.log(e.target.playerInfo.playerState);
  //   const duration = e.target.getDuration();
  //   const currentTime = e.target.getCurrentTime();
  //   if (currentTime / duration > 0.95) {
  //     setModalIsOpen(true);
  //   }
  // };

  const opts: any = {
    height: height.toString(),
    width: width.toString(),
    // height: '390',
    // width: '640',
    playerVars: {
      // autoplay: 1
      // controls: 0,
      listType: "user_uploads",
      showinfo: 0,
      rel: 0,
    },
  };
  // https://developers.google.com/youtube/player_parameters

  // <YouTube
  //     videoId={string}                  // defaults -> null
  //     id={string}                       // defaults -> null
  //     className={string}                // defaults -> null
  //     containerClassName={string}       // defaults -> ''
  //     opts={obj}                        // defaults -> {}
  //     onReady={func}                    // defaults -> noop
  //     onPlay={func}                     // defaults -> noop
  //     onPause={func}                    // defaults -> noop
  //     onEnd={func}                      // defaults -> noop
  //     onError={func}                    // defaults -> noop
  //     onStateChange={func}              // defaults -> noop
  //     onPlaybackRateChange={func}       // defaults -> noop
  //     onPlaybackQualityChange={func}    // defaults -> noop
  //     />

  // const handleExerciseComplete = () => console.log("Do something");

  return (
    <div style={styles.container}>
      <div>
        <div>
          <YouTube
            ref={videoref}
            videoId={videoCode}
            // containerClassName="embed embed-youtube"
            iframeClassName="embed embed-youtube"
            opts={opts}
            onReady={(e) => { if (onReady) onReady(e) }}
            onPlay={(e) => { if (onPlay) onPlay(e) }}
            onPause={(e) => { if (onPause) onPause(e) }}
            onEnd={(e) => { if (onEnd) onEnd(e) }}
            onStateChange={(e) => { if (onStateChange) onStateChange(e) }}
            onPlaybackRateChange={(e) => { if (onPlaybackRateChange) onPlaybackRateChange(e) }}
          />
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Exercise Completed"
        style={{ content: styles.modal }}
      >
        <div>
          <h3>Completed the exercise?</h3>
          <button onClick={handleExerciseComplete}>Complete exercise</button>
        </div>
      </Modal> */}
    </div>
  );
}

const styles = {
  container: {
    margin: "0",
    padding: "0",
    marginBottom: "-4px",
  },
  // modal: {
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto",
  //   marginRight: "-50%",
  //   transform: "translate(-50%, -50%)"
  // }
};

export default Video;