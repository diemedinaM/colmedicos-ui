export default function Footer() {
  return (
    <footer className="bg-white w-full [grid-area:footer] flex items-center justify-end px-8">
      © {new Date().getFullYear()} - Sofia
    </footer>
  );
}