import Image from "next/image";

function AuthBrandPanel() {
  return (
    <div className="relative hidden h-full overflow-hidden lg:block">
      <Image
        src="/auth/1.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden
      />
    </div>
  );
}

export { AuthBrandPanel };
