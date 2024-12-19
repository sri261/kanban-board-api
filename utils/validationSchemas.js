export const validationSchemas = {
  authValidationSchemas: {
    loginValidationSchema: {
      email: {
        notEmpty: { errorMessage: "Email is required" },
        isEmail: { errorMessage: "Please provide a valid email" },
      },
      password: { notEmpty: { errorMessage: "Password is required" } },
    },
    refreshTokenValidation: {
      refresh_token: {
        notEmpty: { errorMessage: "refresh_token is required" },
      },
    },
    signupValidation: {
      name: {
        notEmpty: { errorMessage: "Name is required" },
        isLength: {
          errorMessage: "Name should me 2 or more characters",
          options: {
            min: 2,
            max: 100,
          },
        },
      },
      email: {
        notEmpty: { errorMessage: "Email is required" },
        isEmail: { errorMessage: "Please provide a valid Email" },
      },
      password: { notEmpty: { errorMessage: "Password is required" } },
    },
  },

  boardValidationSchemas: {
    addBoardValidationSchema: {
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
  },
  cardValidationSchemas: {
    addCard: {
      title: {
        notEmpty: { errorMessage: "Title is required" },
      },
    },
  },
};
