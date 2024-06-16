import { Client, isFullPageOrDatabase } from '@notionhq/client';

const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;

const notion = new Client({
  auth: NOTION_TOKEN,
});

export async function getRecipeList(query: string = '') {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            or: [
              {
                property: 'Name',
                title: {
                  contains: query,
                },
              },
              {
                property: 'Film Simulation',
                select: {
                  equals: query
                    .split(' ')
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(' '),
                },
              },
              {
                property: 'Tags',
                multi_select: {
                  contains: query.toLowerCase(),
                },
              },
            ],
          },
        ],
      },
      sorts: [
        {
          property: 'Custom Preset',
          direction: 'ascending',
        },
      ],
    });

    const recipeList = [];

    for (const result of response.results) {
      if (!isFullPageOrDatabase(result)) {
        continue;
      }

      const {
        Name,
        Slug,
        Tags,
        'Custom Preset': CustomPreset,
      } = result.properties;

      recipeList.push({
        name:
          Name.type === 'title' && Array.isArray(Name.title)
            ? Name.title[0].plain_text
            : '',
        slug:
          Slug.type === 'rich_text' && Array.isArray(Slug.rich_text)
            ? Slug.rich_text[0].plain_text
            : '',
        tags:
          Tags.type === 'multi_select' && Array.isArray(Tags.multi_select)
            ? Tags.multi_select.map((option) => ({
                name: option.name,
                color: option.color,
              }))
            : [],
        customPreset:
          CustomPreset.type === 'select' &&
          CustomPreset.select &&
          !('options' in CustomPreset.select)
            ? CustomPreset.select.name
            : '',
      });
    }

    return recipeList;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecipeBySlug(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID!,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    const result = response.results[0];

    if (!isFullPageOrDatabase(result)) {
      return;
    }

    const {
      Name,
      Slug,
      'Sample Images': SampleImages,
      'Film Simulation': FilmSimulation,
      'Grain Effect': GrainEffect,
      'Color Chrome Effect': ColorChromeEffect,
      'Color Chrome FX Blue': ColorChromeFxBlue,
      'White Balance': WhiteBalance,
      'Color Temperature (K)': ColorTemperature,
      'WB Shift (R)': WbShiftR,
      'WB Shift (B)': WbShiftB,
      'Dynamic Range': DynamicRange,
      Highlight,
      Shadow,
      Color,
      Sharpness,
      'Noise Reduction': NoiseReduction,
      Clarity,
      ISO,
      'Exposure Compensation': ExposureCompensation,
    } = result.properties;

    const getWB = () => {
      const wb =
        WhiteBalance.type === 'select' &&
        WhiteBalance.select &&
        !('options' in WhiteBalance.select)
          ? WhiteBalance.select.name
          : '';
      const temp =
        ColorTemperature.type === 'rich_text' &&
        Array.isArray(ColorTemperature.rich_text)
          ? ColorTemperature.rich_text[0]?.plain_text
          : '';
      const shiftR =
        WbShiftR.type === 'rich_text' && Array.isArray(WbShiftR.rich_text)
          ? WbShiftR.rich_text[0]?.plain_text
          : '';
      const shiftB =
        WbShiftB.type === 'rich_text' && Array.isArray(WbShiftB.rich_text)
          ? WbShiftB.rich_text[0]?.plain_text
          : '';

      return wb === 'Custom' ? `${temp}K` : `${wb}; R: ${shiftR}, B: ${shiftB}`;
    };

    const recipe = {
      name:
        Name.type === 'title' && Array.isArray(Name.title)
          ? Name.title[0].plain_text
          : '',
      slug:
        Slug.type === 'rich_text' && Array.isArray(Slug.rich_text)
          ? Slug.rich_text[0].plain_text
          : '',
      sampleImages:
        SampleImages.type === 'files'
          ? SampleImages.files
              .map((file) => {
                if (file.type === 'file') {
                  return file.file.url;
                } else if (file.type === 'external') {
                  return file.external.url;
                }
                return '';
              })
              .filter((url) => url !== '')
          : [],
      settings: {
        'Film Simulation':
          FilmSimulation.type === 'select' &&
          FilmSimulation.select &&
          !('options' in FilmSimulation.select)
            ? FilmSimulation.select.name
            : '',
        'Grain Effect':
          GrainEffect.type === 'select' &&
          GrainEffect.select &&
          !('options' in GrainEffect.select)
            ? GrainEffect.select.name
            : '',
        'Color Chrome Effect':
          ColorChromeEffect.type === 'select' &&
          ColorChromeEffect.select &&
          !('options' in ColorChromeEffect.select)
            ? ColorChromeEffect.select.name
            : '',
        'Color Chrome FX Blue':
          ColorChromeFxBlue.type === 'select' &&
          ColorChromeFxBlue.select &&
          !('options' in ColorChromeFxBlue.select)
            ? ColorChromeFxBlue.select.name
            : '',
        'White Balance': getWB(),
        'Dynamic Range':
          DynamicRange.type === 'select' &&
          DynamicRange.select &&
          !('options' in DynamicRange.select)
            ? DynamicRange.select.name
            : '',
        Highlight:
          Highlight.type === 'rich_text' && Array.isArray(Highlight.rich_text)
            ? Highlight.rich_text[0]?.plain_text
            : '',
        Shadow:
          Shadow.type === 'rich_text' && Array.isArray(Shadow.rich_text)
            ? Shadow.rich_text[0]?.plain_text
            : '',
        Color:
          Color.type === 'rich_text' && Array.isArray(Color.rich_text)
            ? Color.rich_text[0]?.plain_text
            : '',
        Sharpness:
          Sharpness.type === 'rich_text' && Array.isArray(Sharpness.rich_text)
            ? Sharpness.rich_text[0]?.plain_text
            : '',
        'Noise Reduction':
          NoiseReduction.type === 'rich_text' &&
          Array.isArray(NoiseReduction.rich_text)
            ? NoiseReduction.rich_text[0]?.plain_text
            : '',
        Clarity:
          Clarity.type === 'rich_text' && Array.isArray(Clarity.rich_text)
            ? Clarity.rich_text[0]?.plain_text
            : '',
        ISO:
          ISO.type === 'rich_text' && Array.isArray(ISO.rich_text)
            ? ISO.rich_text[0]?.plain_text
            : '',
        'Exposure Compensation':
          ExposureCompensation.type === 'rich_text' &&
          Array.isArray(ExposureCompensation.rich_text)
            ? ExposureCompensation.rich_text[0]?.plain_text
            : '',
      },
    };

    return recipe;
  } catch (error) {
    console.error(error);
  }
}
