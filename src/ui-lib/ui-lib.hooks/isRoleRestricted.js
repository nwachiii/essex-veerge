import React from 'react';
import {IsRoleRestricted} from 'ui-lib/ui-lib.components/IsRoleRestricted';

export const isRoleRestricted = featureToBeBlocked => {
  const roleName =
    typeof window !== 'undefined' &&
    localStorage.getItem('loggedinUser') &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'))?.['is_owner']
      ? 'account owner'
      : JSON.parse(localStorage.getItem('loggedinUser'))?.['role']?.toLowerCase();

  const roles = {
    'account & finance': {
      access: ['all'],
      restrict: ['invite teams members', 'team member recent activity', 'input Bvn'],
    },
    'account owner': {
      access: ['all'],
      restrict: [],
    },
    admin: {
      access: ['all'],
      restrict: ['verified state of BVN', 'team member recent activity', 'input Bvn'],
    },
    'directors & general managers': {
      access: ['all'],
      restrict: [
        'create listings',
        'create customer accounts',
        'create customer and listing',
        'invite teams members',
        'input Bvn',
        'team member recent activity',
      ],
    },
    'front desk': {
      access: [],
      restrict: ['team member recent activity', 'input Bvn'],
    },
    'head of sales': {
      access: [],
      restrict: ['team member recent activity', 'input Bvn'],
    },
    operations: {
      access: [],
      restrict: ['team member recent activity', 'input Bvn'],
    },
    'sales representative': {
      access: [],
      restrict: ['team member recent activity', 'input Bvn'],
    },
    'customer care representative': {
      access: [],
      restrict: ['team member recent activity', 'input Bvn'],
    },
    'site admin': {
      access: [],
      restrict: ['team member recent activity', 'input Bvn'],
    },
  };

  const roleHasAccess = () => {
    return (
      roles?.[roleName]?.access?.includes('all') ||
      roles?.[roleName]?.access?.includes(featureToBeBlocked)
    );
  };

  const roleIsNotRestricted = () => {
    return !(
      roles?.[roleName]?.restrict?.includes('all') ||
      roles?.[roleName]?.restrict?.includes(featureToBeBlocked)
    );
  };

  const isRoleRestricted = () => {
    if (roleHasAccess() && roleIsNotRestricted()) {
      return false;
    } else {
      return true;
    }
  };

  return {
    check: isRoleRestricted(),
    component: <IsRoleRestricted />,
  };
};
