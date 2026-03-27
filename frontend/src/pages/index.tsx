import { Page } from "@/components/Page";
import { getPosts, Post } from "@/clients/api";
import { Layout } from "@snokam/core";
import { LayoutTheme, Padding, TransitionType } from "@snokam/core/layout";
import { GetServerSideProps } from "next";

interface HomePageProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const posts = await getPosts();
    return { props: { posts } };
  } catch (error) {
    return { props: { posts: [] } };
  }
};

const HomePage = ({ posts }: HomePageProps) => (
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
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} style={{ marginBottom: "2rem" }}>
                <h3>{post.title}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  By {post.author} &middot;{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <p>{post.excerpt}</p>
                <p>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        marginRight: "0.5rem",
                        padding: "0.2rem 0.5rem",
                        background: "#f0f0f0",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </Layout.Section>
      </Layout.Content>
    </Layout.Container>
  </Page>
);

export default HomePage;
