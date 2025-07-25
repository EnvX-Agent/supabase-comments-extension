// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Input,
  Checkbox,
  Button,
  Space,
  Typography,
  Divider,
  IconKey,
  IconMail,
  IconLock,
  IconUser,
} from '@supabase/ui';
import { Auth as SupabaseAuth, } from '@supabase/auth-ui-react';
import md5 from 'md5';
// @ts-ignore
import { jsx, jsxs } from 'react/jsx-runtime';

/**
 * This is a slightly modified version of @supabase/ui/Auth
 */

const size = 21;
const google = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'google',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 488 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const facebook = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'facebook-square',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 448 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const twitter = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'twitter',
        className: 'svg-inline--fa fa-twitter fa-w-16',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const apple = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'apple',
        className: 'svg-inline--fa fa-apple fa-w-16',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const github = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'github',
        className: 'svg-inline--fa fa-github fa-w-16',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 496 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const gitlab = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'gitlab',
        className: 'svg-inline--fa fa-gitlab fa-w-16',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M105.2 24.9c-3.1-8.9-15.7-8.9-18.9 0L29.8 199.7h132c-.1 0-56.6-174.8-56.6-174.8zM.9 287.7c-2.6 8 .3 16.9 7.1 22l247.9 184-226.2-294zm160.8-88l94.3 294 94.3-294zm349.4 88l-28.8-88-226.3 294 247.9-184c6.9-5.1 9.7-14 7.2-22zM425.7 24.9c-3.1-8.9-15.7-8.9-18.9 0l-56.6 174.8h132z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const bitbucket = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'bitbucket',
        className: 'svg-inline--fa fa-bitbucket fa-w-16',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M22.2 32A16 16 0 0 0 6 47.8a26.35 26.35 0 0 0 .2 2.8l67.9 412.1a21.77 21.77 0 0 0 21.3 18.2h325.7a16 16 0 0 0 16-13.4L505 50.7a16 16 0 0 0-13.2-18.3 24.58 24.58 0 0 0-2.8-.2L22.2 32zm285.9 297.8h-104l-28.1-147h157.3l-25.2 147z',
          },
          void 0
        ),
      }
    ),
    void 0
  );
const discord = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        height: size,
        viewBox: '0 0 71 55',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      {
        children: jsx(
          'g',
          Object.assign(
            {
              clipPath: 'url(#clip0)',
            },
            {
              children: jsx(
                'path',
                {
                  d: 'M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z',
                  fill: 'currentColor',
                },
                void 0
              ),
            }
          ),
          void 0
        ),
      }
    ),
    void 0
  );
const azure = () =>
  jsxs(
    'svg',
    Object.assign(
      {
        width: size,
        height: size,
        viewBox: '0 0 96 96',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      {
        children: [
          jsxs(
            'defs',
            {
              children: [
                jsxs(
                  'linearGradient',
                  Object.assign(
                    {
                      id: 'e399c19f-b68f-429d-b176-18c2117ff73c',
                      x1: '-1032.172',
                      x2: '-1059.213',
                      y1: '145.312',
                      y2: '65.426',
                      gradientTransform: 'matrix(1 0 0 -1 1075 158)',
                      gradientUnits: 'userSpaceOnUse',
                    },
                    {
                      children: [
                        jsx(
                          'stop',
                          {
                            offset: '0',
                            stopColor: '#fff',
                          },
                          void 0
                        ),
                        jsx(
                          'stop',
                          {
                            offset: '1',
                            stopColor: '#fff',
                          },
                          void 0
                        ),
                      ],
                    }
                  ),
                  void 0
                ),
                jsxs(
                  'linearGradient',
                  Object.assign(
                    {
                      id: 'ac2a6fc2-ca48-4327-9a3c-d4dcc3256e15',
                      x1: '-1023.725',
                      x2: '-1029.98',
                      y1: '108.083',
                      y2: '105.968',
                      gradientTransform: 'matrix(1 0 0 -1 1075 158)',
                      gradientUnits: 'userSpaceOnUse',
                    },
                    {
                      children: [
                        jsx(
                          'stop',
                          {
                            offset: '0',
                            stopOpacity: '.3',
                          },
                          void 0
                        ),
                        jsx(
                          'stop',
                          {
                            offset: '.071',
                            stopOpacity: '.2',
                          },
                          void 0
                        ),
                        jsx(
                          'stop',
                          {
                            offset: '.321',
                            stopOpacity: '.1',
                          },
                          void 0
                        ),
                        jsx(
                          'stop',
                          {
                            offset: '.623',
                            stopOpacity: '.05',
                          },
                          void 0
                        ),
                        jsx(
                          'stop',
                          {
                            offset: '1',
                            stopOpacity: '0',
                          },
                          void 0
                        ),
                      ],
                    }
                  ),
                  void 0
                ),
                jsxs(
                  'linearGradient',
                  Object.assign(
                    {
                      id: 'a7fee970-a784-4bb1-af8d-63d18e5f7db9',
                      x1: '-1027.165',
                      x2: '-997.482',
                      y1: '147.642',
                      y2: '68.561',
                      gradientTransform: 'matrix(1 0 0 -1 1075 158)',
                      gradientUnits: 'userSpaceOnUse',
                    },
                    {
                      children: [
                        jsx(
                          'stop',
                          {
                            offset: '0',
                            stopColor: '#fff',
                          },
                          void 0
                        ),
                        jsx(
                          'stop',
                          {
                            offset: '1',
                            stopColor: '#fff',
                          },
                          void 0
                        ),
                      ],
                    }
                  ),
                  void 0
                ),
              ],
            },
            void 0
          ),
          jsx(
            'path',
            {
              fill: 'url(#e399c19f-b68f-429d-b176-18c2117ff73c)',
              d: 'M33.338 6.544h26.038l-27.03 80.087a4.152 4.152 0 0 1-3.933 2.824H8.149a4.145 4.145 0 0 1-3.928-5.47L29.404 9.368a4.152 4.152 0 0 1 3.934-2.825z',
            },
            void 0
          ),
          jsx(
            'path',
            {
              fill: 'currentColor',
              d: 'M71.175 60.261h-41.29a1.911 1.911 0 0 0-1.305 3.309l26.532 24.764a4.171 4.171 0 0 0 2.846 1.121h23.38z',
            },
            void 0
          ),
          jsx(
            'path',
            {
              fill: 'currentColor',
              d: 'M33.338 6.544a4.118 4.118 0 0 0-3.943 2.879L4.252 83.917a4.14 4.14 0 0 0 3.908 5.538h20.787a4.443 4.443 0 0 0 3.41-2.9l5.014-14.777 17.91 16.705a4.237 4.237 0 0 0 2.666.972H81.24L71.024 60.261l-29.781.007L59.47 6.544z',
            },
            void 0
          ),
          jsx(
            'path',
            {
              fill: 'currentColor',
              d: 'M66.595 9.364a4.145 4.145 0 0 0-3.928-2.82H33.648a4.146 4.146 0 0 1 3.928 2.82l25.184 74.62a4.146 4.146 0 0 1-3.928 5.472h29.02a4.146 4.146 0 0 0 3.927-5.472z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
const twitch = () =>
  jsx(
    'svg',
    Object.assign(
      {
        width: size,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-prefix': 'fab',
        'data-icon': 'twitch',
        className: 'svg-inline--fa fa-twitch fa-w-16',
        role: 'img',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
      },
      {
        children: jsx(
          'path',
          {
            fill: 'currentColor',
            d: 'M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z',
          },
          void 0
        ),
      }
    ),
    void 0
  );

const SocialIcons = {
  apple,
  azure,
  bitbucket,
  discord,
  facebook,
  github,
  gitlab,
  google,
  twitch,
  twitter,
};

const getGravatarUrl = async (email: string): Promise<string | null> => {
  const hash = md5(email);
  const res = await fetch(`https://secure.gravatar.com/${hash}.json`, {
    credentials: 'omit',
  });
  const data = await res.json();
  return data?.entry?.[0]?.thumbnailUrl ?? null;
};

const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

interface ViewsMap {
  [key: string]: ViewType;
}

type ViewType =
  | 'sign_in'
  | 'sign_up'
  | 'forgotten_password'
  | 'magic_link'
  | 'update_password';

type RedirectTo = undefined | string;

export interface AuthProps {
  supabaseClient: SupabaseClient;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  socialLayout?: 'horizontal' | 'vertical';
  socialColors?: boolean;
  socialButtonSize?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  providers?: string[];
  verticalSocialLayout?: any;
  view?: ViewType;
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  magicLink?: boolean;
}

function Auth({
  supabaseClient,
  className,
  style,
  socialLayout = 'vertical',
  socialColors = false,
  socialButtonSize = 'medium',
  providers,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
}: AuthProps): JSX.Element | null {
  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');

  const verticalSocialLayout = socialLayout === 'vertical' ? true : false;

  let containerClasses = [] as string[];
  if (className) {
    containerClasses.push(className);
  }

  const Container = (props: any) => (
    <div className={containerClasses.join(' ')} style={style}>
      <Space size={8} direction={'vertical'}>
        <SocialAuth
          supabaseClient={supabaseClient}
          verticalSocialLayout={verticalSocialLayout}
          providers={providers}
          socialLayout={socialLayout}
          socialButtonSize={socialButtonSize}
          socialColors={socialColors}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          magicLink={magicLink}
        />
        {!onlyThirdPartyProviders && props.children}
      </Space>
    </div>
  );

  useEffect(() => {
    // handle view override
    setAuthView(view);
  }, [view]);

  switch (authView) {
    case VIEWS.SIGN_IN:
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            id={authView === VIEWS.SIGN_UP ? 'auth-sign-up' : 'auth-sign-in'}
            supabaseClient={supabaseClient}
            authView={authView}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
          />
        </Container>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <SupabaseAuth.ForgottenPassword
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
          />
        </Container>
      );

    case VIEWS.MAGIC_LINK:
      return (
        <Container>
          <SupabaseAuth.MagicLink
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
          />
        </Container>
      );

    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <SupabaseAuth.UpdatePassword supabaseClient={supabaseClient} />
        </Container>
      );

    default:
      return null;
  }
}

function SocialAuth({
  className,
  style,
  supabaseClient,
  children,
  socialLayout = 'vertical',
  socialColors = false,
  socialButtonSize,
  providers,
  verticalSocialLayout,
  redirectTo,
  onlyThirdPartyProviders,
  magicLink,
  ...props
}: AuthProps) {
  const buttonStyles: any = {
    azure: {
      backgroundColor: '#008AD7',
      color: 'white',
    },
    bitbucket: {
      backgroundColor: '#205081',
      color: 'white',
    },
    facebook: {
      backgroundColor: '#4267B2',
      color: 'white',
    },
    github: {
      backgroundColor: '#333',
      color: 'white',
    },
    gitlab: {
      backgroundColor: '#FC6D27',
    },
    google: {
      backgroundColor: '#ce4430',
      color: 'white',
    },
    twitter: {
      backgroundColor: '#1DA1F2',
      color: 'white',
    },
    apple: {
      backgroundColor: '#000',
      color: 'white',
    },
    discord: {
      backgroundColor: '#404fec',
      color: 'white',
    },
    twitch: {
      backgroundColor: '#9146ff',
      color: 'white',
    },
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProviderSignIn = async (provider: string) => {
    setLoading(true);
    // @ts-ignore
    const { error } = await supabaseClient.auth.signIn(
      { provider },
      { redirectTo }
    );
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <Space size={8} direction={'vertical'}>
      {providers && providers.length > 0 && (
        <React.Fragment>
          <Space size={4} direction={'vertical'}>
            <Typography.Text type="secondary">Sign in with</Typography.Text>
            <Space size={2} direction={socialLayout}>
              {providers.map((provider) => {
                // @ts-ignore
                const AuthIcon = SocialIcons[provider];
                return (
                  <div
                    key={provider}
                    style={!verticalSocialLayout ? { flexGrow: 1 } : {}}
                  >
                    <Button
                      block
                      type="default"
                      shadow
                      size={socialButtonSize}
                      style={socialColors ? buttonStyles[provider] : {}}
                      icon={<AuthIcon />}
                      loading={loading}
                      onClick={() => handleProviderSignIn(provider)}
                      className="flex items-center"
                    >
                      {verticalSocialLayout &&
                        'Sign up with ' +
                          provider.charAt(0).toUpperCase() +
                          provider.slice(1)}
                    </Button>
                  </div>
                );
              })}
            </Space>
          </Space>
          {!onlyThirdPartyProviders && <Divider>or continue with</Divider>}
        </React.Fragment>
      )}
    </Space>
  );
}

function EmailAuth({
  authView,
  defaultEmail,
  defaultPassword,
  id,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  redirectTo,
  magicLink,
}: {
  authView: ViewType;
  defaultEmail: string;
  defaultPassword: string;
  id: 'auth-sign-up' | 'auth-sign-in';
  setAuthView: any;
  setDefaultEmail: (email: string) => void;
  setDefaultPassword: (password: string) => void;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  magicLink?: boolean;
}) {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [displayName, setDisplayName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    switch (authView) {
      case 'sign_in':
        // @ts-ignore
        const { error: signInError } = await supabaseClient.auth.signIn(
          {
            email,
            password,
          },
          { redirectTo }
        );
        if (signInError) setError(signInError.message);
        break;
      case 'sign_up':
        const avatar = await getGravatarUrl(email).catch(() => null);
        const {
          user: signUpUser,
          session: signUpSession,
          error: signUpError,
        } = await supabaseClient.auth.signUp(
          {
            email,
            password,
          },
          {
            redirectTo,
            data: {
              name: displayName,
              avatar,
            },
          }
        );
        if (signUpError) setError(signUpError.message);
        // Check if session is null -> email confirmation setting is turned on
        else if (signUpUser && !signUpSession)
          setMessage('Check your email for the confirmation link.');
        break;
    }

    /*
     * it is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted.current) setLoading(false);
  };

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <Space size={6} direction={'vertical'}>
        <Space size={3} direction={'vertical'}>
          <Input
            label="Email address"
            placeholder="Email..."
            autoComplete="on"
            defaultValue={email}
            icon={<IconMail size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            label="Password"
            placeholder="Password..."
            type="password"
            defaultValue={password}
            autoComplete="new-password"
            icon={<IconKey size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {authView === 'sign_up' && (
            <Input
              label="Display Name"
              placeholder="Display name..."
              name="display-name"
              type="text"
              defaultValue={displayName}
              autoComplete="on"
              icon={<IconUser size={21} stroke={'#666666'} />}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayName(e.target.value)
              }
            />
          )}
        </Space>
        <Space direction="vertical" size={6}>
          <Space style={{ justifyContent: 'space-between' }}>
            <Checkbox
              label="Remember me"
              name="remember_me"
              id="remember_me"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setRememberMe(value.target.checked)
              }
            />
            {authView === VIEWS.SIGN_IN && (
              <Typography.Link
                href="#auth-forgot-password"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
              >
                Forgot your password?
              </Typography.Link>
            )}
          </Space>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            icon={<IconLock size={21} />}
            loading={loading}
            block
            disabled={
              authView === VIEWS.SIGN_IN
                ? !email || !password
                : !displayName || !email || !password
            }
          >
            {authView === VIEWS.SIGN_IN ? 'Sign in' : 'Sign up'}
          </Button>
        </Space>
        <Space direction="vertical" style={{ textAlign: 'center' }}>
          {authView === VIEWS.SIGN_IN && magicLink && (
            <Typography.Link
              href="#auth-magic-link"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView(VIEWS.MAGIC_LINK);
              }}
            >
              Sign in with magic link
            </Typography.Link>
          )}
          {authView === VIEWS.SIGN_IN ? (
            <Typography.Link
              href="#auth-sign-up"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleViewChange(VIEWS.SIGN_UP);
              }}
            >
              Don't have an account? Sign up
            </Typography.Link>
          ) : (
            <Typography.Link
              href="#auth-sign-in"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleViewChange(VIEWS.SIGN_IN);
              }}
            >
              Do you have an account? Sign in
            </Typography.Link>
          )}
          {message && <Typography.Text>{message}</Typography.Text>}
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
        </Space>
      </Space>
    </form>
  );
}

Auth.ForgottenPassword = SupabaseAuth.ForgottenPassword;
Auth.UpdatePassword = SupabaseAuth.UpdatePassword;
Auth.MagicLink = SupabaseAuth.MagicLink;
Auth.UserContextProvider = SupabaseAuth.UserContextProvider;
Auth.useUser = SupabaseAuth.useUser;

export default Auth;
