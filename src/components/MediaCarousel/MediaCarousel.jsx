import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

/**
 * Carousel with venue images.
 * @param {Array} media - The URLs for the venue media.
 * @returns Carousel.
 */
function MediaCarousel({ media }) {
  const [selectedMedia, setSelectedMedia] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef([]);

  useEffect(() => {
    if (media && media[0]) {
      carouselRef.current = carouselRef.current.slice(0, media.length);
      setSelectedMedia(media[0]);
      setSelectedIndex(0);
    }
  }, [media]);

  const handleSelectChange = (newIndex) => {
    if (media && media.length > 0) {
      setSelectedMedia(media[newIndex]);
      setSelectedIndex(newIndex);
      if (carouselRef.current[newIndex]) {
        carouselRef.current[newIndex].scrollTo({
          inline: "center",
          behavior: "smooth",
          alignToTop: false,
        });
      }
    }
  };

  return (
    <Box my={2} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1 }}>
      <Box
        sx={{
          backgroundImage: `url(${selectedMedia && selectedMedia})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: { xs: "400px", md: "500px", lg: "600px" },
        }}
      />
      {media && media.length > 1 && (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "column" },
              gap: 1,
              maxWidth: "100%",
              height: "100%",
              overflowX: "hidden",
            }}>
            {media &&
              media.map((image, index) => (
                <Box
                  key={media + index}
                  onClick={() => handleSelectChange(index)}
                  sx={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    flex: 1,
                    height: { xs: "100px", sm: "150px", md: "100%" },
                    width: "100%",
                    minWidth: { md: "200px", lg: "250px" },
                    cursor: "pointer",
                    opacity: selectedIndex === index && 0.5,
                  }}
                  ref={(el) => (carouselRef.current[index] = el)}
                />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MediaCarousel;
