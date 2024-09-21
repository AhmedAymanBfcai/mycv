import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Automatically tell a handler who the currently signed in user.
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);

// data: will container any arguments passed to @CurrentUser()
// type: never means that this value is never used in any place.  
