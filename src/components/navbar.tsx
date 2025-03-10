import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/auth-context";

export function AppNavbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/" className="font-bold text-inherit flex items-center gap-2">
          <Icon icon="lucide:credit-card" className="text-xl" />
          <span>CardGen</span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === "/"}>
          <Link to="/" className="text-inherit">
            Create Card
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/dashboard"}>
          <Link to="/dashboard" className="text-inherit">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                name={user.name}
                size="sm"
                as="button"
                className="transition-transform"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              <DropdownItem key="profile" className="gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard" as={Link} href="/dashboard">
                Dashboard
              </DropdownItem>
              <DropdownItem key="create" as={Link} href="/">
                Create Card
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={signOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Button as={Link} to="/login" variant="flat">
              Log In
            </Button>
            <Button as={Link} to="/signup" color="primary">
              Sign Up
            </Button>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}
