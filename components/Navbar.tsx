import Link from "next/link"
import Image from "next/image"
const Navbar = () => {
  return (
<header>
    <nav>
        <Link href='/' className="logo">
        <img src="/icons/logo.png" alt="logo" width={24} height={24} />
        <p>Dev event</p>
        </Link>

        <ul>
            <Link href="/">Home</Link>
            <Link href="/">Events</Link>
            <Link href="/">Create event </Link>
        </ul>
    </nav>
</header>    
  )
}

export default Navbar