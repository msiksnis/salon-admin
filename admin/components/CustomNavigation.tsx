import React from "react";

import {
  ListNavItems,
  NavigationContainer,
  NavItem,
} from "@keystone-6/core/admin-ui/components";

import type { NavigationProps } from "@keystone-6/core/admin-ui/components";

export function CustomNavigation({
  lists,
  authenticatedItem,
}: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href="https://engabeauty.no">www.engabeauty.no</NavItem>
    </NavigationContainer>
  );
}
