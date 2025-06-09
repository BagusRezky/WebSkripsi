import Hls from "hls.js";
import useHLS from "../../../hooks/useHls";

interface FourIsToThreeProps {
  billboardName?: string;
}

export default function FourIsToThree({
  billboardName = "A",
}: FourIsToThreeProps) {
  // Determine stream URL based on billboard name
  const getStreamUrl = (billboard: string): string => {
    if (billboard === "A") {
      return "https://streaming.theaida.id/hls/test.m3u8";
    } else if (billboard === "B") {
      return "https://streaming.theaida.id/hls/test2.m3u8";
    } else if (billboard === "C") {
      return "https://streaming.theaida.id/hls/test3.m3u8";
    } else {
      // Default fallback
      return "https://streaming.theaida.id/hls/test.m3u8";
    }
  };

  const streamUrl = getStreamUrl(billboardName);
  const { videoRef, canPlayHLS } = useHLS(streamUrl);

  return (
    <div className="aspect-4/3 overflow-hidden rounded-lg bg-gray-100">
      {!canPlayHLS && !Hls.isSupported() ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-600">
            Your browser doesn't support HLS streaming
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          playsInline
          autoPlay
          muted
        />
      )}
    </div>
  );
}