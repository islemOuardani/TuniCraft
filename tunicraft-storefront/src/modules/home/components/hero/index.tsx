import { Button, Heading } from "@medusajs/ui"

type HeroProps = {
  title: string
  subtitle: string
  buttonText: string
}

const Hero = ({ title, subtitle, buttonText }: HeroProps) => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-[url('/images/hero-backg.png')] bg-cover bg-center">
      <div className="absolute inset-0 z-10 flex flex-col justify-end items-center text-center p-6 small:p-12 gap-4 pb-12 bg-black/30">
        <Heading
          level="h1"
          className="text-5xl font-bold text-white drop-shadow-md" style={{ fontFamily: "'Pacifico', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
        >
          {title} <span className="text-sand">TuniCraft</span>
        </Heading>
        <Heading
          level="h2"
          className="text-xl text-white drop-shadow-md max-w-4xl"
        >
          {subtitle}
        </Heading>
        <a
          href="http://localhost:3000/en-tn/store"
          target="_blank"
        >
          <Button
            className="bg-tunisianRed text-white border border-tunisianRed 
             hover:bg-white hover:text-tunisianRed 
             rounded-full shadow-md px-6 py-3 text-base 
             transition-all duration-300 ease-in-out"
          >
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero
