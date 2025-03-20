import React from 'react';

const companies = [
  'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
  'https://pngimg.com/d/meta_PNG5.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Bain_%26_Company_logo.svg/2560px-Bain_%26_Company_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
  'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/480px-Microsoft_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/McKinsey_and_Company_Logo_1.svg/2560px-McKinsey_and_Company_Logo_1.svg.png',
  'https://brandlogos.net/wp-content/uploads/2014/10/adobe-logo-2017.png',
  'https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Intel-logo-2022.png/1280px-Intel-logo-2022.png'
];

const InfiniteLogoSlider = () => {
    return (
      <div className="w-full max-md:hidden overflow-hidden bg-white py-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          We collaborate with <span className="text-blue-600">350+ leading universities and companies</span>
        </h2>
  
        <div className="relative w-full overflow-hidden">
          {/* Wrapper for infinite scroll */}
          <div className="flex w-[200%] animate-infinite-scroll">
            {/* Duplicate logos to create the infinite effect */}
            {[...companies, ...companies].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Company Logo"
                className="h-16 mx-8 object-contain"
              />
            ))}
          </div>
        </div>
  
        <style>{`
          @keyframes infinite-scroll {
            0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
        }}
  
          .animate-infinite-scroll {
            display: flex;
            animation: infinite-scroll 20s linear infinite;
            width: calc(200%);
            will-change: transform;
          }
            
        `}</style>
      </div>
    );
  };
  
  export default InfiniteLogoSlider;