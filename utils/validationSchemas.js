export const validationSchemas = {
  authValidationSchemas: {
    loginValidationSchema: {
      email: {
        notEmpty: { errorMessage: "Email is required" },
        isEmail: { errorMessage: "Please provide a valid email" },
      },
      password: { notEmpty: { errorMessage: "Password is required" } },
    },
  },
  refreshTokenValidationSchema: {
    refresh_token: { notEmpty: { errorMessage: "refresh_token is required" } },
  },
  boardValidationSchemas: {
    addBoardValidationSchema: {
      user_id: {
        notEmpty: { errorMessage: "User ID is required" },
        isInt: {
          errorMessage: "User ID must be a valid integer",
        },
      },
      title: {
        notEmpty: { errorMessage: "Title is required" },
        isLength: {
          options: {
            min: 1,
            max: 100,
          },
        },
      },
    },
    getBoardValidationSchema: {
      user_id: {
        in: ["params"],
        notEmpty: true,
      },
    },
  },
  cardValidationSchemas: {
    addCard: {
      title: {
        notEmpty: { errorMessage: "Title is required" },
      },
    },
  },
};
