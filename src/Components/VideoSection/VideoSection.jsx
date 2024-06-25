import React from 'react'
import './VideoSection.css'

const VideoSection = () => {
  return (
    <>
      <section className="video-banner-section w-100">
        <div className="section-body">
          <div className="banner-video position-relative">
            <video
              width="100%"
              height="100%"
              className="object-cover"
              controls
              muted
              loop
              preload="metadata"
              poster="//prestige-theme-allure.myshopify.com/cdn/shop/files/Video_poster_image_-_home.jpg?v=1680767658&amp;width=3200"
            >
              <source
                src="https://cdn.shopify.com/videos/c/vp/686fc38c1584488793cb47f95193f422/686fc38c1584488793cb47f95193f422.HD-1080p-4.8Mbps-12729205.mp4"
                type="video/mp4"
              />
              {/* Fallback image in case the video cannot be played */}
              <img
                src="//prestige-theme-allure.myshopify.com/cdn/shop/files/preview_images/686fc38c1584488793cb47f95193f422.thumbnail.0000000000_400x.jpg?v=1677578139"
                alt="Video poster"
              />
            </video>
            <div className="custom-play-btn position-absolute">
              <svg
                width="50"
                height="50"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M70 35C70 54.3302 54.3302 70 35 70C15.6698 70 0 54.3302 0 35C0 15.6698 15.6698 0 35 0C54.3302 0 70 15.6698 70 35ZM43.75 35L30.625 25.375V44.625L43.75 35Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default VideoSection