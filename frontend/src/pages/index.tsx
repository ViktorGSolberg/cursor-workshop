import { Page } from "@/components/Page";
import { getPosts, Post } from "@/clients/api";
import { Layout } from "@snokam/core";
import { LayoutTheme, Padding, TransitionType } from "@snokam/core/layout";
import { GetServerSideProps } from "next";

interface HomePageProps {
  post: Post | null;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const posts = await getPosts({ limit: 1 });
    return { props: { post: posts[0] || null } };
  } catch (error) {
    return { props: { post: null } };
  }
};

const HomePage = ({ post }: HomePageProps) => (
  <Page>
    <Layout.Container
      theme={LayoutTheme.Light}
      transitions={{
        bottom: {
          type: TransitionType.Wave,
        },
      }}
    >
      <Layout.Content>
        <Layout.Section padding={{ bottom: Padding.Large }}>
          <h1>Cursor Workshop</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
            alt="Steve Jobs"
            style={{ width: "200px", borderRadius: "8px", marginBottom: "1rem" }}
          />
          {post ? (
            <>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </>
          ) : (
            <p>No posts found</p>
          )}
        </Layout.Section>
      </Layout.Content>
    </Layout.Container>
  </Page>
);

export default HomePage;
